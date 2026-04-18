Chat link: https://chatgpt.com/share/69e3248d-b72c-8323-ab1c-c57e0fa3918c

I have to build this i am full stack web dev with zero knowlege of react native guide me to complete this task and also code should be of production leveland dont just give code explain it like a teacher 8x Founding Engineer — Take-Home Assignment Thanks for applying. Before we hop on a call, here's a small build task. 
The Brief 
Build a creator mobile app — the submission flow. A creator should be able to: 1. See a list of active campaigns — brand, payout per video, deadline 
2. Tap into a campaign — read the brief + watch 1–2 example videos to replicate 3. Submit a video URL (TikTok / Instagram) 
4. See submission status — pending / approved / rejected 
Mocked data is fine — no backend needed. Make up the campaigns and example videos. Stack: Expo + React Native. 
Send Back 
1. Repo link 
2. Loom (≤5 min) — walk through the UI, then a quick code overview: project structure, key decisions, and anything you'd do differently 
3. AI session logs — export your Claude Code / Cursor / ChatGPT history into /ai-logs/ in the repo 
4. Short written reflection — what was hard, what was easy, your process, and how long it took 
Timebox 
~5 hours. Spend more if you want, but tell us honestly — we weight time. Deadline: 48 hours from receiving this assignment. 
Any questions, just reply to this email. — Theo

Alright — let's translate this into what you actually have to build, then I'll guide you step-by-step like a mentor (not just dump code).

🚀 What you actually have to build (simple terms)

You are building a mobile app (not website) for creators.

Think of it like:

👉 Brands post campaigns
👉 Creators apply by submitting videos
👉 App tracks submission status

