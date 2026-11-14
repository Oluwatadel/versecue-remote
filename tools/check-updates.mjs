import assert from 'node:assert/strict';
import {mkdtemp,mkdir,writeFile,readFile,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {verify,createHash,X509Certificate} from 'node:crypto';
import {prepare} from './prepare-mobile-update.mjs';
// Reuse the actual public certificate and a disposable independent key only for rejection checks.
const root=await mkdtemp(join(tmpdir(),'versevio-mobile-updates-'));
let checks=0;function ok(value){assert(value);checks++;}
try{
 const config=JSON.parse(await readFile('app.json','utf8')).expo;
 ok(config.updates.enabled&&config.updates.checkAutomatically==='ON_LOAD');ok(config.updates.fallbackToCacheTimeout===0);ok(config.runtimeVersion.policy==='appVersion');ok(config.orientation==='landscape');
 const source=await readFile('src/updates/BackgroundUpdates.tsx','utf8');ok(!source.includes('reloadAsync'));ok(source.includes('fetchUpdateAsync'));ok(source.includes('AppState.currentState'));
 const cert=new X509Certificate(await readFile('assets/update-certificate.pem'));ok(cert.publicKey.asymmetricKeyType==='rsa');ok(cert.keyUsage?.includes('1.3.6.1.5.5.7.3.3'));
 await mkdir(join(root,'export','assets'),{recursive:true});await writeFile(join(root,'export','bundle.hbc'),'bundle');await writeFile(join(root,'export','assets','imagekey'),'image');
 await writeFile(join(root,'export','metadata.json'),JSON.stringify({version:0,bundler:'metro',fileMetadata:{android:{bundle:'bundle.hbc',assets:[{path:'assets/imagekey',ext:'png'}]}}}));
 const opts={source:join(root,'export'),output:join(root,'out'),baseUrl:'https://github.com/test/releases/download/ota-test',keyFile:process.env.UPDATE_TEST_KEY,certificateFile:'assets/update-certificate.pem',runtimeVersion:config.version,config};
 if(!opts.keyFile)throw new Error('Set UPDATE_TEST_KEY to the local update publisher key; it is never printed or copied.');
 await prepare(opts);const index=JSON.parse(await readFile(join(root,'out','versevio-mobile-updates.json'),'utf8'));ok(index.releases.length===1);const record=index.releases[0];const body=Buffer.from(record.body,'base64');ok(verify('RSA-SHA256',body,cert.publicKey,Buffer.from(record.signature,'base64')));ok(!verify('RSA-SHA256',Buffer.concat([body,Buffer.from(' ')]),cert.publicKey,Buffer.from(record.signature,'base64')));
 const manifest=JSON.parse(body);ok(manifest.runtimeVersion===config.version&&manifest.metadata.platform==='android');ok(manifest.assets[0].key==='imagekey');
 for(const asset of [manifest.launchAsset,...manifest.assets]){const downloaded=await readFile(join(root,'out',new URL(asset.url).pathname.split('/').pop()));ok(createHash('sha256').update(downloaded).digest('base64url')===asset.hash);}
 await assert.rejects(()=>prepare({...opts,baseUrl:'http://github.com/test'}));checks++;
 await writeFile(join(root,'export','metadata.json'),JSON.stringify({version:0,bundler:'metro',fileMetadata:{android:{bundle:'../outside',assets:[]}}}));await assert.rejects(()=>prepare(opts));checks++;
 console.log(`PASS ${checks} mobile background update checks.`);
}finally{await rm(root,{recursive:true,force:true});}
