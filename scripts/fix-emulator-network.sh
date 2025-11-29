#!/bin/bash

# Script to fix Android emulator network connectivity
# This helps resolve "Connected / No internet access" issues

echo "🔧 Fixing Android Emulator Network Connectivity..."

# Check if emulator is connected
if ! adb devices | grep -q "emulator"; then
    echo "❌ No emulator detected. Please start your emulator first."
    exit 1
fi

echo "📱 Emulator detected. Applying network fixes..."

# Method 1: Configure DNS to Google DNS (most common fix)
echo "1️⃣ Setting DNS servers to Google DNS..."
adb shell "settings put global private_dns_mode off"
adb shell "settings put global private_dns_specifier 8.8.8.8"

# Method 2: Disable and re-enable WiFi
echo "2️⃣ Restarting WiFi..."
adb shell "svc wifi disable"
sleep 2
adb shell "svc wifi enable"
sleep 3

# Method 3: Check network configuration
echo "3️⃣ Checking network configuration..."
adb shell "settings get global airplane_mode_on"
adb shell "settings get global wifi_on"

# Method 4: Flush DNS cache (if supported)
echo "4️⃣ Clearing network cache..."
adb shell "ndc resolver flushdefaultif" || echo "   (This command may not work on all Android versions)"

echo ""
echo "✅ Network fixes applied!"
echo ""
echo "📝 Next steps:"
echo "   1. Open WiFi settings on the emulator"
echo "   2. Tap on 'AndroidWifi' (or your network)"
echo "   3. Tap 'Forget' network"
echo "   4. Reconnect to the network"
echo ""
echo "   OR restart the emulator completely:"
echo "   - Close the emulator"
echo "   - Run: pnpm android"
echo ""

