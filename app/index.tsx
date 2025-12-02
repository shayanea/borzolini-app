import { Redirect } from 'expo-router';

export default function Index() {
  // Temporarily bypass auth check to test if useAuth is causing the white screen
  return <Redirect href="/introduction" />;
}
