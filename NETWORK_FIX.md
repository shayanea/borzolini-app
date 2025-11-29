# Fix Android Emulator Network Connectivity

If your emulator shows "Connected / No internet access", try these solutions:

## Solution 1: Cold Boot Emulator (Recommended)

1. **Close the emulator completely**
2. Open Android Studio → AVD Manager
3. Click the **▼ dropdown** next to your emulator
4. Select **"Cold Boot Now"**
   - This starts fresh and usually fixes network issues

OR via command line:
```bash
# Stop all emulators
adb emu kill

# Cold boot the emulator
emulator -avd <YOUR_AVD_NAME> -no-snapshot-load
```

## Solution 2: Restart with Network Reset

1. Close the emulator
2. In Android Studio → AVD Manager → Edit your emulator
3. Click **"Show Advanced Settings"**
4. Under **Network**, ensure it's set to **"NAT"** (default)
5. Save and start the emulator

## Solution 3: Configure DNS Manually on Emulator

1. Open **Settings** on the emulator
2. Go to **Network & Internet** → **Wi-Fi**
3. Long-press **"AndroidWifi"** (or your network)
4. Tap **"Modify network"**
5. Expand **"Advanced options"**
6. Change **IP settings** to **"Static"**
7. Set DNS 1: `8.8.8.8`
8. Set DNS 2: `8.8.4.4`
9. Save and reconnect

## Solution 4: Use Physical Device (Easiest)

Since your API is on another machine (`192.168.70.174`), using a physical device is often easier:

1. Connect your phone via USB
2. Enable **USB Debugging** on your phone
3. Run: `pnpm android`
   - This will install and run on your physical device
   - Physical devices typically have better network access

## Solution 5: Use Tunnel (If other solutions fail)

If you still can't reach the API server, you can use a tunnel service:

1. On the machine running your API (`192.168.70.174`), install ngrok:
   ```bash
   # Install ngrok (example with brew on Mac)
   brew install ngrok
   
   # Start tunnel
   ngrok http 3001
   ```

2. Update `app.json` with the ngrok URL:
   ```json
   "extra": {
     "apiUrl": "https://YOUR-NGROK-URL.ngrok.io/api"
   }
   ```

## Quick Check

After applying fixes, test connectivity from emulator:
```bash
# Test if emulator can reach your API server
adb shell "ping -c 3 192.168.70.174"
```

If ping works, your app should be able to connect too!
