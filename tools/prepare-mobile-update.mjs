import {readFile,writeFile,mkdir,copyFile} from 'node:fs/promises';
import {resolve,relative,basename,extname,join} from 'node:path';
import {createHash,randomUUID,sign,verify,X509Certificate} from 'node:crypto';
import {pathToFileURL} from 'node:url';
const digest = data => createHash('sha256').update(data).digest();
export async function prepare({source,output,baseUrl,keyFile,certificateFile,runtimeVersion,config,previous}) {
  const base = new URL(baseUrl.endsWith('/')?baseUrl:baseUrl+'/');
  if(base.protocol!=='https:'||base.hostname!=='github.com'||base.username||base.password||base.search||base.hash)throw new Error('Use an immutable public GitHub release asset base URL.');
  if(!/^\d+\.\d+\.\d+$/.test(runtimeVersion))throw new Error('Use the installed native app runtime version.');
  source=resolve(source);output=resolve(output);
  const privateKey=await readFile(keyFile);const certificate=new X509Certificate(await readFile(certificateFile));
  const metadata=JSON.parse(await readFile(join(source,'metadata.json'),'utf8'));
  if(metadata.version!==0||metadata.bundler!=='metro')throw new Error('Unsupported Expo export format.');
  const releases=previous?JSON.parse(await readFile(previous,'utf8')).releases:[];
  await mkdir(output,{recursive:true});let count=0;
  async function asset(path,extension,key,contentType){
    const input=resolve(source,path);const rel=relative(source,input);if(rel.startsWith('..')||rel.includes(':'))throw new Error('Export asset escapes the export folder.');
    const data=await readFile(input);const hash=digest(data);const filename=hash.toString('hex')+extension;
    await copyFile(input,join(output,filename));
    return {key:key||hash.toString('hex'),hash:hash.toString('base64url'),fileExtension:extension,contentType,url:new URL(filename,base).href};
  }
  const mime={png:'image/png',jpg:'image/jpeg',jpeg:'image/jpeg',webp:'image/webp',gif:'image/gif',ttf:'font/ttf',otf:'font/otf',mp3:'audio/mpeg',mp4:'video/mp4',json:'application/json'};
  for(const [platform,files] of Object.entries(metadata.fileMetadata)){
    if(!['android','ios'].includes(platform))continue;
    const launchAsset=await asset(files.bundle,extname(files.bundle),null,'application/javascript');
    const assets=[];for(const entry of files.assets){const ext=entry.ext.replace(/^\./,'');if(!/^[a-z0-9]+$/i.test(ext))throw new Error('Invalid asset extension.');assets.push(await asset(entry.path,'.'+ext,basename(entry.path),mime[ext]||'application/octet-stream'));}
    const manifest={id:randomUUID(),createdAt:new Date().toISOString(),runtimeVersion,launchAsset,assets,metadata:{platform,channel:'stable'},extra:{expoClient:config}};
    const body=Buffer.from(JSON.stringify(manifest));const signature=sign('RSA-SHA256',body,privateKey);
    if(!verify('RSA-SHA256',body,certificate.publicKey,signature))throw new Error('Update key does not match the certificate installed in the app.');
    const record={platform,runtimeVersion,body:body.toString('base64'),signature:signature.toString('base64')};
    const old=releases.findIndex(x=>x.platform===platform&&x.runtimeVersion===runtimeVersion);if(old<0)releases.push(record);else releases[old]=record;count++;
  }
  if(!count||releases.length>50)throw new Error('No compatible mobile exports, or index exceeds supported runtimes.');
  await writeFile(join(output,'versevio-mobile-updates.json'),JSON.stringify({releases}));return count;
}
if(process.argv[1]&&import.meta.url===pathToFileURL(resolve(process.argv[1])).href){
  const [source,output,baseUrl,keyFile,previous]=process.argv.slice(2);
  if(!source||!output||!baseUrl||!keyFile)throw new Error('Usage: node tools/prepare-mobile-update.mjs <expo-export> <output> <GitHub-release-base-url> <update-private.pem> [previous-index.json]');
  const {expo}=JSON.parse(await readFile('app.json','utf8'));
  const count=await prepare({source,output,baseUrl,keyFile,certificateFile:'assets/update-certificate.pem',runtimeVersion:expo.version,config:expo,previous});
  console.log(`Prepared ${count} signed mobile updates. Upload every output asset to the immutable release URL; never upload the private key.`);
}
