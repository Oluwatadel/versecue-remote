const fs=require('node:fs'),path=require('node:path'),{execFileSync}=require('node:child_process');
const root=path.resolve('artifacts/native-dns-check'),source=fs.readFileSync('plugins/native/VerseCueLanAddress.java','utf8').replace('__PACKAGE__','com.versecue.remote');
fs.mkdirSync(root,{recursive:true});fs.writeFileSync(path.join(root,'VerseCueLanAddress.java'),source);
fs.writeFileSync(path.join(root,'LanDnsCheck.java'),`import com.versecue.remote.VerseCueLanAddress;
import java.net.UnknownHostException;
public class LanDnsCheck {
 public static void main(String[] args) throws Exception {
  String[][] valid={{"0a000001","10.0.0.1"},{"ac100001","172.16.0.1"},{"ac1ffffe","172.31.255.254"},{"c0a8010a","192.168.1.10"}};
  for(String[] entry:valid){String host="versecue-001122aabbcc-"+entry[0]+".versecue.local";var address=VerseCueLanAddress.resolve(host);if(!address.getHostAddress().equals(entry[1])||!address.getHostName().equals(host))throw new AssertionError(host);System.out.println("PASS Android native resolver: "+entry[1]+" without DNS");}
  for(String hex:new String[]{"08080808","7f000001","a9fea9fe","ac0fffff","ac200001","00000000","e00000fb"}){try{VerseCueLanAddress.resolve("versecue-001122aabbcc-"+hex+".versecue.local");throw new AssertionError(hex);}catch(UnknownHostException expected){System.out.println("PASS reject non-private native address: "+hex);}}
  for(String host:new String[]{"example.com","versecue-001122aabbcc.versecue.local","versecue-001122aabbcc-c0a8010a.versecue.local.evil.com","versecue-001122aabbcc-c0a8010.versecue.local"})if(VerseCueLanAddress.resolve(host)!=null)throw new AssertionError(host);
  System.out.println("PASS legacy names stay with system DNS; unrelated and malformed hosts cannot select a direct address.");
 }
}`);
const bin=process.env.JAVA_HOME?path.join(process.env.JAVA_HOME,'bin'):'';execFileSync(path.join(bin,'javac'),['-d',root,path.join(root,'VerseCueLanAddress.java'),path.join(root,'LanDnsCheck.java')],{stdio:'inherit'});execFileSync(path.join(bin,'java'),['-cp',root,'LanDnsCheck'],{stdio:'inherit'});
