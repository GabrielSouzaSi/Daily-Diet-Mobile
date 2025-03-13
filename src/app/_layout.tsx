import "@/styles/global.css";
import { useEffect } from "react";
import { Stack } from 'expo-router';
import { StatusBar, View, useColorScheme } from "react-native";
import 'react-native-reanimated';

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
      <View className={`flex-1 ${colorScheme === "dark" ? "dark bg-black" : "bg-white"}`}>
        <StatusBar
          backgroundColor={colorScheme === "light" ? "white" : "black"}
          barStyle="dark-content"
        />
        <Stack screenOptions={{ headerShown: false }} />
      </View>
  );
}

export default function RootLayout() {
  return <RootLayoutNav />;
}