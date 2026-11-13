/** Android 17+ requires permission before any private-network request. */
export async function requireLocalNetworkAccess(platform:string,api:number,permission:{check:()=>Promise<boolean>;request:()=>Promise<boolean>}){
 if(platform!=='android'||api<37)return;
 if(await permission.check())return;
 if(!await permission.request())throw new Error('Local network access is required to connect to verseVIO desktop. Allow Nearby devices / Local network in this phone’s app permissions, then scan the QR again.');
}
