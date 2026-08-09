import { ClerkProvider, useAuth } from "@clerk/expo";
import { tokenCache } from "@clerk/expo/token-cache";
import "../global.css";

import { useFonts } from "expo-font";
import { Redirect, Stack, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

import { fontAssets } from "@/theme";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY ?? "";

if (!publishableKey) {
  throw new Error(
    "Missing EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY. Add your key to .env.\nRun: 1) clerk auth login  2) clerk link  3) clerk env pull — then restart the dev server.",
  );
}

SplashScreen.preventAutoHideAsync();

const PUBLIC_ROUTES = new Set(["onboarding", "sign-in", "sign-up"]);

function RootNavigator() {
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();

  if (!isLoaded) {
    return null;
  }

  const rootSegment = segments[0];
  const onPublicRoute =
    typeof rootSegment === "string" && PUBLIC_ROUTES.has(rootSegment);

  if (!isSignedIn && !onPublicRoute) {
    return <Redirect href="/onboarding" />;
  }

  if (isSignedIn && onPublicRoute) {
    return <Redirect href="/" />;
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Home" }} />
      <Stack.Screen name="onboarding" options={{ headerShown: false }} />
      <Stack.Screen name="sign-up" options={{ headerShown: false }} />
      <Stack.Screen name="sign-in" options={{ headerShown: false }} />
    </Stack>
  );
}

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts(fontAssets);

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <RootNavigator />
    </ClerkProvider>
  );
}
