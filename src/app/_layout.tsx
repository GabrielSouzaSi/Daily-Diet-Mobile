import "@/styles/global.css";
import { useCallback, useEffect, useState } from "react";
import { Stack } from 'expo-router';
import { StatusBar, View, useColorScheme } from "react-native";
import * as SplashScreen from "expo-splash-screen";

import { useFonts, NunitoSans_400Regular, NunitoSans_700Bold } from "@expo-google-fonts/nunito-sans";

import 'react-native-reanimated';

// Impede o splash screen de sumir automaticamente
SplashScreen.preventAutoHideAsync();

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const [appIsReady, setAppIsReady] = useState(false);
  const [fontLoaded] = useFonts({
    NunitoSans_400Regular,
    NunitoSans_700Bold
  })

  useEffect(() => {
    async function prepare() {
      if (fontLoaded) {
        setAppIsReady(true);
      }
    }

    prepare();
  }, [fontLoaded]);

  // Garante que o Splash Screen só desapareça após o layout estar pronto
  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null; // Não renderiza nada enquanto as fontes não carregam
  }

  return (
    <View className={`flex-1 ${colorScheme === "dark" ? "dark bg-black" : "bg-white"}`} onLayout={onLayoutRootView}>
      <StatusBar
        backgroundColor={colorScheme === "light" ? "white" : "black"}
        barStyle="dark-content"
      />
      <Stack screenOptions={{ headerShown: false }} >
        <Stack.Screen name="index" />
        <Stack.Screen name="createDiet" />
        <Stack.Screen name="delDiet" />
        <Stack.Screen name="diet" />
        <Stack.Screen name="statistic" />
      </Stack>
    </View>
  );
}

export default function RootLayout() {
  return <RootLayoutNav />;
}