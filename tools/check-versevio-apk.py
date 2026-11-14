"""Verify the update-enabled Android build before distributing it."""
from pathlib import Path
import hashlib,os,re,subprocess,sys,zipfile,json
apk=Path(sys.argv[1]).resolve()
sdk=Path(os.environ['LOCALAPPDATA'])/'Android/Sdk/build-tools/37.0.0'
def aapt(*args):return subprocess.check_output([str(sdk/'aapt.exe'),*args],text=True,encoding='utf-8')
def check(ok,description):
 if not ok:raise AssertionError(description)
 print('PASS '+description)
badging=aapt('dump','badging',str(apk))
check("application-label:'verseVIO Remote'" in badging,'verseVIO application name')
check("versionCode='7'" in badging and "versionName='1.2.1'" in badging,'version 1.2.1 / build 7')
check("native-code: 'arm64-v8a'" in badging,'ARM64 native package')
check('application-debuggable' not in badging,'release app is not debuggable')
manifest=aapt('dump','xmltree',str(apk),'AndroidManifest.xml')
main=manifest.split('com.versecue.remote.MainActivity',1)[1].split('E: activity',1)[0]
check('android:screenOrientation(0x0101001e)=(type 0x10)0x0' in main,'main activity is landscape')
check('android.permission.ACCESS_LOCAL_NETWORK' in manifest,'local network permission retained')
check('android:usesCleartextTraffic(0x010104ec)=(type 0x12)0x0' in manifest,'global cleartext remains disabled')
check('expo.modules.updates.CODE_SIGNING_CERTIFICATE' in manifest and 'BEGIN CERTIFICATE' in manifest,'native update certificate is embedded')
check('https://verse-cue-web.vercel.app/api/updates/mobile' in manifest,'native update URL is configured')
certificate_lines=Path('assets/update-certificate.pem').read_text().splitlines()[1:-1]
check(all(line in manifest for line in certificate_lines),'APK contains the exact corrected code-signing certificate')
check('expo.modules.updates.EXPO_UPDATES_LAUNCH_WAIT_MS' in manifest,'nonblocking update startup setting exists')
with zipfile.ZipFile(apk) as z:
 bundle=z.read('assets/index.android.bundle')
 for token in ['checkForUpdateAsync','fetchUpdateAsync','verseVIO', '#101828', '#E7B85C', '#5B6474', 'X-VerseCue-Session', 'Verse position','Reset to default','layout-preset','layout-set','layout-reset','layout-scene','layout-fit']:
  check(token.encode() in bundle or token.encode('utf-16le') in bundle,'bundled JavaScript includes '+token)
 dex=b''.join(z.read(n) for n in z.namelist() if re.fullmatch(r'classes\d*\.dex',n))
 check(b'VerseCue remote requires a private LAN IPv4 address' in dex,'native private-address DNS validation retained')
 resources=[n for n in z.namelist() if n.endswith('.xml') and (b'versecue.local' in z.read(n) or 'versecue.local'.encode('utf-16le') in z.read(n))]
 check(len(resources)==1,'one scoped remote network-security resource')
 security=aapt('dump','xmltree',str(apk),resources[0])
 check('E: base-config' in security and 'E: domain-config' in security and security.count('E: domain (')==1 and 'versecue.local' in security,'network security scopes a single VerseCue local domain')
 base=security.split('E: base-config',1)[1].split('E: domain-config',1)[0]
 domain=security.split('E: domain-config',1)[1]
 check('cleartextTrafficPermitted=(type 0x12)0x0' in base,'network base policy rejects cleartext')
 check('cleartextTrafficPermitted=(type 0x12)0xffffffff' in domain and 'includeSubdomains=(type 0x12)0xffffffff' in domain,'only VerseCue local subdomains permit encrypted-application transport')
def cert(file):
 result=subprocess.check_output([str(sdk/'apksigner.bat'),'verify','--print-certs',str(file)],text=True,encoding='utf-8')
 return re.search(r'certificate SHA-256 digest: (\w+)',result).group(1)
signing=cert(apk)
old=Path('artifacts/verseVIO-Remote-preview.apk')
if not old.exists():old=Path('artifacts/VerseCue-Remote-preview.apk')
if old.exists():check(signing==cert(old),'signing certificate matches the previous preview')
print('SHA256 '+hashlib.sha256(apk.read_bytes()).hexdigest())
print('APK '+str(apk))
