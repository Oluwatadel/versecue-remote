const fs=require('node:fs'),path=require('node:path'),{execFileSync}=require('node:child_process');
const folder=path.resolve('artifacts/update-certificate-check');fs.mkdirSync(folder,{recursive:true});
fs.writeFileSync(path.join(folder,'UpdateCertificateCheck.java'),`import java.nio.file.*;
import java.security.cert.*;
public class UpdateCertificateCheck {
 public static void main(String[] args) throws Exception {
  var certificate=(X509Certificate)CertificateFactory.getInstance("X.509").generateCertificate(Files.newInputStream(Path.of(args[0])));
  certificate.checkValidity();certificate.verify(certificate.getPublicKey());
  if(certificate.getKeyUsage()==null||!certificate.getKeyUsage()[0])throw new AssertionError("Missing Digital Signature usage");
  if(certificate.getExtendedKeyUsage()==null||!certificate.getExtendedKeyUsage().contains("1.3.6.1.5.5.7.3.3"))throw new AssertionError("Missing Code Signing usage");
  System.out.println("PASS Android-compatible X509 validity, self-signature, Digital Signature and Code Signing usages.");
 }
}`);
const bin=process.env.JAVA_HOME?path.join(process.env.JAVA_HOME,'bin'):'';
execFileSync(path.join(bin,'javac'),['-d',folder,path.join(folder,'UpdateCertificateCheck.java')],{stdio:'inherit'});
execFileSync(path.join(bin,'java'),['-cp',folder,'UpdateCertificateCheck',path.resolve('assets/update-certificate.pem')],{stdio:'inherit'});
