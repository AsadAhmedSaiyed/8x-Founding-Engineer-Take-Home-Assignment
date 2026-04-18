import { useContext } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import { SubmissionContext } from "../context/SubmissionContext";
import { SPACING, COLORS, TYPOGRAPHY, BORDER_RADIUS } from "../styles/theme";

export default function SubmissionsScreen({ navigation }) {
  const { submissions } = useContext(SubmissionContext);

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return { color: COLORS.success, emoji: "✅" };
      case "pending":
        return { color: COLORS.warning, emoji: "⏳" };
      case "rejected":
        return { color: COLORS.danger, emoji: "❌" };
      default:
        return { color: COLORS.textSecondary, emoji: "❓" };
    }
  };

  const handleViewVideo = (url) => {
    Linking.openURL(url).catch(() => {
      alert("Demo app - Click to view the actual video");
    });
  };

  const stats = {
    total: submissions.length,
    approved: submissions.filter((s) => s.status === "approved").length,
    pending: submissions.filter((s) => s.status === "pending").length,
    earnings: submissions
      .filter((s) => s.status === "approved")
      .reduce((sum, s) => sum + (s.campaign?.payout || 0), 0),
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Hero Header */}
      <View style={styles.heroHeader}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.heroTitle}>Your Portfolio</Text>
        <Text style={styles.heroSubtitle}>Track your submissions & earnings</Text>
      </View>

      {/* Stats Dashboard */}
      {submissions.length > 0 && (
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statCardEmoji}>📊</Text>
            <Text style={styles.statCardValue}>{stats.total}</Text>
            <Text style={styles.statCardLabel}>Total Submissions</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statCardEmoji}>✅</Text>
            <Text style={styles.statCardValue}>{stats.approved}</Text>
            <Text style={styles.statCardLabel}>Approved</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statCardEmoji}>💰</Text>
            <Text style={styles.statCardValue}>₹{stats.earnings.toLocaleString()}</Text>
            <Text style={styles.statCardLabel}>Earnings</Text>
          </View>
        </View>
      )}

      {/* Submissions List */}
      {submissions.length > 0 ? (
        <View style={styles.submissionsSection}>
          <Text style={styles.sectionTitle}>📹 Recent Submissions</Text>

          {submissions
            .slice()
            .reverse()
            .map((submission, index) => {
              const statusInfo = getStatusColor(submission.status);
              const campaign = submission.campaign;

              // Skip rendering if campaign data is missing
              if (!campaign) {
                return null;
              }

              return (
                <View key={index} style={styles.submissionCard}>
                  {/* Card Header */}
                  <View style={styles.cardHeader}>
                    <View style={styles.headerLeft}>
                      <Text style={styles.brandName}>{campaign.brand}</Text>
                      <Text style={styles.categoryName}>{campaign.category}</Text>
                    </View>
                    <View
                      style={[
                        styles.statusBadge,
                        { backgroundColor: statusInfo.color + "20" },
                      ]}
                    >
                      <Text style={styles.statusEmoji}>{statusInfo.emoji}</Text>
                      <Text style={[styles.statusText, { color: statusInfo.color }]}>
                        {submission.status.charAt(0).toUpperCase() +
                          submission.status.slice(1)}
                      </Text>
                    </View>
                  </View>

                  {/* Card Divider */}
                  <View style={styles.cardDivider} />

                  {/* Video URL */}
                  <TouchableOpacity
                    style={styles.videoSection}
                    onPress={() => handleViewVideo(submission.url)}
                    activeOpacity={0.7}
                  >
                    <View style={styles.videoIcon}>
                      <Text style={styles.videoIconText}>▶️</Text>
                    </View>
                    <View style={styles.videoInfo}>
                      <Text style={styles.videoLabel}>Your Video</Text>
                      <Text style={styles.videoUrl} numberOfLines={1}>
                        {submission.url}
                      </Text>
                    </View>
                    <Text style={styles.viewButton}>Tap to View →</Text>
                  </TouchableOpacity>

                  {/* Card Divider */}
                  <View style={styles.cardDivider} />

                  {/* Info Row */}
                  <View style={styles.infoRow}>
                    <View style={styles.infoItem}>
                      <Text style={styles.infoLabel}>Payout</Text>
                      <Text style={styles.infoPayout}>
                        ₹{campaign.payout.toLocaleString()}
                      </Text>
                    </View>

                    <View style={styles.infoDivider} />

                    <View style={styles.infoItem}>
                      <Text style={styles.infoLabel}>Submitted</Text>
                      <Text style={styles.infoValue}>{submission.date}</Text>
                    </View>

                    <View style={styles.infoDivider} />

                    <View style={styles.infoItem}>
                      <Text style={styles.infoLabel}>Campaign</Text>
                      <Text style={styles.infoValue}>{submission.id}</Text>
                    </View>
                  </View>

                  {/* Status Message */}
                  {submission.status === "approved" && (
                    <View style={[styles.statusMessage, { borderLeftColor: COLORS.success }]}>
                      <Text style={styles.statusMessageText}>
                        🎉 Congratulations! Your submission was approved. Payment will
                        be processed within 5-7 business days.
                      </Text>
                    </View>
                  )}

                  {submission.status === "pending" && (
                    <View style={[styles.statusMessage, { borderLeftColor: COLORS.warning }]}>
                      <Text style={styles.statusMessageText}>
                        ⏳ Your submission is under review. We'll get back to you within 48 hours.
                      </Text>
                    </View>
                  )}

                  {submission.status === "rejected" && (
                    <View style={[styles.statusMessage, { borderLeftColor: COLORS.danger }]}>
                      <Text style={styles.statusMessageText}>
                        We appreciate the effort! Check out more campaigns and try again.
                      </Text>
                    </View>
                  )}
                </View>
              );
            })}
        </View>
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>📹</Text>
          <Text style={styles.emptyTitle}>No submissions yet</Text>
          <Text style={styles.emptyText}>
            Start creating and submit your videos to campaigns to see them here!
          </Text>
          <TouchableOpacity
            style={styles.exploreButton}
            onPress={() => navigation.navigate("CampaignList")}
          >
            <Text style={styles.exploreButtonText}>✨ Explore Campaigns</Text>
          </TouchableOpacity>
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
  heroHeader: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.xl,
  },
  backButton: {
    marginBottom: SPACING.sm,
  },
  backButtonText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.cardBackground,
    fontWeight: "700",
  },
  heroTitle: {
    ...TYPOGRAPHY.display,
    color: COLORS.cardBackground,
    marginBottom: SPACING.sm,
  },
  heroSubtitle: {
    ...TYPOGRAPHY.body,
    color: COLORS.cardBackground,
    opacity: 0.95,
  },
  statsGrid: {
    flexDirection: "row",
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.lg,
    gap: SPACING.md,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    alignItems: "center",
    elevation: 2,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  statCardEmoji: {
    fontSize: 28,
    marginBottom: SPACING.sm,
  },
  statCardValue: {
    ...TYPOGRAPHY.title2,
    color: COLORS.primary,
    marginBottom: SPACING.xs,
  },
  statCardLabel: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    textAlign: "center",
  },
  submissionsSection: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.lg,
  },
  sectionTitle: {
    ...TYPOGRAPHY.title3,
    color: COLORS.text,
    marginBottom: SPACING.lg,
  },
  submissionCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.lg,
    elevation: 2,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    overflow: "hidden",
  },
  cardHeader: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerLeft: {
    flex: 1,
  },
  brandName: {
    ...TYPOGRAPHY.bodyStrong,
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  categoryName: {
    ...TYPOGRAPHY.small,
    color: COLORS.textSecondary,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.full,
    gap: SPACING.xs,
  },
  statusEmoji: {
    fontSize: 14,
  },
  statusText: {
    ...TYPOGRAPHY.caption,
    fontWeight: "600",
  },
  cardDivider: {
    height: 1,
    backgroundColor: COLORS.border,
  },
  videoSection: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    flexDirection: "row",
    alignItems: "center",
  },
  videoIcon: {
    width: 40,
    height: 40,
    borderRadius: BORDER_RADIUS.lg,
    backgroundColor: COLORS.background,
    justifyContent: "center",
    alignItems: "center",
    marginRight: SPACING.md,
  },
  videoIconText: {
    fontSize: 18,
  },
  videoInfo: {
    flex: 1,
  },
  videoLabel: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  videoUrl: {
    ...TYPOGRAPHY.small,
    color: COLORS.primary,
  },
  viewButton: {
    ...TYPOGRAPHY.caption,
    color: COLORS.primary,
    fontWeight: "600",
    marginLeft: SPACING.md,
  },
  infoRow: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
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
  infoValue: {
    ...TYPOGRAPHY.small,
    color: COLORS.text,
    fontWeight: "600",
  },
  infoDivider: {
    width: 1,
    height: 35,
    backgroundColor: COLORS.border,
    marginHorizontal: SPACING.sm,
  },
  statusMessage: {
    backgroundColor: COLORS.background,
    borderLeftWidth: 4,
    padding: SPACING.lg,
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
  },
  statusMessageText: {
    ...TYPOGRAPHY.body,
    color: COLORS.text,
    lineHeight: 22,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.xl,
    marginTop: SPACING.xl,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: SPACING.lg,
  },
  emptyTitle: {
    ...TYPOGRAPHY.title3,
    color: COLORS.text,
    marginBottom: SPACING.md,
    textAlign: "center",
  },
  emptyText: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
    textAlign: "center",
    marginBottom: SPACING.lg,
    lineHeight: 24,
  },
  exploreButton: {
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.lg,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.lg,
    elevation: 3,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
  },
  exploreButtonText: {
    ...TYPOGRAPHY.bodyBold,
    color: COLORS.cardBackground,
  },
  bottomPadding: {
    height: SPACING.lg,
  },
});