# Code Overview - Creator App

Quick reference for understanding the codebase structure and key decisions.

## 🗂️ File-by-File Breakdown

### Root Files

#### `App.js`
- Root component that wraps the entire app with SubmissionProvider
- Simple: 7 lines
- Provides global submission state context to all screens

#### `app.json`
- Expo configuration file
- Defines app name, version, splash screen, icons
- Platform-specific settings

#### `index.js`
- Expo entry point
- Just imports and exports App

#### `package.json`
- Dependency list (React, React Native, Expo, Navigation)
- Scripts for running app on different platforms
- Minimal dependencies, no heavy libraries

---

## 📁 /components

### `CampaignCard.js` (70 lines)
**Purpose**: Reusable card component for displaying campaign summary

**Exports**: Single component function

**Props**:
```javascript
campaign: {
  id, brand, payout, deadline, brief,
  examples, status
}
```

**Key Features**:
- Status badge showing "Active"
- Payout displayed prominently in primary color
- Deadline shown in tertiary color
- Uses theme tokens for consistent styling

**Styling Approach**: StyleSheet.create() for performance

---

## 🎯 /screens

### `CampaignListScreen.js` (45 lines)
**Purpose**: Home screen - browse all active campaigns

**Navigation Props**: navigation object

**State**: None (reads from props)

**Key Features**:
- FlatList for efficient rendering
- "📝 Submissions" button for quick access
- Header with campaign count
- Touch feedback (activeOpacity)

**Data Flow**: campaigns from mockData → CampaignCard

### `CampaignDetailScreen.js` (160 lines)
**Purpose**: Full campaign details view

**Route Params**: `{ campaign }`

**Key Features**:
- ScrollView for long content
- Payout and deadline in info card
- Brief text section
- Example videos as tappable cards
- Large submit button

**Linking**: Links opening (mocked with alert in demo)

**User Actions**:
1. Browse campaign brief
2. View example video URLs
3. Tap to submit video

### `SubmitScreen.js` (170 lines)
**Purpose**: Video submission form

**Route Params**: `{ campaign }`

**Context**: Reads `addSubmission` from SubmissionContext

**State**:
```javascript
url: string           // Form input
isLoading: boolean    // Submission in progress
```

**Validation**:
- URL not empty
- Contains instagram.com or tiktok.com
- Returns boolean, shows alert on error

**Key Features**:
- Campaign info at top for context
- URL input with helper text
- URL preview showing what's submitted
- Info box with submission guidelines
- Loading state during submission

**User Actions**:
1. Paste video URL
2. See preview update
3. Submit
4. Get confirmation with navigation options

### `SubmissionsScreen.js` (150 lines)
**Purpose**: View all submitted videos and their status

**Context**: Reads `submissions` from SubmissionContext

**Key Features**:
- Header showing submission count
- Back button to campaigns
- Status badges with icons and colors
- Empty state with CTA
- URL preview in collapsible format

**Status Colors**:
```javascript
Approved  → Green (#10B981)
Rejected  → Red (#EF4444)
Pending   → Amber (#F59E0B)
```

**Empty State**: Shows emoji, title, description, and button to browse campaigns

---

## 🎨 /styles

### `theme.js` (100 lines)
**Purpose**: Single source of truth for design tokens

**Exports**:
```javascript
COLORS        // 15+ color definitions
SPACING       // 6 spacing sizes
BORDER_RADIUS // 4 border radius sizes
TYPOGRAPHY    // 8 typography scales
```

