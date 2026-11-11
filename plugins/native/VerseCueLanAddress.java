package __PACKAGE__;

import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/** Routes only the exact private address encoded in a VerseCue pairing hostname. */
public final class VerseCueLanAddress {
    private static final Pattern HOST = Pattern.compile("^versecue-[a-f0-9]{12}-([a-f0-9]{8})\\.versecue\\.local$", Pattern.CASE_INSENSITIVE);
    private VerseCueLanAddress() {}

    public static InetAddress resolve(String hostname) throws UnknownHostException {
        Matcher match = HOST.matcher(hostname);
        if (!match.matches()) return null;
        String hex = match.group(1);
        byte[] address = new byte[4];
        for (int i = 0; i < 4; i++) address[i] = (byte) Integer.parseInt(hex.substring(i * 2, i * 2 + 2), 16);
        int a = address[0] & 255, b = address[1] & 255;
        if (!(a == 10 || a == 172 && b >= 16 && b <= 31 || a == 192 && b == 168))
            throw new UnknownHostException("VerseCue remote requires a private LAN IPv4 address");
        // getByAddress performs no DNS lookup. Keep the original hostname for HTTP policy checks.
        return InetAddress.getByAddress(hostname, address);
    }
}
