import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import CampaignListScreen from "../screens/CampaignListScreen";
import CampaignDetailScreen from "../screens/CampaignDetailScreen";
import CreativePlanScreen from "../screens/CreativePlanScreen";
import SubmitScreen from "../screens/SubmitScreen";
import SubmissionsScreen from "../screens/SubmissionsScreen";
import { COLORS, TYPOGRAPHY, SPACING } from "../styles/theme";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: COLORS.cardBackground,
            borderBottomWidth: 1,
            borderBottomColor: COLORS.border,
            elevation: 2,
            shadowColor: COLORS.shadow,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.08,
            shadowRadius: 8,
          },
          headerTitleStyle: {
            ...TYPOGRAPHY.bodyStrong,
            color: COLORS.text,
            fontSize: 17,
            fontWeight: "600",
            letterSpacing: 0.3,
          },
          headerTintColor: COLORS.primary,
          headerBackTitleVisible: false,
          headerLeftContainerStyle: {
            paddingLeft: SPACING.md,
          },
          headerRightContainerStyle: {
            paddingRight: SPACING.md,
          },
          headerTitleAlign: "center",
          contentStyle: {
            backgroundColor: COLORS.background,
          },
        }}
      >
        <Stack.Screen
          name="CampaignList"
          component={CampaignListScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="CampaignDetail"
          component={CampaignDetailScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="CreativePlan"
          component={CreativePlanScreen}
          options={{
            title: "Creative Plan",
            headerBackTitle: "Back",
            headerTitleStyle: {
              ...TYPOGRAPHY.bodyStrong,
              color: COLORS.text,
              fontSize: 17,
              fontWeight: "600",
            },
          }}
        />
        <Stack.Screen
          name="Submit"
          component={SubmitScreen}
          options={{
            title: "Submit Video",
            headerBackTitle: "Back",
            headerTitleStyle: {
              ...TYPOGRAPHY.bodyStrong,
              color: COLORS.text,
              fontSize: 17,
              fontWeight: "600",
            },
          }}
        />
        <Stack.Screen
          name="Submissions"
          component={SubmissionsScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}