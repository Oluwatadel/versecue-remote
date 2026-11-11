const {withMainApplication,withDangerousMod}=require('expo/config-plugins');
const fs=require('node:fs/promises'),path=require('node:path');
module.exports=function withDirectLanDns(config){
 config=withMainApplication(config,c=>{
  if(c.modResults.language!=='kt')throw new Error('VerseCue direct LAN routing requires the Kotlin MainApplication template.');
  const marker='// VerseCue direct private-LAN DNS';
  if(!c.modResults.contents.includes(marker)){
   if(!c.modResults.contents.includes('super.onCreate()'))throw new Error('Cannot install VerseCue LAN resolver before networking starts.');
   c.modResults.contents=c.modResults.contents.replace('super.onCreate()',`super.onCreate()
    ${marker}
    com.facebook.react.modules.network.OkHttpClientProvider.setOkHttpClientFactory {
      com.facebook.react.modules.network.OkHttpClientProvider.createClientBuilder()
        .dns(object : okhttp3.Dns {
          override fun lookup(hostname: String): List<java.net.InetAddress> {
            val address = VerseCueLanAddress.resolve(hostname)
            return if (address != null) listOf(address) else okhttp3.Dns.SYSTEM.lookup(hostname)
          }
        }).build()
    }`);
  }
  return c;
 });
 return withDangerousMod(config,['android',async c=>{
  const packageName=c.android.package;if(!/^[a-zA-Z_][\w]*(\.[a-zA-Z_][\w]*)+$/.test(packageName))throw new Error('Invalid Android package name.');
  const root=path.join(c.modRequest.platformProjectRoot,'app/src/main/java',...packageName.split('.'));await fs.mkdir(root,{recursive:true});
  const source=await fs.readFile(path.join(__dirname,'native/VerseCueLanAddress.java'),'utf8');
  await fs.writeFile(path.join(root,'VerseCueLanAddress.java'),source.replace('__PACKAGE__',packageName));return c;
 }]);
};
