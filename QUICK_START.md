# Quick Start Guide

Get the Creator App running in 2 minutes.

## ⚡ One-Liner Installation

```bash
npm install && npm start
```

Then press `a` for Android, `i` for iOS, or `w` for Web.

## 📱 Full Instructions

### 1. Install Dependencies
```bash
npm install
```

Expected time: 1-2 minutes

### 2. Start Development Server
```bash
npm start
```

You should see:
```
> Expo is ready on http://localhost:8081
```

### 3. Run on Your Device

**On Android**:
- Press `a` in the terminal
- Expo Go app opens automatically on emulator/device

**On iOS**:
- Press `i` in the terminal
- iPhone simulator opens

**On Web**:
- Press `w` in the terminal
- Opens http://localhost:19006 in browser

### 4. Test the App

1. **See the campaigns**: You should see 6 campaigns (Nike, Zomato, Apple, Spotify, Adobe, Starbucks)
2. **Tap a campaign**: Click on Nike
3. **Submit a video**: Tap "Submit Your Video"
4. **Enter a URL**: Paste `https://www.instagram.com/reel/abc123/`
5. **Check status**: Tap "📝 Submissions"

That's it! The app is working.

## 🐛 Troubleshooting

### Issue: "Command not found: npm"
**Solution**: Install Node.js from https://nodejs.org/

### Issue: "Expo not found"
**Solution**: Expo is installed via npm install, but if you want Expo CLI:
```bash
npm install -g expo-cli
```

### Issue: Port 8081 already in use
**Solution**: Kill the process or use a different port:
```bash
npm start -- --port 8082
```

### Issue: Can't connect on emulator
**Solution**: Make sure emulator is running:
- Android: `emulator -list-avds` then `emulator -avd <avd-name>`
- iOS: `xcrun simctl list` then select from Xcode

### Issue: App crashes on startup
**Solution**: Check for errors in terminal, ensure all dependencies installed:
```bash
rm -rf node_modules package-lock.json
npm install
```

## 📚 Next Steps

- **Want to learn the code?** → Read [CODE_OVERVIEW.md](./ai-logs/CODE_OVERVIEW.md)
- **Want to understand decisions?** → Read [REFLECTION.md](./REFLECTION.md)
- **Need full documentation?** → Read [README.md](./README.md)
- **Want to record a video?** → Follow [LOOM_GUIDE.md](./ai-logs/LOOM_GUIDE.md)

## ⚙️ Environment Info

- **Node**: v16+ (check with `node --version`)
- **npm**: v7+ (check with `npm --version`)
- **Expo**: Installed via `npm install`
- **React**: 19.1.0
- **React Native**: 0.81.5

## 🎯 What Works

✅ Browse 6 campaigns  
✅ View campaign details  
✅ Submit videos with URL validation  
✅ Track submission status  
✅ Data persists (AsyncStorage)  
✅ Works on iOS, Android, Web  

## 💾 Data Management

- All data stored locally in AsyncStorage
- No internet connection needed
- Persists when app closes
- Clear data: Settings app → Creator App → Storage → Clear

## 🆘 Get Help

All documentation is in the project:
- `README.md` - Complete overview
- `REFLECTION.md` - Development process
- `ai-logs/CODE_OVERVIEW.md` - Code structure
- `ai-logs/LOOM_GUIDE.md` - Video recording

---

**Ready?** Run `npm start` and enjoy! 🚀
