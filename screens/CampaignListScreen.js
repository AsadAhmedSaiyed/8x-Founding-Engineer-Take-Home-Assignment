import { View, FlatList, TouchableOpacity, Text, StyleSheet } from "react-native";
import CampaignCard from "../components/CampaignCard";
import { campaigns } from "../data/mockData";
import { SPACING, COLORS, TYPOGRAPHY, BORDER_RADIUS } from "../styles/theme";

export default function CampaignListScreen({ navigation }) {
  const handleViewSubmissions = () => {
    navigation.navigate("Submissions");
  };

  const categories = [...new Set(campaigns.map(c => c.category))];
  const activeCampaigns = campaigns.filter(c => c.status === "Active");
  const totalEarnings = campaigns.reduce((sum, c) => sum + c.payout, 0);

  return (
    <View style={styles.container}>
      {/* Hero Header with Gradient Feel */}
      <View style={styles.heroHeader}>
        <View style={styles.headerContent}>
          <Text style={styles.heroTitle}>Verse</Text>
          <Text style={styles.heroSubtitle}>Your Creative Marketplace</Text>
        </View>
      </View>

      {/* Quick Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{activeCampaigns.length}</Text>
          <Text style={styles.statLabel}>Active Gigs</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>₹{totalEarnings}+</Text>
          <Text style={styles.statLabel}>Total Payout</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statCard}>
          <TouchableOpacity onPress={handleViewSubmissions}>
            <Text style={styles.statNumber}>📝</Text>
            <Text style={styles.statLabel}>My Work</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Featured Section */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>🔥 Featured Campaigns</Text>
        <Text style={styles.sectionSubtitle}>High-paying opportunities</Text>
      </View>

      <FlatList
        data={campaigns}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("CampaignDetail", { campaign: item })
            }
            activeOpacity={0.7}
          >
            <CampaignCard campaign={item} />
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContent}
        scrollEnabled={true}
      />
    </View>
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
    borderBottomLeftRadius: BORDER_RADIUS.xl,
    borderBottomRightRadius: BORDER_RADIUS.xl,
  },
  headerContent: {
    paddingTop: SPACING.md,
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
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.lg,
    marginTop: -SPACING.md,
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.lg,
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.lg,
    elevation: 3,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
  },
  statCard: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: SPACING.md,
  },
  statNumber: {
    ...TYPOGRAPHY.title2,
    color: COLORS.primary,
    marginBottom: SPACING.xs,
  },
  statLabel: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    textAlign: "center",
  },
  statDivider: {
    width: 1,
    backgroundColor: COLORS.border,
    marginHorizontal: SPACING.sm,
  },
  sectionHeader: {
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    ...TYPOGRAPHY.title3,
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  sectionSubtitle: {
    ...TYPOGRAPHY.small,
    color: COLORS.textSecondary,
  },
  listContent: {
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.xl,
  },
});