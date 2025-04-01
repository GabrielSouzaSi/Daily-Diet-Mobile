import { useCallback, useState } from "react"
import {
	ActivityIndicator,
	FlatList,
	StatusBar,
	Text,
	View,
} from "react-native"
import { router, useFocusEffect } from "expo-router"
import { BlurView } from "expo-blur"
import Animated, { FadeIn, FadeOut } from "react-native-reanimated"
import { Plus } from "phosphor-react-native"

import { useColorScheme } from "nativewind"
import { getDietsOrder, statisticDiet } from "@/database/diet"
import { Button } from "@/components/button"
import { HeaderHome } from "@/components/home/header"

import { GroupedDiets } from "@/dtos/groupDiets"
import { ListMeals } from "@/components/home/listMeals"
import { CardInfo } from "@/components/home/cardInfo"

export default function Home() {
	const { colorScheme } = useColorScheme()
	const [percentage, setPercentage] = useState<string>()
	const [statusDiet, setStatusDiet] = useState<boolean>()
	const [dietOrder, setDietOrder] = useState<GroupedDiets[] | null>(null)
	const [isLoading, setIsLoading] = useState(true)

	async function handleStatistic() {
		try {
			setIsLoading(true)
			let [stats, response] = await Promise.all([
				statisticDiet(),
				getDietsOrder(),
			])
			setDietOrder(response)
			setStatusDiet(stats.statusDiet)
			setPercentage(stats.percentage)
		} catch (error) {
			console.log("handleSequenceDiet =>", error)
		} finally {
			setIsLoading(false)
		}
	}

	useFocusEffect(
		useCallback(() => {
			let isActive = true

			const fetch = async () => {
				try {
					if (isActive) await handleStatistic()
				} catch (error) {
					console.log(error)
				}
			}

			fetch()

			return () => {
				isActive = false
			}
		}, [])
	)

	return (
		<View className="flex-1 bg-lightBackground dark:bg-darkBackground p-8">
			<StatusBar
				backgroundColor={colorScheme === "light" ? "white" : "black"}
				barStyle={
					colorScheme === "light" ? "dark-content" : "light-content"
				}
			/>

			<HeaderHome />

			<CardInfo percentage={percentage} statusDiet={statusDiet} />

			<Text className="font-NunitoSansBold text-base text-gray-700 dark:text-white mt-8 mb-4">
				Refeições
			</Text>

			<Button
				className="flex-row p-4 bg-gray-600 rounded-md justify-center items-center gap-4 mb-4 dark:bg-gray-600"
				onPress={() => router.navigate("/createDiet")}
			>
				<Button.Icon Icon={Plus} color="white" />
				<Button.Text className="font-NunitoSansBold text-base text-white">
					Nova Refeição
				</Button.Text>
			</Button>

			<FlatList
				data={dietOrder ?? []}
				keyExtractor={(item) => item.date}
				renderItem={({ item }) => <ListMeals {...item} />}
				showsVerticalScrollIndicator={false}
				ListEmptyComponent={() => (
					<Text className="font-NunitoSansBold text-center text-gray-500 dark:text-gray-400 mt-10">
						Nenhuma refeição encontrada.
					</Text>
				)}
			/>
			{isLoading && (
				<Animated.View
					entering={FadeIn.duration(500)}
					exiting={FadeOut.duration(500)}
					style={{
						position: "absolute",
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						justifyContent: "center",
						alignItems: "center",
						zIndex: 10,
					}}
				>
					{/* Fundo escuro semi-transparente */}
					<Animated.View
						entering={FadeIn.duration(500)}
						exiting={FadeOut.duration(500)}
						style={{
							position: "absolute",
							top: 0,
							left: 0,
							right: 0,
							bottom: 0,
							backgroundColor:
								colorScheme === "light"
									? "rgba(0,0,0,0.2)"
									: "rgba(0,0,0,0.5)",
						}}
					/>

					{/* Blur por cima do fundo escuro */}
					<BlurView
						intensity={50}
						tint={colorScheme === "light" ? "light" : "dark"}
						style={{
							position: "absolute",
							top: 0,
							left: 0,
							right: 0,
							bottom: 0,
						}}
					/>

					<View
						style={{
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<ActivityIndicator size="large" color="#4CAF50" />
						<Text
							style={{
								marginTop: 16,
								fontSize: 16,
								fontFamily: "NunitoSans-Bold",
								color:
									colorScheme === "light" ? "#333" : "#fff",
							}}
						>
							Carregando suas refeições...
						</Text>
					</View>
				</Animated.View>
			)}
		</View>
	)
}
