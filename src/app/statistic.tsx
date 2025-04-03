import { Card } from "@/components/card"
import { Header } from "@/components/header"
import { statisticDiet } from "@/database/diet"
import { GroupedDiets } from "@/dtos/groupDiets"
import { colors } from "@/styles/colors"
import { BlurView } from "expo-blur"
import { router } from "expo-router"
import { useColorScheme } from "nativewind"
import { ArrowLeft } from "phosphor-react-native"
import { useEffect, useState } from "react"
import { ActivityIndicator, StatusBar, Text, View } from "react-native"
import Animated, { FadeIn, FadeOut } from "react-native-reanimated"

export default function Statistic() {
	const { colorScheme } = useColorScheme()
	const [percentage, setPercentage] = useState<string>()
	const [sequence, setSequence] = useState<number>()
	const [dietCount, setDietCount] = useState<number>()
	const [dietOn, setDietOn] = useState<number>()
	const [dietOff, setDietOff] = useState<number>()
	const [status, setStatus] = useState<boolean>()
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		async function fetchStatistic() {
			try {
				setIsLoading(true)
				let {
					percentage,
					sequence,
					dietCount,
					dietOn,
					dietOff,
					statusDiet,
				} = await statisticDiet()
				setPercentage(percentage)
				setSequence(sequence.sequence)
				setDietCount(dietCount)
				setDietOn(dietOn)
				setDietOff(dietOff)
				setStatus(statusDiet)
			} catch (error) {
				console.log("handleSequenceDiet =>", error)
			} finally {
				setIsLoading(false)
			}
		}

		fetchStatistic()
	}, [])
	return (
		<View
			className={`flex-1 ${status ? "bg-green_light" : "bg-red_light"}`}
		>
			<StatusBar
				backgroundColor={status ? colors.green_light : colors.red_light}
				barStyle="dark-content"
			/>
			<Header className="p-5">
				<Header.Button onPress={() => router.back()}>
					<Header.Icon
						Icon={ArrowLeft}
						color={status ? colors.green_dark : colors.red_dark}
					/>
				</Header.Button>
				<Header className="justify-center items-center">
					<Header.Text className="font-NunitoSansBold text-2xl text-gray-700">
						{percentage}%
					</Header.Text>
					<Header.Text className="font-NunitoSansRegular text-base text-center text-gray-700">
						das refeições dentro da dieta
					</Header.Text>
				</Header>
			</Header>

			<View className="flex-1 bg-white rounded-s-3xl p-5 dark:bg-gray-700 gap-4">
				<Text className="self-center font-NunitoSansBold text-base py-2">
					Estatístaca gerais
				</Text>
				<Card className="flex items-center p-4 bg-gray-200 rounded-lg">
					<Card.Text className="font-NunitoSansBold text-2xl text-gray-700">
						{sequence}
					</Card.Text>
					<Card.Text className="font-NunitoSansRegular text-base text-center text-gray-700">
						melhor sequência de pratos dentro da dieta
					</Card.Text>
				</Card>
				<Card className="flex items-center p-4 bg-gray-200 rounded-lg">
					<Card.Text className="font-NunitoSansBold text-2xl text-gray-700">
						{dietCount}
					</Card.Text>
					<Card.Text className="font-NunitoSansRegular text-base text-gray-700">
						refeições registradas
					</Card.Text>
				</Card>
				<View className="flex-row gap-4">
					<Card className="flex-1 items-center p-4 bg-green_light rounded-lg">
						<Card.Text className="font-NunitoSansBold text-2xl text-gray-700">
							{dietOn}
						</Card.Text>
						<Card.Text className="font-NunitoSansRegular text-base text-center text-gray-700">
							refeições dentro da dieta
						</Card.Text>
					</Card>
					<Card className="flex-1 items-center p-4 bg-red_light rounded-lg">
						<Card.Text className="font-NunitoSansBold text-2xl text-gray-700">
							{dietOff}
						</Card.Text>
						<Card.Text className="font-NunitoSansRegular text-base text-gray-700 text-center">
							refeições fora da dieta
						</Card.Text>
					</Card>
				</View>
			</View>
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
