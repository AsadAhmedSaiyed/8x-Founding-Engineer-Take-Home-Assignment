# Creator App - Submission Flow

A mobile application built with React Native + Expo that enables creators to discover campaigns, view briefs and examples, and submit their content for brand collaborations.

## 📋 Features

### Campaign Discovery
- Browse active campaigns with brand name, payout, and deadline
- View detailed campaign briefs
- Watch example videos for inspiration
- Quick access to submissions from any screen

### Video Submission
- Simple form to submit Instagram Reel or TikTok URLs
- URL validation to ensure proper format
- Real-time URL preview
- Success feedback with submission confirmation

### Submission Tracking
- View all past submissions in one place
- Track submission status: Pending, Approved, Rejected
- See detailed submission information
- Empty state guidance when no submissions exist

### Data Persistence
- All submissions saved locally using AsyncStorage
- Data persists across app sessions
- No backend required (fully functional with mock data)

## 🏗️ Project Structure

```
creator-app/
├── App.js                          # Root component with context provider
├── app.json                        # Expo configuration
├── index.js                        # Entry point
├── package.json                    # Dependencies
├── assets/                         # App assets (icons, images)
├── components/
│   └── CampaignCard.js            # Reusable campaign card component
├── context/
│   └── SubmissionContext.js       # Global state management
├── data/
│   └── mockData.js                # Mock campaigns data
├── navigation/
│   └── AppNavigator.js            # Navigation configuration
├── screens/
│   ├── CampaignListScreen.js      # Campaign listing
│   ├── CampaignDetailScreen.js    # Campaign details & examples
│   ├── SubmitScreen.js            # Video submission form
│   └── SubmissionsScreen.js       # Submission history
├── styles/
│   └── theme.js                   # Design system (colors, typography, spacing)
└── ai-logs/                       # AI development session logs
    └── README.md                  # Session documentation
```

## 🎨 Design System

The app uses a consistent design system with:

### Color Palette
- **Primary**: #6366F1 (Indigo)
- **Success**: #10B981 (Emerald)
- **Danger**: #EF4444 (Red)
- **Warning**: #F59E0B (Amber)
- **Text**: #111827 (Dark Gray)
- **Muted**: #6B7280 (Medium Gray)

### Typography
- **Titles**: 20-32px, Semi-bold to Bold
- **Body**: 16px, Regular to Semi-bold
- **Small**: 12-14px, Regular to Semi-bold

### Spacing System
- **xs**: 4px
- **sm**: 8px
- **md**: 16px
- **lg**: 24px
- **xl**: 32px
- **xxl**: 48px

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ (verify with `node --version`)
- npm or yarn
- Expo CLI (optional, but recommended)

### Installation

1. Clone the repository
```bash
git clone <repo-url>
cd creator-app
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Start the development server
```bash
npm start
# or
yarn start
```

4. Run on your device or emulator
```bash
# iOS
npm run ios

# Android
npm run android

# Web (Expo)
npm run web
```

## 📱 Usage

### Browsing Campaigns
1. Launch the app
2. See all active campaigns on the home screen
3. Tap "📝 Submissions" button to view your submission history

### Viewing Campaign Details
1. Tap on any campaign card
2. Read the brief and creator requirements
3. View example videos (scroll down)

### Submitting a Video
1. From campaign details, tap "Submit Your Video"
2. Paste your Instagram Reel or TikTok URL
3. Review the URL preview
4. Tap "Submit Video"
5. Confirm submission and view status

### Checking Submission Status
1. Tap "📝 Submissions" from campaigns list
2. View all your submissions with their status
3. ✅ Approved, ⏳ Pending, ❌ Rejected

## 🔧 Key Technologies

| Technology | Version | Purpose |
|-----------|---------|---------|
| React | 19.1.0 | UI library |
| React Native | 0.81.5 | Cross-platform framework |
| Expo | 54.0.33 | Development & deployment |
| React Navigation | 7.2.2 | Navigation |
| AsyncStorage | 2.2.0 | Local data persistence |

## 📦 Available Scripts

```bash
# Start development server
npm start

# Run on Android emulator/device
npm run android

# Run on iOS simulator/device
npm run ios

# Run on web
npm run web
```

## 💾 Data Model

### Campaign
```javascript
{
  id: string,
  brand: string,
  payout: number,
  deadline: string,
  brief: string,
  examples: string[],
  status: "Active"
}
```

### Submission
```javascript
{
  id: string,
  brand: string,
  url: string,
  status: "Pending" | "Approved" | "Rejected",
  submittedAt: string
}
```

## 🎯 Key Implementation Decisions

### State Management
- **Choice**: Context API
- **Reason**: Simple, sufficient for app scope, no need for Redux complexity

### Data Persistence
- **Choice**: AsyncStorage
- **Reason**: Standard for React Native, works offline, no backend needed

### Styling Approach
- **Choice**: StyleSheet + Theme System
- **Reason**: Performance optimization, consistency, maintainability

### Navigation
- **Choice**: React Navigation Native Stack
- **Reason**: Best for mobile, smooth transitions, native feel

## 🧪 Testing the App

### Test Submission Flow
1. Tap on "Nike" campaign
2. Review the brief and examples
3. Tap "Submit Your Video"
4. Try submitting with invalid URL (e.g., "hello") - should fail
5. Try submitting with valid URL (e.g., "https://www.instagram.com/reel/abc")
6. Check submissions - should see new submission

### Test Data Persistence
1. Add a few submissions
2. Close the app completely
3. Reopen the app
4. Navigate to Submissions
5. All previous submissions should still be there

## 🐛 Known Limitations

- Example video URLs are mocked (not real videos)
- No actual video verification
- Status is randomly assigned (in real app, would be from backend)
- No image/video upload capability (URLs only)
- No user authentication

## 📝 Development Notes

### Performance Considerations
- FlatList is used for submissions (efficient even with many items)
- StyleSheet is used instead of inline styles (performance optimization)
- Theme object is defined once and reused

### Accessibility
- Touch targets are 48px+ (minimum recommended size)
- Colors have sufficient contrast ratios
- Text is readable without relying on color alone

### Code Quality
- Consistent naming conventions
- Clear component structure
- Reusable components and styles
- No console errors or warnings

## 🚀 Future Enhancements

- [ ] Backend API integration
- [ ] User authentication
- [ ] Real video upload
- [ ] Push notifications
- [ ] Analytics
- [ ] Creator profile
- [ ] Campaign filtering/search
- [ ] Comments on submissions
- [ ] Payment integration

## 📄 License

This is a take-home assignment and not intended for production use.

## 👨‍💻 Development

Built with ❤️ using React Native + Expo

For detailed development process and AI session logs, see [AI Logs](./ai-logs/README.md)