📱 Core Features (ONLY these — don't overbuild)
1. Campaign List Screen

User sees list like:

Nike — ₹500/video — Deadline: 20 Apr
Zomato — ₹300/video — Deadline: 25 Apr

👉 This is your home screen

2. Campaign Detail Screen

When user clicks a campaign:

Show:
Brand name
Description (brief)
Example videos (YouTube links or dummy videos)

👉 Think: "What creator needs to understand task"

3. Submit Screen

User submits:

Video URL (Instagram / TikTok link)
Click submit button

👉 No backend → just store locally (state)

4. Submission Status Screen

Show list:

Campaign name
Status:
⏳ Pending
✅ Approved
❌ Rejected

👉 You can randomize status (since no backend)

🧠 Tech You MUST use
React Native → for mobile app
Expo → makes setup easy

👉 Since you're a web dev, think:

React Native = React but for mobile UI
Expo = no Android Studio headache
🧩 High-Level Architecture
App
 ├── Screens
 │    ├── CampaignList
 │    ├── CampaignDetail
 │    ├── Submit
 │    └── Submissions
 │
 ├── Components
 │    ├── CampaignCard
 │
 ├── Data
 │    ├── mockCampaigns.js
 │
 ├── Navigation
⚡ Step 1: Setup (Don't skip)
npx create-expo-app creator-app
cd creator-app
npm start

Run on phone using Expo Go app.

⚡ Step 2: Install Navigation
npm install @react-navigation/native
npx expo install react-native-screens react-native-safe-area-context
npm install @react-navigation/native-stack
⚡ Step 3: Basic Navigation (IMPORTANT)

Think like routing in React:

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
App.js
import CampaignList from './screens/CampaignList';
import CampaignDetail from './screens/CampaignDetail';
import SubmitScreen from './screens/SubmitScreen';
import Submissions from './screens/Submissions';

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Campaigns" component={CampaignList} />
        <Stack.Screen name="Details" component={CampaignDetail} />
        <Stack.Screen name="Submit" component={SubmitScreen} />
        <Stack.Screen name="Submissions" component={Submissions} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
⚡ Step 4: Mock Data
export const campaigns = [
  {
    id: 1,
    brand: "Nike",
    payout: 500,
    deadline: "20 Apr",
    brief: "Create a fitness reel wearing Nike shoes",
    examples: [
      "https://youtube.com/example1",
      "https://youtube.com/example2"
    ]
  },
  {
    id: 2,
    brand: "Zomato",
    payout: 300,
    deadline: "25 Apr",
    brief: "Food delivery experience reel",
    examples: ["https://youtube.com/example3"]
  }
];
⚡ Step 5: Campaign List Screen
Key concept: FlatList (like map but optimized)
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { campaigns } from '../data/mockData';

export default function CampaignList({ navigation }) {
  return (
    <FlatList
      data={campaigns}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => navigation.navigate('Details', { campaign: item })}
        >
          <View style={{ padding: 16 }}>
            <Text>{item.brand}</Text>
            <Text>₹{item.payout} per video</Text>
            <Text>Deadline: {item.deadline}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
}
⚡ Step 6: Campaign Detail Screen
import { View, Text, Button } from 'react-native';

export default function CampaignDetail({ route, navigation }) {
  const { campaign } = route.params;

  return (
    <View style={{ padding: 16 }}>
      <Text>{campaign.brand}</Text>
      <Text>{campaign.brief}</Text>

      {campaign.examples.map((url, index) => (
        <Text key={index}>{url}</Text>
      ))}

      <Button
        title="Submit Video"
        onPress={() => navigation.navigate('Submit', { campaign })}
      />
    </View>
  );
}
⚡ Step 7: Submit Screen
import { useState } from 'react';
import { View, TextInput, Button } from 'react-native';

export default function SubmitScreen({ route, navigation }) {
  const { campaign } = route.params;
  const [url, setUrl] = useState('');

  const handleSubmit = () => {
    alert("Submitted!");
    navigation.navigate('Submissions');
  };

  return (
    <View style={{ padding: 16 }}>
      <TextInput
        placeholder="Enter video URL"
        value={url}
        onChangeText={setUrl}
        style={{ borderWidth: 1, padding: 10 }}
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
}
⚡ Step 8: Submission Status Screen
const submissions = [
  { id: 1, brand: "Nike", status: "Pending" },
  { id: 2, brand: "Zomato", status: "Approved" }
];
🧠 Important Production-Level Tips
✅ UI polish matters MORE than features
Use spacing
Add cards
Use colors for status
✅ Keep code clean
Separate files
Reusable components
✅ Add small enhancements
Validate URL input
Disable submit if empty
Show loading state
🎥 Loom Video (VERY IMPORTANT)

Explain:

UI flow
Code structure
Why you chose Expo
What you'd improve:
Add backend
Real video preview
Authentication
🧾 Reflection (write this)

Talk about:

Learning curve of React Native
Difference from web
Time spent
Challenges (navigation, styling)
⚠️ Reality Check

You don't need backend
You don't need perfect UI
You DO need clean thinking + structure

👉 Next Step

If you want, I can:

✅ 
Convert this into production-level folder structure + reusable components
✅ 
Add beautiful UI (Tailwind-like styling)
✅ 
Help you finish this in 5 hours strategically
✅ 
Prepare perfect Loom script (this is where most people fail)

Just say:
👉 "Help me finish this in 5 hours step-by-step"

dont give just code explain it like a teacher and give code filewise and make ui and all thing production leve;

Good — this is the right mindset. If you do this properly (clean structure + solid UI + clear thinking), this assignment can actually impress a founding engineer, not just pass.

I'll teach you like you're transitioning from web → mobile, and we'll build this step-by-step, production-level, not hacky.

🧠 First — How to Think (Very Important)

In web (React), you think:

Pages → /home, /about

In React Native:

You think in Screens
Navigation replaces routing

In Expo:

You don't worry about Android/iOS setup
Just focus on UI + logic
🏗️ Final App Architecture (Production Level)

We are NOT writing everything in one file (rookie mistake).

creator-app/
│
├── App.js
├── navigation/
│   └── AppNavigator.js
│
├── screens/
│   ├── CampaignListScreen.js
│   ├── CampaignDetailScreen.js
│   ├── SubmitScreen.js
│   └── SubmissionsScreen.js
│
├── components/
│   └── CampaignCard.js
│
├── data/
│   └── mockData.js
│
├── context/
│   └── SubmissionContext.js
│
└── styles/
    └── theme.js

👉 This structure alone signals "this guy is not a beginner"

🎯 Step 1: Theme (Production UI mindset)

Instead of random styles everywhere → create a design system

styles/theme.js
export const COLORS = {
  primary: "#4F46E5",
  background: "#F9FAFB",
  card: "#FFFFFF",
  text: "#111827",
  muted: "#6B7280",
  success: "#16A34A",
  danger: "#DC2626",
  warning: "#F59E0B",
};

export const SPACING = {
  sm: 8,
  md: 16,
  lg: 24,
};

👉 Why this matters:

Consistent UI
Easy to scale
Looks "designed", not random
🎯 Step 2: Mock Data
data/mockData.js
export const campaigns = [
  {
    id: "1",
    brand: "Nike",
    payout: 500,
    deadline: "20 Apr",
    brief: "Create a high-energy fitness reel using Nike shoes.",
    examples: [
      "https://youtube.com/shorts/1",
      "https://youtube.com/shorts/2"
    ]
  },
  {
    id: "2",
    brand: "Zomato",
    payout: 300,
    deadline: "25 Apr",
    brief: "Show your food delivery experience creatively.",
    examples: [
      "https://youtube.com/shorts/3"
    ]
  }
];
🎯 Step 3: Global State (IMPORTANT DIFFERENCE FROM WEB)

You need to store submissions somewhere.

👉 Instead of backend → we simulate using Context API

context/SubmissionContext.js
import { createContext, useState } from "react";

export const SubmissionContext = createContext();

export const SubmissionProvider = ({ children }) => {
  const [submissions, setSubmissions] = useState([]);

  const addSubmission = (campaign, url) => {
    const statuses = ["Pending", "Approved", "Rejected"];

    const newSubmission = {
      id: Date.now().toString(),
      brand: campaign.brand,
      url,
      status: statuses[Math.floor(Math.random() * 3)],
    };

    setSubmissions((prev) => [newSubmission, ...prev]);
  };

  return (
    <SubmissionContext.Provider value={{ submissions, addSubmission }}>
      {children}
    </SubmissionContext.Provider>
  );
};

👉 Why this is production-level thinking:

Separation of concerns
Scalable if backend comes later
🎯 Step 4: Navigation
navigation/AppNavigator.js
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import CampaignListScreen from "../screens/CampaignListScreen";
import CampaignDetailScreen from "../screens/CampaignDetailScreen";
import SubmitScreen from "../screens/SubmitScreen";
import SubmissionsScreen from "../screens/SubmissionsScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Campaigns" component={CampaignListScreen} />
        <Stack.Screen name="Details" component={CampaignDetailScreen} />
        <Stack.Screen name="Submit" component={SubmitScreen} />
        <Stack.Screen name="Submissions" component={SubmissionsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
App.js
import AppNavigator from "./navigation/AppNavigator";
import { SubmissionProvider } from "./context/SubmissionContext";

export default function App() {
  return (
    <SubmissionProvider>
      <AppNavigator />
    </SubmissionProvider>
  );
}
🎯 Step 5: Reusable UI Component (VERY IMPORTANT)
components/CampaignCard.js
import { View, Text, StyleSheet } from "react-native";
import { COLORS, SPACING } from "../styles/theme";

export default function CampaignCard({ campaign }) {
  return (
    <View style={styles.card}>
      <Text style={styles.brand}>{campaign.brand}</Text>
      <Text style={styles.payout}>₹{campaign.payout} / video</Text>
      <Text style={styles.deadline}>Deadline: {campaign.deadline}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    borderRadius: 12,
    elevation: 3,
  },
  brand: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.text,
  },
  payout: {
    color: COLORS.primary,
    marginTop: 4,
  },
  deadline: {
    color: COLORS.muted,
    marginTop: 4,
  },
});

👉 This is what makes your UI feel clean and professional

🎯 Step 6: Campaign List Screen
screens/CampaignListScreen.js
import { View, FlatList, TouchableOpacity } from "react-native";
import CampaignCard from "../components/CampaignCard";
import { campaigns } from "../data/mockData";
import { SPACING } from "../styles/theme";

export default function CampaignListScreen({ navigation }) {
  return (
    <View style={{ padding: SPACING.md }}>
      <FlatList
        data={campaigns}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Details", { campaign: item })
            }
          >
            <CampaignCard campaign={item} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

👉 Concepts you learn:

FlatList = optimized list (not .map)
TouchableOpacity = clickable div
🎯 Step 7: Campaign Detail Screen
screens/CampaignDetailScreen.js
import { View, Text, Button } from "react-native";
import { SPACING, COLORS } from "../styles/theme";

export default function CampaignDetailScreen({ route, navigation }) {
  const { campaign } = route.params;

  return (
    <View style={{ padding: SPACING.md }}>
      <Text style={{ fontSize: 22, fontWeight: "bold" }}>
        {campaign.brand}
      </Text>

      <Text style={{ marginTop: 10 }}>{campaign.brief}</Text>

      <Text style={{ marginTop: 10, color: COLORS.muted }}>
        Example Videos:
      </Text>

      {campaign.examples.map((url, index) => (
        <Text key={index} style={{ color: COLORS.primary }}>
          {url}
        </Text>
      ))}

      <Button
        title="Submit Video"
        onPress={() => navigation.navigate("Submit", { campaign })}
      />
    </View>
  );
}
🎯 Step 8: Submit Screen (Important Logic)
screens/SubmitScreen.js
import { useState, useContext } from "react";
import { View, TextInput, Button, Alert } from "react-native";
import { SubmissionContext } from "../context/SubmissionContext";
import { SPACING } from "../styles/theme";

export default function SubmitScreen({ route, navigation }) {
  const { campaign } = route.params;
  const { addSubmission } = useContext(SubmissionContext);

  const [url, setUrl] = useState("");

  const handleSubmit = () => {
    if (!url) {
      Alert.alert("Error", "Please enter a URL");
      return;
    }

    addSubmission(campaign, url);
    navigation.navigate("Submissions");
  };

  return (
    <View style={{ padding: SPACING.md }}>
      <TextInput
        placeholder="Paste Instagram/TikTok URL"
        value={url}
        onChangeText={setUrl}
        style={{
          borderWidth: 1,
          padding: 12,
          borderRadius: 8,
          marginBottom: 10,
        }}
      />

      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
}
🎯 Step 9: Submission Status Screen
screens/SubmissionsScreen.js
import { useContext } from "react";
import { View, Text, FlatList } from "react-native";
import { SubmissionContext } from "../context/SubmissionContext";
import { COLORS, SPACING } from "../styles/theme";

export default function SubmissionsScreen() {
  const { submissions } = useContext(SubmissionContext);

  const getColor = (status) => {
    if (status === "Approved") return COLORS.success;
    if (status === "Rejected") return COLORS.danger;
    return COLORS.warning;
  };

  return (
    <View style={{ padding: SPACING.md }}>
      <FlatList
        data={submissions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ marginBottom: SPACING.md }}>
            <Text style={{ fontWeight: "bold" }}>{item.brand}</Text>
            <Text style={{ color: getColor(item.status) }}>
              {item.status}
            </Text>
          </View>
        )}
      />
    </View>
  );
}
🎨 What Makes This "Production Level"

Not just code — these decisions:

✅ Clean folder structure
✅ Reusable components
✅ Theme system
✅ Context for state
✅ Input validation
✅ Navigation separation

⏱️ Real Strategy (5-hour plan)
Setup + Navigation → 1 hr
Campaign screens → 1.5 hr
Submission flow → 1.5 hr
UI polish → 1 hr
🎥 Next (CRUCIAL for selection)

If you want, I'll help you with:

👉 EXACT Loom script (what to say)
👉 How to sound like founding engineer level
👉 How to explain decisions (this is where 90% fail)

Just say:
"Give me Loom script + final polish checklist"

what to install and how to run?

Good — let's slow down and do this properly like a setup guide, not just commands. If your setup is wrong, everything breaks later.

🧠 What you are doing (concept first)

You are building a mobile app, but you won't use Android Studio directly.

Instead:

👉 Expo acts like a wrapper
👉 React Native runs your app

Think:

Expo = "Node.js + Create React App" for mobile
React Native = actual framework
✅ Step 0: Prerequisites (MUST HAVE)

Before anything, install:

1. Node.js

👉 Check if installed:

node -v

If not → install from:
👉 https://nodejs.org

2. npm (comes with Node)
npm -v
3. Phone OR Emulator
Option A (BEST for you)

👉 Install Expo Go app on your phone (Android)

This is easiest — no emulator needed.

🚀 Step 1: Create Project

Run this in terminal:

npx create-expo-app creator-app

👉 It will ask:

Choose blank template (JavaScript)

Then:

cd creator-app
🚀 Step 2: Run the App
npm start

👉 This opens a browser with QR code

📱 Run on your phone
Open Expo Go
Scan QR code

👉 Your app will open instantly

💻 Alternative (if phone not available)

Press:

a

👉 Opens Android emulator (if installed)

🚀 Step 3: Install Required Libraries

Now install navigation (very important):

npm install @react-navigation/native

Then:

npx expo install react-native-screens react-native-safe-area-context

Then:

npm install @react-navigation/native-stack
🧪 Step 4: Test Setup (IMPORTANT)

Replace your App.js with:

import { Text, View } from 'react-native';

export default function App() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>App Running 🚀</Text>
    </View>
  );
}

