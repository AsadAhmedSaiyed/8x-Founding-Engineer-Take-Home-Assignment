import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { SPACING, COLORS, TYPOGRAPHY, BORDER_RADIUS } from "../styles/theme";

const platformAdvice = {
  instagram: "Keep captions short, use trendy transitions, and make the first 3 seconds feel premium.",
  tiktok: "Move fast, sync with sound, and keep the energy high for the algorithm.",
  youtube: "Make the story clear in the first cut and add a strong hook for Shorts viewers.",
  default: "Keep the flow natural, show the product clearly, and end with a strong brand moment.",
};

const getPrimaryPlatform = (campaign) => {
  const deliverables = campaign.deliverables || [];
  const text = deliverables.join(" ").toLowerCase();
  if (text.includes("tiktok")) return "tiktok";
  if (text.includes("youtube")) return "youtube";
  if (text.includes("instagram")) return "instagram";
  if (campaign.examples?.[0]?.platform) return campaign.examples[0].platform;
  return "instagram";
};

const buildShotIdeas = (campaign, platform) => {
  const shots = [];
  const goal = (campaign.campaignGoal || "").toLowerCase();
  const access = (campaign.access || "").toLowerCase();
  const deliverables = (campaign.deliverables || []).map((item) => (item || "").toLowerCase());

  if (deliverables.some((item) => item.includes("product close-up") || item.includes("close-up"))) {
    shots.push("Start with a product close-up to establish the brand instantly.");
  }

  if (goal.includes("story") || goal.includes("routine") || goal.includes("process")) {
    shots.push("Show the idea as a short story with a beginning, middle, and ending.");
  }

  if (access.includes("your own") || access.includes("personal")) {
    shots.push("Keep the content authentic and show the brand in your real life.");
  }

  if (platform === "tiktok") {
    shots.push("Use fast edits and a strong hook in the first 2 seconds.");
  } else if (platform === "youtube") {
    shots.push("Add a clear visual hook so viewers stay through the first few seconds.");
  } else if (platform === "instagram") {
    shots.push("Focus on polished visuals and a catchy caption.");
  }

  if (!shots.length) {
    shots.push("Open with a strong visual moment, then show what makes the product special.");
  }

  return shots;
};

const buildCaptionSuggestion = (campaign) => {
  const guidance = campaign.captionGuidance || "Share why this moment feels real and useful.";
  const hashtags = (campaign.hashtags || []).slice(0, 4).join(" ");
  return `${guidance}${hashtags ? ` ${hashtags}` : ""}`;
};

const getPlatformText = (platform) => platformAdvice[platform] || platformAdvice.default;

export default function CreativePlanScreen({ route, navigation }) {
  const { campaign } = route.params;
  const platform = getPrimaryPlatform(campaign);
  const shotIdeas = buildShotIdeas(campaign, platform);
  const captionIdea = buildCaptionSuggestion(campaign);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={[styles.hero, { backgroundColor: campaign.color || COLORS.primary }]}> 
        <Text style={styles.heroTitle}>Creative Video Plan</Text>
        <Text style={styles.heroSubtitle}>{campaign.brand} • {platform.charAt(0).toUpperCase() + platform.slice(1)}</Text>
      </View>

      <View style={[styles.section, { marginTop: SPACING.xxl }]}>
        <Text style={styles.sectionTitle}>🎬 What to film</Text>
        <View style={styles.planCard}>
          {shotIdeas.map((idea, index) => (
            <View key={index} style={styles.planItem}>
              <Text style={styles.planBullet}>•</Text>
              <Text style={styles.planText}>{idea}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>✍️ Caption idea</Text>
        <View style={styles.planCard}>
          <Text style={styles.planText}>{captionIdea}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🚀 Platform advice</Text>
        <View style={styles.planCard}>
          <Text style={styles.planText}>{getPlatformText(platform)}</Text>
        </View>
      </View>

      {campaign.hashtags && campaign.hashtags.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>#Hashtag suggestions</Text>
          <View style={styles.hashtagRow}>
            {campaign.hashtags.map((tag, index) => (
              <View key={index} style={styles.hashtagChip}>
                <Text style={styles.hashtagText}>{tag}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      <View style={styles.bottomPadding} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  hero: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.xxxl,
    minHeight: 220,
  },
  heroTitle: {
    ...TYPOGRAPHY.display,
    color: COLORS.cardBackground,
    marginBottom: SPACING.sm,
  },
  heroSubtitle: {
    ...TYPOGRAPHY.body,
    color: COLORS.cardBackground,
    opacity: 0.9,
    maxWidth: "80%",
  },
  section: {
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    ...TYPOGRAPHY.title3,
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  planCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    elevation: 2,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
  },
  planItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: SPACING.sm,
  },
  planBullet: {
    ...TYPOGRAPHY.title3,
    color: COLORS.primary,
    marginRight: SPACING.sm,
    lineHeight: 24,
  },
  planText: {
    ...TYPOGRAPHY.body,
    color: COLORS.text,
    flex: 1,
    lineHeight: 24,
  },
  hashtagRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: SPACING.sm,
  },
  hashtagChip: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.full,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    marginRight: SPACING.sm,
    marginBottom: SPACING.sm,
  },
  hashtagText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
  },
  bottomPadding: {
    height: SPACING.xl,
  },
});
