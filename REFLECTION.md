# Creator App — Reflection

## What I Built
- React Native + Expo mobile app, built fully from scratch
- 4 screens: Campaign List, Campaign Detail, Video Submission, Submission History
- Local data persistence with AsyncStorage
- Production-ready UI with a centralized design system

## Background
- I am a full-stack web developer with no prior React Native or Expo experience
- Learned React Native and Expo on the go while building this app
- Transferred web knowledge (React, JS, component patterns) and adapted to mobile constraints

## Unique Feature — Creative Plan Generator
- Built a lightweight, rule-based creative assistant (`CreativePlanScreen`)
- Reads campaign metadata: platform, goal, deliverables, access type
- Generates shot ideas, caption suggestions, platform advice, and hashtag chips
- Example: TikTok campaign → "fast edits, strong hook in first 2 seconds"
- Example: YouTube campaign → "clear visual hook for Shorts retention"
- Fully rule-based now, but designed to swap in an AI call (Claude, GPT) in production
- Adds real creator value — not just CRUD

## What Was Easy
- React concepts (components, state, context) transferred directly from web experience
- Built a design system early (colors, typography, spacing tokens) — kept all 4 screens consistent
- AsyncStorage persistence was straightforward given the flat data model

## What Was Hard
- React Native has no browser — no CSS, no DOM, no hover states; had to rethink everything
- Layout works differently: no cascading styles, Flexbox behaves differently than on web
- FlatList spacing, safe areas, and TouchableOpacity feedback all needed learning from scratch
- Navigation setup (Native Stack) was new — took time to understand screen options and headers
- Learned all of this while building, not before

## Process
1. Spent time reading React Native and Expo docs to get familiar
2. Set up project structure and navigation from scratch
3. Built the design system first for consistency
4. Built all 4 screens one by one
5. Added the Creative Plan feature
6. Polished empty states and error handling

## Time Taken
- ~3.5 hours total (including learning React Native concepts on the fly)