👉 If you see this on phone → setup is correct

🔁 How Development Works (IMPORTANT MENTAL MODEL)

You don't restart like backend.

👉 You just save file → app auto reloads

If stuck:

Press r in terminal → reload
Or shake phone → reload
⚠️ Common Errors (I'll save you hours)
❌ Error: "Metro bundler stuck"

👉 Fix:

npm start -- --clear
❌ App not loading on phone
Same WiFi required
Or use "Tunnel" option in Expo
❌ Navigation not working

👉 You forgot to install dependencies properly

📦 Final Checklist

Before coding:

✅ Node installed
✅ Expo app installed on phone
✅ Project runs with QR
✅ Navigation packages installed

🎯 What you do NEXT

After setup:

👉 Create folders (manually):

screens/
components/
navigation/
data/
context/
styles/

🚀 If you want speed (recommended)

Next I can guide you like:

👉 "Do this → run → verify → next step"

So you don't get stuck.

Just say:
"Guide me step-by-step while I build (interactive mode)"

$ npx create-expo-app creator-app
Need to install the following packages:
create-expo-app@3.5.3
Ok to proceed? (y) y

Creating an Expo project using the default template.

✔ Downloaded and extracted project files.
> npm install
⠹   it has ts version what to do?

Good catch — this is a common confusion and you handled it at the right time 👍

🧠 What happened?

By default, Expo sometimes creates a project with:

👉 TypeScript (TS) instead of JavaScript

That's why you're seeing:

.ts / .tsx files
tsconfig.json
❗ Should you use TypeScript?

Since:

You're new to React Native
You're time-boxed (5 hours)

👉 NO — switch to JavaScript

TypeScript will slow you down right now.

✅ Best Option (Recommended): Recreate Project in JS

Delete current project:

rm -rf creator-app

Then create again with JavaScript template:

npx create-expo-app creator-app --template blank

👉 This ensures:

No TypeScript
Simple .js files
Faster development
🔍 How to confirm it's JS (important)

After creation:

You should see:

App.js ✅
NOT App.tsx ❌
No tsconfig.json ❌
⚠️ If you DON'T want to recreate (not recommended)

You can still use TS project as JS:

👉 Just write normal JS inside .tsx files

BUT:

You'll see type errors
Confusing warnings
Not worth it under time pressure
🚀 After fixing this

Run:

cd creator-app
npm start

Then:

Scan QR with Expo Go
Confirm app runs
🎯 Pro Tip (very important for your assignment)

Recruiters don't care if you used TS or JS.

They care about:

Structure
UI
Thinking
Clean code

👉 So don't over-engineer — ship clean.

👉 Next Step

Once your app runs successfully, tell me:

"Setup done"

Then I'll guide you:
👉 building UI screen-by-screen (like a mentor sitting next to you)

npx create-expo-app creator-app --template blank
Creating an Expo project using the blank template.

✔ Downloaded and extracted project files.
> npm install

added 691 packages, and audited 692 packages in 2m

✅ Your project is ready!

- cd creator-app
- npm run android
- npm run ios
- npm run web

$ npm start
npm error code ENOENT — Could not read package.json (wrong folder)

Nice — your project is actually created successfully ✅

❌ What went wrong?

You ran npm start from the wrong folder.

✅ Fix:

cd creator-app
npm start

the code you gave me where video url is stored should we them in localstorage?

Good question — this is exactly the kind of thinking that separates average from strong candidates.

Short answer:

👉 Yes, storing in local storage is better than just keeping in state
👉 But in React Native, you DON'T use browser localStorage

🧠 Important Concept (Web vs Mobile)

In web:

localStorage.setItem(...)

In React Native:
👉 There is no localStorage

Instead, you use:

👉 AsyncStorage

🎯 Should YOU use it in this assignment?
Minimum requirement:
Just Context (in-memory) ✅ acceptable
Better (what I recommend):
Context + AsyncStorage ✅ production-level touch

👉 This shows:

"I understand persistence even without backend"

⚠️ Reality check

If you ONLY use Context:

Data disappears when app reloads ❌

If you use AsyncStorage:

Data stays even after restart ✅
🚀 Let's upgrade your app properly
✅ Step 1: Install AsyncStorage
npx expo install @react-native-async-storage/async-storage
✅ Step 2: Update Context
context/SubmissionContext.js

import { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const SubmissionContext = createContext();

export const SubmissionProvider = ({ children }) => {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    loadSubmissions();
  }, []);

  const loadSubmissions = async () => {
    try {
      const data = await AsyncStorage.getItem("submissions");
      if (data) {
        setSubmissions(JSON.parse(data));
      }
    } catch (error) {
      console.log("Error loading data", error);
    }
  };

  const saveSubmissions = async (newData) => {
    try {
      await AsyncStorage.setItem("submissions", JSON.stringify(newData));
    } catch (error) {
      console.log("Error saving data", error);
    }
  };

  const addSubmission = (campaign, url) => {
    const statuses = ["Pending", "Approved", "Rejected"];

    const newSubmission = {
      id: Date.now().toString(),
      brand: campaign.brand,
      url,
      status: statuses[Math.floor(Math.random() * 3)],
    };

    const updated = [newSubmission, ...submissions];

    setSubmissions(updated);
    saveSubmissions(updated);
  };

  return (
    <SubmissionContext.Provider value={{ submissions, addSubmission }}>
      {children}
    </SubmissionContext.Provider>
  );
};

