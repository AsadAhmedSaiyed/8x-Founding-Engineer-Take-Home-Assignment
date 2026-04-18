import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from "react-native";
import { SPACING, COLORS, TYPOGRAPHY, BORDER_RADIUS } from "../styles/theme";

export default function CampaignDetailScreen({ route, navigation }) {
  const { campaign } = route.params;

  const handleOpenExample = (url) => {
    Linking.openURL(url).catch(() => {
      alert("Demo app - Click to view the actual video on " + url.split("/")[2]);
    });
  };

  const handleSubmit = () => {
    navigation.navigate("Submit", { campaign });
  };

  const handleCreativePlan = () => {
    navigation.navigate("CreativePlan", { campaign });
  };

  const getPlatformInfo = (platform) => {
    const platformMap = {
      instagram: { emoji: "📷", name: "Instagram Reel", color: COLORS.instagram },
      tiktok: { emoji: "🎵", name: "TikTok Video", color: COLORS.tiktok },
      youtube: { emoji: "🎬", name: "YouTube Shorts", color: COLORS.youtube },
    };
    return platformMap[platform] || { emoji: "📹", name: "Video", color: COLORS.primary };
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Hero Header */}
      <View style={[styles.heroHeader, { backgroundColor: campaign.color || COLORS.primary }]}>
        <View style={styles.heroHeaderTop}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
          <View style={styles.headerTextGroup}>
            <Text style={styles.brandName}>{campaign.brand}</Text>
            <Text style={styles.categoryText}>{campaign.category}</Text>
          </View>
          <Text style={styles.viewsOverlay}>👁️ {campaign.views}</Text>
        </View>
      </View>

      {/* Campaign Summary */}
      <View style={styles.campaignMetaCard}>
        <View style={styles.metaRow}>
          <Text style={styles.metaLabel}>Launch</Text>
          <Text style={styles.metaValue}>{campaign.launchDate || campaign.deadline}</Text>
        </View>
        <View style={styles.metaRow}>
          <Text style={styles.metaLabel}>Compensation</Text>
          <Text style={styles.metaValue}>{campaign.payoutRange || `₹${campaign.payout}`}</Text>
        </View>
        <Text style={styles.metaNote}>{campaign.feeNote || "A small platform fee may be deducted."}</Text>
        <Text style={styles.metaAccess}>Access: {campaign.access || "Content should feel natural and easy to create."}</Text>
      </View>

      {/* Quick Stats Card */}
      <View style={styles.statsCard}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Payout</Text>
          <Text style={styles.statValue}>₹{campaign.payout.toLocaleString()}</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Deadline</Text>
          <Text style={styles.statValue}>{campaign.deadline}</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Status</Text>
          <Text style={styles.statusBadge}>{campaign.status}</Text>
        </View>
      </View>

      {/* Brief Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📋 The Brief</Text>
        <View style={styles.briefCard}>
          <Text style={styles.briefText}>{campaign.brief}</Text>
          {campaign.examples && Array.isArray(campaign.examples) && campaign.examples.length > 0 && (
            <View style={styles.sampleVideosSection}>
              <Text style={styles.sampleVideosTitle}>Sample Videos:</Text>
              {campaign.examples.map((example, index) => (
                <TouchableOpacity key={index} onPress={() => handleOpenExample(example.url)} style={styles.sampleVideoLink}>
                  <Text style={styles.sampleVideoText}>{example.url}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </View>

      {/* Content Direction */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🎯 Content Direction</Text>
        <View style={styles.directionCard}>
          <Text style={styles.directionText}>{campaign.campaignGoal || "Use real-life storytelling and authentic product placement to engage viewers."}</Text>

          {campaign.suggestedHooks && Array.isArray(campaign.suggestedHooks) && (
            <View style={styles.directionGroup}>
              <Text style={styles.directionLabel}>Suggested hooks</Text>
              {campaign.suggestedHooks.map((hook, index) => (
                <Text key={index} style={styles.directionBullet}>• {hook}</Text>
              ))}
            </View>
          )}

          {campaign.captionGuidance && (
            <View style={styles.directionGroup}>
              <Text style={styles.directionLabel}>Caption guidance</Text>
              <Text style={styles.directionText}>{campaign.captionGuidance}</Text>
            </View>
          )}

          {campaign.hashtags && Array.isArray(campaign.hashtags) && (
            <View style={styles.hashtagRow}>
              {campaign.hashtags.map((tag, index) => (
                <View key={index} style={styles.hashtagChip}>
                  <Text style={styles.hashtagText}>{tag}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </View>

      {/* Creator Tips */}
        {campaign.tips && Array.isArray(campaign.tips) && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>💡 Creator Tips for Success</Text>
          <View style={styles.tipsCard}>
            {campaign.tips.map((tip, index) => (
              <View key={index} style={styles.tipItem}>
                <Text style={styles.tipBullet}>✓</Text>
                <Text style={styles.tipText}>{tip}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Examples Section */}
      {campaign.examples && Array.isArray(campaign.examples) && campaign.examples.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            🎥 Example Videos ({campaign.examples.length})
          </Text>
          <Text style={styles.examplesSubtitle}>
            Get inspired by these examples from creators
          </Text>

          {campaign.examples.map((example, index) => {
            const platformInfo = getPlatformInfo(example.platform);
            return (
              <TouchableOpacity
                key={index}
                style={styles.exampleCard}
                onPress={() => handleOpenExample(example.url)}
                activeOpacity={0.8}
              >
                <View style={styles.exampleHeader}>
                  <View style={styles.examplePlatform}>
                    <Text style={styles.platformEmoji}>{platformInfo.emoji}</Text>
                    <Text style={styles.platformName}>{platformInfo.name}</Text>
                  </View>
                  <Text style={styles.tapText}>Tap to view →</Text>
                </View>
                <Text style={styles.exampleUrl} numberOfLines={1}>
                  {example.url}
                </Text>
                <View style={styles.exampleFooter}>
                  <Text style={styles.qualityBadge}>High-quality example</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      )}

      {/* Platform Requirements */}
      {campaign.examples && Array.isArray(campaign.examples) && campaign.examples.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📱 Accepted Platforms</Text>
          <View style={styles.platformsGrid}>
            {campaign.examples.map((example, index) => {
              const platformInfo = getPlatformInfo(example.platform);
              return (
                <View key={index} style={styles.platformBadge}>
                  <Text style={styles.platformBadgeEmoji}>{platformInfo.emoji}</Text>
                  <Text style={styles.platformBadgeText}>{platformInfo.name}</Text>
                </View>
              );
            })}
          </View>
        </View>
      )}

      {/* Creative Plan Button */}
      <TouchableOpacity
        style={[styles.planButton, { backgroundColor: COLORS.accent }]}
        onPress={handleCreativePlan}
        activeOpacity={0.85}
      >
        <Text style={styles.planButtonText}>🧠 Create Video Plan</Text>
      </TouchableOpacity>

      {/* Submit Button */}
      <TouchableOpacity
        style={[styles.submitButton, { backgroundColor: campaign.color || COLORS.primary }]}
        onPress={handleSubmit}
        activeOpacity={0.85}
      >
        <Text style={styles.submitButtonText}>✨ Submit Your Video</Text>
      </TouchableOpacity>

      <View style={styles.bottomPadding} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  heroHeader: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.xxxl,
    position: "relative",
    minHeight: 220,
  },
  heroHeaderTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SPACING.lg,
  },
  backButton: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.full,
    elevation: 2,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  backButtonText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.primary,
    fontWeight: "700",
  },
  headerTextGroup: {
    flex: 1,
    marginLeft: SPACING.md,
    maxWidth: "75%",
  },
  headerContent: {
    paddingRight: SPACING.xxxl,
    flex: 1,
    maxWidth: "70%",
  },
  brandName: {
    ...TYPOGRAPHY.display,
    color: COLORS.cardBackground,
    marginBottom: SPACING.sm,
    flexShrink: 1,
  },
  categoryText: {
    ...TYPOGRAPHY.body,
    color: COLORS.cardBackground,
    opacity: 0.95,
    flexShrink: 1,
  },
  statsOverlay: {
    position: "absolute",
    bottom: SPACING.lg,
    right: SPACING.lg,
    backgroundColor: COLORS.cardBackground,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.full,
  },
  viewsOverlay: {
    ...TYPOGRAPHY.smallStrong,
    color: COLORS.text,
  },
  statsCard: {
    marginHorizontal: SPACING.md,
    marginTop: -SPACING.md,
    marginBottom: SPACING.lg,
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    flexDirection: "row",
    justifyContent: "space-around",
    elevation: 3,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statLabel: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    marginBottom: SPACING.sm,
  },
  statValue: {
    ...TYPOGRAPHY.title3,
    color: COLORS.primary,
  },
  statusBadge: {
    ...TYPOGRAPHY.small,
    color: COLORS.success,
    backgroundColor: COLORS.successLight,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.full,
    overflow: "hidden",
  },
  statDivider: {
    width: 1,
    height: 50,
    backgroundColor: COLORS.border,
    marginHorizontal: SPACING.md,
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
  examplesSubtitle: {
    ...TYPOGRAPHY.small,
    color: COLORS.textSecondary,
    marginBottom: SPACING.md,
  },
  briefCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.accent,
    elevation: 2,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  briefText: {
    ...TYPOGRAPHY.body,
    color: COLORS.text,
    lineHeight: 26,
  },
  sampleVideosSection: {
    marginTop: SPACING.lg,
    paddingTop: SPACING.lg,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  sampleVideosTitle: {
    ...TYPOGRAPHY.bodyStrong,
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  sampleVideoLink: {
    marginBottom: SPACING.sm,
  },
  sampleVideoText: {
    ...TYPOGRAPHY.body,
    color: COLORS.primary,
    textDecorationLine: 'underline',
  },
  tipsCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.warning,
    elevation: 2,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  campaignMetaCard: {
    marginHorizontal: SPACING.md,
    marginTop: -SPACING.sm,
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
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: SPACING.sm,
  },
  metaLabel: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
  },
  metaValue: {
    ...TYPOGRAPHY.bodyStrong,
    color: COLORS.text,
  },
  metaNote: {
    ...TYPOGRAPHY.small,
    color: COLORS.textSecondary,
    marginTop: SPACING.sm,
    lineHeight: 20,
  },
  metaAccess: {
    ...TYPOGRAPHY.small,
    color: COLORS.text,
    marginTop: SPACING.xs,
  },
  directionCard: {
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
  directionText: {
    ...TYPOGRAPHY.body,
    color: COLORS.text,
    lineHeight: 24,
  },
  directionGroup: {
    marginTop: SPACING.md,
  },
  directionLabel: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  directionBullet: {
    ...TYPOGRAPHY.body,
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  hashtagRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: SPACING.md,
  },
  hashtagChip: {
    backgroundColor: COLORS.surface,
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
  tipItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.md,
  },
  tipBullet: {
    ...TYPOGRAPHY.bodyBold,
    color: COLORS.success,
    marginRight: SPACING.md,
    fontSize: 18,
  },
  tipText: {
    ...TYPOGRAPHY.body,
    color: COLORS.text,
    flex: 1,
  },
  exampleCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    elevation: 2,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  exampleHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SPACING.md,
  },
  examplePlatform: {
    flexDirection: "row",
    alignItems: "center",
  },
  platformEmoji: {
    fontSize: 20,
    marginRight: SPACING.sm,
  },
  platformName: {
    ...TYPOGRAPHY.bodyStrong,
    color: COLORS.text,
  },
  tapText: {
    ...TYPOGRAPHY.small,
    color: COLORS.primary,
    fontWeight: "600",
  },
  exampleUrl: {
    ...TYPOGRAPHY.small,
    color: COLORS.textSecondary,
    marginBottom: SPACING.md,
  },
  exampleFooter: {
    paddingTop: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  qualityBadge: {
    ...TYPOGRAPHY.caption,
    color: COLORS.success,
    fontWeight: "600",
  },
  platformsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: SPACING.md,
  },
  platformBadge: {
    flex: 1,
    minWidth: "45%",
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    alignItems: "center",
    elevation: 2,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  platformBadgeEmoji: {
    fontSize: 28,
    marginBottom: SPACING.sm,
  },
  platformBadgeText: {
    ...TYPOGRAPHY.small,
    color: COLORS.text,
    textAlign: "center",
    fontWeight: "600",
  },
  planButton: {
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
    paddingVertical: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    alignItems: "center",
    elevation: 3,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
  },
  submitButton: {
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
    paddingVertical: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    alignItems: "center",
    elevation: 4,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
  submitButtonText: {
    ...TYPOGRAPHY.bodyBold,
    color: COLORS.cardBackground,
    fontSize: 17,
  },
  bottomPadding: {
    height: SPACING.xl,
  },
});