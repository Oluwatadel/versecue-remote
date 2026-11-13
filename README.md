# verseVIO Remote · mobile operator workspace

A separately installed Android/iPhone companion for VerseCue desktop, designed for **landscape**. It uses the desktop libraries, prepared preview, transcription, queues and congregation display over the same private LAN.

## Pair and operate
1. Install the matching updated VerseCue desktop build.
2. Open **Preferences → Mobile remote**, choose the Wi-Fi/Ethernet address and click **Start connection**.
3. Open VerseCue Remote on the phone, grant camera/local-network access and scan the desktop QR. Keep both devices on the same non-isolated private network.
4. Use the side navigation to switch activities. Selection and preview panes scroll independently, so long book/chapter grids do not move the preview away.

| Window | Desktop functions available from the phone |
| --- | --- |
| Dashboard | Follow the latest transcript; start/pause desktop microphone; preview, bookmark, display or remove recent detections |
| Bible | Translation selection; book, chapter and verse grids; reference lookup and text search; multiple verse preparation |
| Songs | Search the desktop song library; select sections; preview, queue and display lyrics |
| Slides | Choose imported presentations and slides; preview and display; next/previous through the deck |
| Media | Pause/resume/replay/stop the selected desktop video; seek, volume and mute; integrated live sources full-screen or behind text; highlight live words |
| Queues | Shared Bible and song queues, Bible ordering, removals and display history |
| Service plan | Open saved desktop service plans and prepare or display their references |
| Text | Prepare announcements, with blank lines creating separate slides |
| Connection | Paired computer, expiry, applied desktop preferences and disconnect |

The prepared and live panels request rendered snapshots of the desktop projection surface, including its background, reference, fitted text and watermark. Text is a fallback while an image is unavailable. Video playback and audio run on the desktop; preview snapshots are not a continuous video stream. Important output changes require confirmation. File imports, speech-model management, account activation and saving application preferences remain on the desktop. AI microphone control still requires desktop activation.

QR codes are single-use and expire after 3 minutes. One phone session lasts at most 12 hours and ends when stopped/disconnected. Restarting desktop requires pairing again. Guest Wi-Fi isolation, VPN routing or a denied Windows private-network firewall rule can prevent connection. Android 1.1.2 uses the desktop address encoded in new pairing hostnames and does not depend on multicast DNS; iPhone and older versions still use system discovery.

## Develop and check

Use the Node version required by Expo SDK 58, then `npm ci`.

```powershell
npm run typecheck
npm run lint
npm run test:protocol
npx expo start
```

Expo Router screens live in `src/app`; encrypted transport lives in `src/protocol.ts`. Browser layout checks bundle the real native UI components through React Native Web with **isolated fixtures**, not a browser desktop controller:

```powershell
node tools/preview/build.cjs
node tools/check-workspace-ui.cjs
```

Set `PLAYWRIGHT_MODULE` / `PLAYWRIGHT_CHROMIUM_EXECUTABLE` to a local Playwright installation if needed. From the desktop repository, run `dotnet run --project tests/Versecue.RemoteChecks`. The UI bridge check uses an isolated in-memory SQLite database: set `VERSECUE_CHECK_WORKSPACE=1`, then run `dotnet run --project tests/Versecue.UiChecks -- artifacts/mobile-workspace --capture-dashboard`. It checks preview/queue/library behavior without opening a real projector or microphone.

## Build and distribute

```powershell
npm run build:android
npm run build:ios
```

These use Expo build services and require the project owner's Expo account. Android preview produces an APK; iPhone installation requires a signed iOS build with Apple credentials. No App Store release is configured automatically. A local Windows Android build uses `npx expo prebuild --platform android`, then from `android`: `.\gradlew.bat :app:assembleRelease '-PreactNativeArchitectures=arm64-v8a' --max-workers=2`. The Windows config plugin puts generated native objects in a short project-specific user cache folder (`%USERPROFILE%/.vcb`) to avoid Ninja filename limits without moving source or changing Windows policy.

`artifacts/verseVIO-Remote-preview.apk` is the local preview download location, with a SHA-256 checksum. Verify the installed version is **1.2.0 / build 6** for the landscape workspace; earlier 1.0 builds only have basic controls. Local builds use the development signing certificate. Physical Android/iPhone pairing on the intended church network remains a release check. An exported iOS JavaScript bundle is not an installable IPA.

## Connection protection

A QR holds a random 256-bit pairing secret. Pairing and subsequent state, queries and commands use AES-256-GCM, separate HMAC-derived request/response keys, request-bound responses, timestamps and replay rejection. Session secrets cross the LAN only inside the encrypted pairing reply, and are stored in phone secure storage. Desktop listens only after the operator starts it on one RFC1918 interface. It rejects browser Origins/public peers and limits body sizes and request rate. A fixed action/query list exposes desktop presentation content and recent transcript text, never an arbitrary filesystem browser, account password, activation/model key or raw microphone audio. Android denies general cleartext with an exception limited to generated `*.versecue.local` names; iOS grants local networking only. Share QR credentials only with the intended operator.

The phone follows the desktop’s saved theme automatically, including all 17 light/dark palettes. A desktop theme preview takes effect on the phone only after Save. Current desktops send their exact applied palette; older workspace desktops are supported through matching built-in palettes. Theme changes preserve the current mobile page and unfinished input.

### Repair Android hostname resolution
Install the 1.1.2 Android update and rebuild/reopen the matching desktop app. Stop and start Mobile remote on the desktop, choosing its real Wi-Fi/Ethernet address, and scan the new QR. Older QR codes cannot provide direct routing. Android maps only the exact private IPv4 suffix in the generated VerseCue hostname; it keeps the original hostname for the existing scoped network-security policy. No general HTTP exception or public DNS service is used. With a JDK in `JAVA_HOME`, `node tools/check-lan-dns.cjs` tests the same native Java resolver that the Android build uses.

Android 17+ prompts for local-network access before connecting. Allow it when pairing; if previously denied, enable Nearby devices / Local network for VerseCue Remote in Android app settings. Earlier Android versions use the existing Internet permission without this prompt.

### Verse positioning on the phone
Open **Verse position** below live-output controls. Choose a quick position, nudge with arrows, or adjust horizontal/vertical position, width, height and text size. **Reset to default** restores the desktop’s saved presentation layout. When a live source is behind text, choose video behind/left/right or lower third, adjust the split and fit/fill. Changes synchronize with the desktop immediately and preserve blackout; they do not open projection when off-air. Requires the matching desktop update.

## Paid mobile control

The matching desktop now requires the signed mobile-remote entitlement before listening or accepting commands. Download the controller through the paid-account QR in desktop Settings; pair with its separate connection QR. Browser sign-in and rollout requirements are in ../VERSEVIO-ROLLOUT.md. Internal app IDs/network scopes remain stable for installed users.