how async storage works?

AsyncStorage is a simple key-value database inside your mobile app — like localStorage but for React Native.

AsyncStorage = {
  "submissions": "[{...}, {...}]",
  "user": "{name: 'Asad'}"
}

👉 Everything stored as strings. Must use JSON.stringify to save and JSON.parse to read.

Why "Async"?
Storage access takes time (disk operation) → returns a Promise.

Core functions:
await AsyncStorage.setItem("key", JSON.stringify(data));
const data = await AsyncStorage.getItem("key");
await AsyncStorage.removeItem("key");
await AsyncStorage.clear();

means it stores data in local device?

Yes — exactly ✅

AsyncStorage stores data on the user's local device.

Android → stored in app's internal storage
iOS → stored in app sandbox

✅ Persistent — stays even if app closes
❌ Not cloud — gone if user uninstalls app

In your project:
When user submits → video URL saved to their phone
Next time app opens → still visible

suggest already existing app that does the same work

Apps similar to what you're building:

1. Creator.co — closest match. Brands create campaigns, creators submit content, tracks approvals.
2. Upfluence — campaign dashboard, creator applications, approval workflows.
3. GRIN — influencer relationship management, content tracking.
4. Collabstr — marketplace for brands and creators, submission + payment flow.
5. Kitly — creator-focused, manage campaigns and deliverables.

