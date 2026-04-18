import AppNavigator from "./navigation/AppNavigator";
import { SubmissionProvider } from "./context/SubmissionContext";

export default function App() {
  return (
    <SubmissionProvider>
      <AppNavigator />
    </SubmissionProvider>
  );
}