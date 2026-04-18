import { View, Text, StyleSheet, TouchableOpacity, Linking } from "react-native";
import { COLORS, SPACING, BORDER_RADIUS, TYPOGRAPHY } from "../styles/theme";

export default function CampaignCard({ campaign }) {
  const getPlatformEmoji = (platform) => {
    switch (platform) {
      case "instagram":
        return "📷";
      case "tiktok":
        return "🎵";
      case "youtube":
        return "🎬";
      default:
        return "📹";
    }
  };

  const platformsList = (campaign.examples || [])
    .map((ex) => ex.platform)
    .filter((v, i, a) => a.indexOf(v) === i);

  return (
    <View style={[styles.card, { borderLeftColor: campaign.color || COLORS.primary }]}>
      {/* Top Row: Brand & Category */}
      <View style={styles.topRow}>
        <View style={styles.brandSection}>
          <Text style={styles.brand}>{campaign.brand}</Text>
          <Text style={styles.category}>{campaign.category}</Text>
        </View>
        <View style={[styles.viewsBadge, { backgroundColor: campaign.color || COLORS.primary }]}>
          <Text style={styles.viewsText}>👁️ {campaign.views}</Text>
        </View>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Middle Row: Key Info */}
      <View style={styles.infoRow}>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Payout</Text>
          <Text style={styles.infoPayout}>₹{campaign.payout.toLocaleString()}</Text>
        </View>

        <View style={styles.verticalDivider} />

        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Deadline</Text>
          <Text style={styles.infoDeadline}>{campaign.deadline}</Text>
        </View>

        <View style={styles.verticalDivider} />

        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Platforms</Text>
          <View style={styles.platformRow}>
            {platformsList.map((platform) => (
              <Text key={platform} style={styles.platformIcon}>
                {getPlatformEmoji(platform)}
              </Text>
            ))}
          </View>
        </View>
      </View>

      {/* Bottom: Tips Preview */}
      {campaign.tips && Array.isArray(campaign.tips) && campaign.tips.length > 0 && (
        <>
          <View style={styles.divider} />
          <View style={styles.tipsSection}>
            <Text style={styles.tipsLabel}>💡 Creator Tips</Text>
            <Text style={styles.tipsText} numberOfLines={1}>
              {campaign.tips[0]}
            </Text>
          </View>
        </>
      )}

      {/* Sample Videos */}
      {campaign.examples && Array.isArray(campaign.examples) && campaign.examples.length > 0 && (
        <>
          <View style={styles.divider} />
          <View style={styles.sampleVideosSection}>
            <Text style={styles.sampleVideosLabel}>🎬 Sample Videos</Text>
            {campaign.examples.slice(0, 2).map((example, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => Linking.openURL(example.url)}
                style={styles.sampleVideoLink}
              >
                <Text style={styles.sampleVideoText} numberOfLines={1}>
                  {example.url}
                </Text>
              </TouchableOpacity>
            ))}
            {campaign.examples.length > 2 && (
              <Text style={styles.moreVideosText}>+{campaign.examples.length - 2} more</Text>
            )}
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.cardBackground,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    marginBottom: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    borderLeftWidth: 4,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: COLORS.border,
    borderRightColor: COLORS.border,
    borderBottomColor: COLORS.border,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SPACING.sm,
  },
  brandSection: {
    flex: 1,
  },
  brand: {
    ...TYPOGRAPHY.bodyBold,
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  category: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
  },
  viewsBadge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: BORDER_RADIUS.full,
    marginLeft: SPACING.sm,
  },
  viewsText: {
    ...TYPOGRAPHY.captionSmall,
    color: COLORS.cardBackground,
    fontWeight: "600",
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SPACING.sm,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  infoItem: {
    flex: 1,
    alignItems: "center",
  },
  infoLabel: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  infoPayout: {
    ...TYPOGRAPHY.bodyStrong,
    color: COLORS.accent,
  },
  infoDeadline: {
    ...TYPOGRAPHY.small,
    color: COLORS.text,
  },
  verticalDivider: {
    width: 1,
    height: 35,
    backgroundColor: COLORS.border,
    marginHorizontal: SPACING.sm,
  },
  platformRow: {
    flexDirection: "row",
    gap: SPACING.xs,
  },
  platformIcon: {
    fontSize: 14,
  },
  tipsSection: {
    backgroundColor: COLORS.background,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.sm,
  },
  tipsLabel: {
    ...TYPOGRAPHY.captionSmall,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  tipsText: {
    ...TYPOGRAPHY.small,
    color: COLORS.primary,
  },
  sampleVideosSection: {
    backgroundColor: COLORS.background,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.sm,
  },
  sampleVideosLabel: {
    ...TYPOGRAPHY.captionSmall,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  sampleVideoLink: {
    marginBottom: SPACING.xs,
  },
  sampleVideoText: {
    ...TYPOGRAPHY.small,
    color: COLORS.primary,
    textDecorationLine: 'underline',
  },
  moreVideosText: {
    ...TYPOGRAPHY.captionSmall,
    color: COLORS.textSecondary,
    fontStyle: 'italic',
  },
});