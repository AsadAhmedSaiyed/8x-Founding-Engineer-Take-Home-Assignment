import { useState, useContext } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";
import { SubmissionContext } from "../context/SubmissionContext";
import { SPACING, COLORS, TYPOGRAPHY, BORDER_RADIUS } from "../styles/theme";

export default function SubmitScreen({ route, navigation }) {
  const { campaign } = route.params;
  const { addSubmission } = useContext(SubmissionContext);

  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const isValidURL = (str) => {
    try {
      const urlObj = new URL(str);
      return (
        urlObj.hostname.includes("instagram.com") ||
        urlObj.hostname.includes("tiktok.com") ||
        urlObj.hostname.includes("youtube.com")
      );
    } catch {
      return false;
    }
  };

  const getPlatformFromURL = (urlString) => {
    if (urlString.includes("instagram")) return "Instagram Reel";
    if (urlString.includes("tiktok")) return "TikTok Video";
    if (urlString.includes("youtube")) return "YouTube Shorts";
    return "Video";
  };

  const handleSubmit = () => {
    if (!url.trim()) {
      Alert.alert("Missing URL", "Please paste your video URL to continue");
      return;
    }

    if (!isValidURL(url.trim())) {
      Alert.alert(
        "Invalid URL",
        "Please provide a valid Instagram Reel, TikTok, or YouTube Shorts URL"
      );
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      addSubmission(campaign, url.trim());
      setIsLoading(false);
      setSubmitted(true);
      Alert.alert(
        "🎉 Submission Received!",
        "Great work! Your work is submitted. Choose where to go next.",
        [
          {
            text: "Your Work",
            onPress: () => navigation.navigate("Submissions"),
          },
          {
            text: "Home",
            onPress: () => navigation.popToTop(),
          },
        ],
        { cancelable: false }
      );
    }, 800);
  };

  const platformPreview = getPlatformFromURL(url);
  const isValidating = url.trim() && isValidURL(url.trim());

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Campaign Context */}
      <View style={[styles.campaignInfo, { borderLeftColor: campaign.color || COLORS.primary }]}>
        <Text style={styles.campaignBrand}>{campaign.brand}</Text>
        <Text style={styles.campaignCategory}>{campaign.category}</Text>
        <Text style={styles.campaignBrief} numberOfLines={2}>
          {campaign.brief}
        </Text>
        {campaign.deadline && (
          <Text style={styles.campaignDeadline}>📅 Deadline: {campaign.deadline}</Text>
        )}
      </View>

      {/* Form Section */}
      <View style={styles.formSection}>
        <View style={styles.formHeader}>
          <Text style={styles.formTitle}>Submit Your Video</Text>
          <Text style={styles.formSubtitle}>
            Share your creative work with the {campaign.brand} team
          </Text>
        </View>

        {/* Accepted Platforms */}
        <View style={styles.platformsSection}>
          <Text style={styles.platformsLabel}>📱 Accepted Platforms</Text>
          <View style={styles.platformsListAccepted}>
            {campaign.examples && Array.isArray(campaign.examples) && campaign.examples.map((ex, idx) => (
              <View key={idx} style={styles.platformChip}>
                <Text style={styles.platformChipEmoji}>
                  {ex.platform === "instagram" && "📷"}
                  {ex.platform === "tiktok" && "🎵"}
                  {ex.platform === "youtube" && "🎬"}
                </Text>
                <Text style={styles.platformChipText}>
                  {ex.platform === "instagram" && "Instagram"}
                  {ex.platform === "tiktok" && "TikTok"}
                  {ex.platform === "youtube" && "YouTube Shorts"}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* URL Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Paste Your Video URL</Text>
          <TextInput
            placeholder="https://www.instagram.com/reel/... or https://www.tiktok.com/... or https://www.youtube.com/shorts/..."
            placeholderTextColor={COLORS.textTertiary}
            value={url}
            onChangeText={setUrl}
            editable={!isLoading}
            style={[
              styles.input,
              isValidating && styles.inputValid,
              !isValidating && url && styles.inputError,
            ]}
          />
          <Text style={styles.hint}>
            Copy-paste the full URL of your video from the platform
          </Text>
        </View>

        {/* Platform Detection */}
        {url.trim() && (
          <View style={[styles.platformDetection, isValidating && styles.platformDetectionValid]}>
            {isValidating ? (
              <>
                <Text style={styles.platformDetectionIcon}>✓</Text>
                <View style={styles.platformDetectionText}>
                  <Text style={styles.platformDetectionLabel}>Perfect!</Text>
                  <Text style={styles.platformDetectionValue}>{platformPreview}</Text>
                </View>
              </>
            ) : (
              <>
                <Text style={styles.platformDetectionIcon}>⚠️</Text>
                <View style={styles.platformDetectionText}>
                  <Text style={styles.platformDetectionLabel}>Check the URL</Text>
                  <Text style={styles.platformDetectionValue}>
                    Must be Instagram, TikTok, or YouTube Shorts
                  </Text>
                </View>
              </>
            )}
          </View>
        )}

        {/* Creator Tips */}
        {campaign.tips && Array.isArray(campaign.tips) && campaign.tips.length > 0 && (
        <View style={styles.tipsBox}>
          <Text style={styles.tipsTitle}>💡 Tips for High-Quality Submissions</Text>
          <View style={styles.tipsContent}>
            {campaign.tips.map((tip, idx) => (
              <View key={idx} style={styles.tipLine}>
                <Text style={styles.tipIcon}>▸</Text>
                <Text style={styles.tipContent}>{tip}</Text>
              </View>
            ))}
          </View>
        </View>
        )}

        {/* Submit Button */}
        <TouchableOpacity
          style={[
            styles.submitButton,
            (isLoading || submitted) && styles.submitButtonDisabled,
            { backgroundColor: campaign.color || COLORS.primary },
          ]}
          onPress={handleSubmit}
          disabled={isLoading || submitted}
          activeOpacity={0.85}
        >
          <Text style={styles.submitButtonText}>
            {isLoading
              ? "Submitting..."
              : submitted
              ? "Submitted"
              : "✨ Submit My Video"}
          </Text>
        </TouchableOpacity>

        {/* Additional Info */}
        <View style={styles.infoBox}>
          <Text style={styles.infoIcon}>ℹ️</Text>
          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>Before You Submit</Text>
            <Text style={styles.infoText}>
              ✓ Make sure your video is public or accessible{"\n"}
              ✓ Video should meet the campaign brief{"\n"}
              ✓ We review submissions within 48 hours{"\n"}✓ Payment on approval
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.bottomPadding} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  campaignInfo: {
    backgroundColor: COLORS.cardBackground,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.lg,
    borderLeftWidth: 4,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: COLORS.border,
    borderRightColor: COLORS.border,
    borderBottomColor: COLORS.border,
    marginBottom: SPACING.lg,
  },
  campaignBrand: {
    ...TYPOGRAPHY.title2,
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  campaignCategory: {
    ...TYPOGRAPHY.small,
    color: COLORS.textSecondary,
    marginBottom: SPACING.sm,
  },
  campaignBrief: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
    lineHeight: 22,
    marginBottom: SPACING.sm,
  },
  campaignDeadline: {
    ...TYPOGRAPHY.small,
    color: COLORS.primary,
    fontWeight: "600",
    marginTop: SPACING.sm,
  },
  formSection: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xl,
  },
  formHeader: {
    marginBottom: SPACING.xl,
  },
  formTitle: {
    ...TYPOGRAPHY.title3,
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  formSubtitle: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
  },
  platformsSection: {
    marginBottom: SPACING.lg,
  },
  platformsLabel: {
    ...TYPOGRAPHY.bodyStrong,
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  platformsListAccepted: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: SPACING.md,
  },
  platformChip: {
    backgroundColor: COLORS.cardBackground,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.full,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  platformChipEmoji: {
    fontSize: 16,
    marginRight: SPACING.sm,
  },
  platformChipText: {
    ...TYPOGRAPHY.small,
    color: COLORS.text,
    fontWeight: "600",
  },
  inputGroup: {
    marginBottom: SPACING.lg,
  },
  label: {
    ...TYPOGRAPHY.bodyStrong,
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: BORDER_RADIUS.lg,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    fontSize: 14,
    color: COLORS.text,
    backgroundColor: COLORS.cardBackground,
    minHeight: 80,
    textAlignVertical: "top",
    marginBottom: SPACING.md,
  },
  inputValid: {
    borderColor: COLORS.success,
    borderWidth: 2,
  },
  inputError: {
    borderColor: COLORS.danger,
    borderWidth: 1,
  },
  hint: {
    ...TYPOGRAPHY.small,
    color: COLORS.textTertiary,
  },
  platformDetection: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.lg,
    flexDirection: "row",
    alignItems: "center",
    borderLeftWidth: 4,
    borderLeftColor: COLORS.danger,
  },
  platformDetectionValid: {
    borderLeftColor: COLORS.success,
  },
  platformDetectionIcon: {
    fontSize: 24,
    marginRight: SPACING.md,
  },
  platformDetectionText: {
    flex: 1,
  },
  platformDetectionLabel: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  platformDetectionValue: {
    ...TYPOGRAPHY.bodyStrong,
    color: COLORS.text,
  },
  tipsBox: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.warning,
  },
  tipsTitle: {
    ...TYPOGRAPHY.bodyStrong,
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  tipsContent: {
    gap: SPACING.sm,
  },
  tipLine: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  tipIcon: {
    ...TYPOGRAPHY.body,
    color: COLORS.warning,
    marginRight: SPACING.sm,
    marginTop: 2,
  },
  tipContent: {
    ...TYPOGRAPHY.small,
    color: COLORS.text,
    flex: 1,
    lineHeight: 20,
  },
  submitButton: {
    borderRadius: BORDER_RADIUS.lg,
    paddingVertical: SPACING.lg,
    alignItems: "center",
    marginBottom: SPACING.lg,
    elevation: 4,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
  submitButtonDisabled: {
    opacity: 0.7,
  },
  submitButtonText: {
    ...TYPOGRAPHY.bodyBold,
    color: COLORS.cardBackground,
    fontSize: 16,
  },
  infoBox: {
    backgroundColor: COLORS.warningLight,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.warning,
    flexDirection: "row",
  },
  infoIcon: {
    fontSize: 20,
    marginRight: SPACING.md,
    marginTop: 2,
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    ...TYPOGRAPHY.bodyStrong,
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  infoText: {
    ...TYPOGRAPHY.small,
    color: COLORS.text,
    lineHeight: 20,
  },
  bottomPadding: {
    height: SPACING.lg,
  },
});