**Color Palette Philosophy**:
- Primary: Indigo (#6366F1) for main actions
- Semantic colors: Success, Danger, Warning
- Neutral grays for text and backgrounds
- Light variants for backgrounds/badges

**Spacing System**: Based on 8px unit
- xs=4, sm=8, md=16, lg=24, xl=32, xxl=48

**Typography System**: 3 sizes with variants
- title1/title2/title3 (headers)
- body/bodyStrong (content)
- small/smallStrong (labels)
- caption (metadata)

**Usage**: Imported everywhere as:
```javascript
import { COLORS, SPACING, TYPOGRAPHY } from '../styles/theme';
```

---

## 📊 /context

### `SubmissionContext.js` (55 lines)
**Purpose**: Global state for submissions (Context API)

**State**:
```javascript
submissions: Array<{
  id, brand, url, status, submittedAt
}>
```

**Functions**:
- `loadSubmissions()` - Load from AsyncStorage on app start
- `saveSubmissions(data)` - Save to AsyncStorage
- `addSubmission(campaign, url)` - Add new submission

**Status Distribution**:
- 70% Pending (realistic for demo)
- 20% Approved
- 10% Rejected

**Persistence**: AsyncStorage key = "submissions"

**Provider Pattern**: Wraps App component to provide context

---

## 💾 /data

### `mockData.js` (30 lines)
**Purpose**: Mock campaign data

**Structure**: Array of 6 campaigns

**Campaign Object**:
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

**Brands**:
1. Nike - fitness
2. Zomato - food delivery
3. Apple - tech lifestyle
4. Spotify - music curation
5. Adobe Creative Cloud - creator tools
6. Starbucks - lifestyle

**Payouts**: $200-800 per video

---

## 🧭 /navigation

### `AppNavigator.js` (55 lines)
**Purpose**: Configure navigation structure

**Navigator Type**: Native Stack Navigator

**Screens**:
1. Campaigns (no header, custom UI)
2. Details (no header, custom UI)
3. Submit (standard header with back button)
4. Submissions (no header, custom UI)

**Global Header Styling**:
- Background: white
- Border bottom: light gray
- Title: bold body text
- Tint: primary indigo

**Navigation Patterns**:
- Campaigns → Details (tab or press card)
- Details → Submit (button press)
- Submit → Submissions (after submit)
- Submissions ↔ Campaigns (buttons in headers)

---

## 🔄 Data Flow

```
App (SubmissionProvider)
  ↓
AppNavigator (Stack Navigator)
  ├→ CampaignListScreen
  │   └→ CampaignCard (mapped from mockData)
  │   └→ Navigate to Details
  │
  ├→ CampaignDetailScreen
  │   └→ Shows campaign from route.params
  │   └→ Navigate to Submit
  │
  ├→ SubmitScreen
  │   └→ Context: addSubmission
  │   └→ Navigate to Submissions
  │
  └→ SubmissionsScreen
      └→ Context: submissions
      └→ Display list or empty state
```

---

## 🔧 Key Implementation Patterns

### 1. **Context for State**
```javascript
const { submissions, addSubmission } = useContext(SubmissionContext);
```

### 2. **FlatList for Lists**
```javascript
<FlatList
  data={campaigns}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => <CampaignCard campaign={item} />}
/>
```

### 3. **Theme Usage**
```javascript
const styles = StyleSheet.create({
  card: {
    padding: SPACING.md,
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.lg,
  }
});
```

### 4. **Navigation**
```javascript
navigation.navigate("Details", { campaign: item });
navigation.navigate("Submit", { campaign });
navigation.goBack();
```

### 5. **Conditional Styling**
```javascript
style={[styles.button, isLoading && styles.buttonDisabled]}
```

### 6. **AsyncStorage**
```javascript
const data = await AsyncStorage.getItem("submissions");
await AsyncStorage.setItem("submissions", JSON.stringify(newData));
```

---

## 🎯 Component Hierarchy

```
<App>
  <SubmissionProvider>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Campaigns">
          <CampaignListScreen>
            <FlatList>
              <CampaignCard /> (×N)
        <Stack.Screen name="Details">
          <CampaignDetailScreen>
            <ScrollView>
              <TouchableOpacity> (×N)
        <Stack.Screen name="Submit">
          <SubmitScreen>
            <TextInput />
            <TouchableOpacity />
        <Stack.Screen name="Submissions">
          <SubmissionsScreen>
            <FlatList>
              <View /> (×N)
```

---

## 📝 Code Metrics

| Metric | Count |
|--------|-------|
| Total Lines | ~800 |
| Screens | 4 |
| Components | 2 |
| Context Providers | 1 |
| Stylesheets | 5 |
| Dependencies | 6 |
| Mock Items | 6 campaigns |

---

## ✅ Code Quality Checklist

- ✅ No console errors/warnings
- ✅ Proper key props in lists
- ✅ Consistent naming conventions
- ✅ No code duplication
- ✅ Reusable components where appropriate
- ✅ Centralized styling via theme
- ✅ Clean imports and exports
- ✅ Proper error handling
- ✅ Good component documentation
- ✅ Scalable architecture

---

## 🔍 Quick Search Guide

**To find...**  
- Colors → `styles/theme.js` (COLORS object)
- Spacing → `styles/theme.js` (SPACING object)
- Campaign data → `data/mockData.js`
- Campaign list → `screens/CampaignListScreen.js`
- Form validation → `screens/SubmitScreen.js`
- Status colors → `screens/SubmissionsScreen.js` (getStatusColor)
- Navigation → `navigation/AppNavigator.js`
- Global state → `context/SubmissionContext.js`

---

## 🚀 How to Extend

### Add a New Campaign
Edit `data/mockData.js`, add object to campaigns array.

### Change Primary Color
Edit `styles/theme.js`, change `primary: "#6366F1"` to new value.

### Add a New Screen
1. Create file in `screens/NewScreen.js`
2. Add to `navigation/AppNavigator.js`
3. Import and use in other screens

### Add a New Data Field to Submission
1. Update `SubmissionContext.js` addSubmission function
2. Display in `screens/SubmissionsScreen.js`

---

## 🎓 Learning Points

**If you're new to React Native, focus on:**
1. Component structure (similar to React)
2. StyleSheet usage (performance best practice)
3. Navigation patterns (unique to mobile)
4. FlatList (key for efficient lists)
5. Context API for state (optional, but clean)

**Architecture lessons:**
1. Design system prevents style duplication
2. Centralized mock data makes testing easy
3. Context API sufficient for simple state
4. Navigation should be explicit and clear
5. Screens should be independent and reusable

---

Last updated: April 17, 2026