Your app = simplified creator-side of an influencer marketing platform.
Real analogy: Your app = "Uber Driver App". Full platform = "Uber Backend + Rider + Driver + Payments".

what are problems faced by creators on this platforms?

Core problems creators face:

1. Unclear campaign briefs — don't know what to shoot
2. Slow/no feedback — status stays Pending for days, no rejection reason
3. Payment uncertainty — when will I get paid?
4. Too much competition — 1000+ creators per campaign
5. Rework cycles — brands ask for changes, no version tracking
6. No performance feedback — no analytics after posting
7. Bad UX in apps — confusing navigation, hard to track submissions

since my app is just a ui with no backend suggest what problems can be addressed in just creator ui screens?

Problems you CAN solve with just UI:

1. Unclear briefs → Structure the brief clearly with goals, requirements, avoid list
2. No reference clarity → Show example videos with labels
3. Fear before submission → Add pre-submit checklist
4. No feedback visibility → Show rejection reason in status card
5. Poor submission tracking → Show campaign name, date, URL in submission card
6. No sense of progress → Color-coded status (yellow/green/red)
7. Data lost on reload → AsyncStorage persistence
8. Bad mobile UX → Clean cards, spacing, clear CTAs

guide me how to create loom for this

Loom guide summary:

1. Start with UI — open app in Expo/browser first
2. Walk through screens in order: Campaign list → Detail → Submit → Submissions
3. Show Creative Plan feature as unique highlight
4. Switch to VS Code for code overview: App.js, Navigation, Screens, Context, Theme
5. Mention key decisions: mocked data, AsyncStorage, URL validation, route params
6. Say what you'd do differently: backend, real approvals, video previews, auth
7. Mention AI session logs in repo
8. Keep under 5 minutes

