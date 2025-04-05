import "@/styles/global.css"
import { useCallback, useEffect, useState } from "react"
import { Stack } from "expo-router"
import { StatusBar, View, useColorScheme } from "react-native"
import * as SplashScreen from "expo-splash-screen"

import {
	useFonts,
	NunitoSans_400Regular,
	NunitoSans_700Bold,
} from "@expo-google-fonts/nunito-sans"

import "react-native-reanimated"

// Database
import { SQLiteProvider } from "expo-sqlite"
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator"
import { useDrizzleStudio } from "expo-drizzle-studio-plugin"
import { DATABASE_NAME, db, expoDb } from "@/database/connection"
import migrations from "../../drizzle/migrations.js"

// Impede o splash screen de sumir automaticamente
SplashScreen.preventAutoHideAsync()

function RootLayoutNav() {
	const colorScheme = useColorScheme()
	const [appIsReady, setAppIsReady] = useState(false)

	const { success, error } = useMigrations(db, migrations)
	useDrizzleStudio(expoDb)

	const [fontLoaded] = useFonts({
		NunitoSans_400Regular,
		NunitoSans_700Bold,
	})

	useEffect(() => {
		async function prepare() {
			if (fontLoaded && success) {
				setAppIsReady(true)
			}
		}

		prepare()
	}, [fontLoaded, success])

	// Garante que o Splash Screen só desapareça após o layout estar pronto
	const onLayoutRootView = useCallback(async () => {
		if (appIsReady) {
			await SplashScreen.hideAsync()
		}
	}, [appIsReady])

	if (!appIsReady) {
		return null // Não renderiza nada enquanto as fontes não carregam
	}

	return (
		<View
			className={`flex-1 ${
				colorScheme === "dark" ? "dark bg-black" : "bg-white"
			}`}
			onLayout={onLayoutRootView}
		>
			<Stack screenOptions={{ headerShown: false }}>
				<Stack.Screen name="index" />
				<Stack.Screen name="createDiet" />
				<Stack.Screen name="delDiet" />
				<Stack.Screen name="[id]" />
				<Stack.Screen name="statistic" />
				<Stack.Screen name="feedback" />
			</Stack>
		</View>
	)
}

export default function RootLayout() {
	return (
		<SQLiteProvider databaseName={DATABASE_NAME}>
			<RootLayoutNav />
		</SQLiteProvider>
	)
}