Final Loom Script:

INTRO (0:00-0:15):
"Hi, I'm Asad. This is my creator submission app built using Expo and React Native, focused on a clean submission flow."

UI WALKTHROUGH (0:15-1:30):
- Campaign List: "Creators can browse campaigns with brand, payout, and deadline."
- Campaign Detail: "Here they see a structured brief and example videos."
- Create Video Plan ⭐: "I added this feature — a lightweight creative assistant. It generates shot ideas, captions, platform tips, and hashtags from the campaign data. Right now it uses rule-based logic. In production, this could be replaced with an AI system."
- Submit: "Creators submit a video URL with basic validation."
- Submissions: "They can track status — pending, approved, or rejected — stored locally."

CODE OVERVIEW (1:30-3:00):
- App.js: sets up navigation and SubmissionProvider
- Stack navigator for screen flow
- Mocked campaigns with structured fields
- Modular screens for clean architecture
- Creative plan uses helper functions based on campaign data
- Context API + AsyncStorage for persistence

DECISIONS (3:00-4:00):
"Since there's no backend, I focused on improving creator experience through UI. I addressed unclear briefs and lack of guidance with structured data and the planning feature."

CLOSE (4:00-4:30):
"With more time, I'd add a backend, real approvals, video previews, and authentication. I've also included AI session logs in the repo. Thanks for reviewing."

dumb explain how creative plan works (if-else logic)

The Creative Plan feature is NOT AI — it is simple rule-based if-else logic.

Flow: Campaign Data → Helper Functions → Generated Plan → UI

1. getPrimaryPlatform() — checks deliverables text for "tiktok", "youtube", "instagram" using string includes
2. buildShotIdeas() — adds suggestions based on conditions:
   - if deliverables include "close-up" → add close-up shot idea
   - if goal includes "story" → add narrative structure idea
   - if platform === "tiktok" → add fast edits tip
3. buildCaptionSuggestion() — combines campaign.captionGuidance + campaign.hashtags
4. getPlatformText() — returns pre-written advice per platform

Output: Shot Ideas + Caption + Platform Advice + Hashtags

In Loom say: "Right now this is rule-based logic. In production, this could be replaced by an AI agent for dynamic, personalized creative plans."

how to record loom / setup questions

Key answers:
- Use Loom desktop app (not browser tab — stops when switching)
- Select "Entire Screen" not "Current Tab"
- Keep app (browser) + VS Code open side by side
- Use Loom script as bullet-point guide, not full sentences
- Practice once → record in one take
- Can't merge Loom videos natively — use Clipchamp if needed
- For web responsiveness: wrap app in 375px fixed container

Cheat sheet for recording:
Intro → List → Detail → Plan ⭐ → Submit → Status → Code → Decision → Close

how to share this conversation in github repo .md file?

Steps:
1. Create ai-logs/ folder in your repo
2. Create file: ai-logs/chatgpt-session.md
3. Format as structured insights (not raw chat dump)
4. Commit and push:

git add ai-logs/chatgpt-session.md
git commit -m "Added AI session logs"
git push