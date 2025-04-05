import { Button } from "@/components/button"
import { colors } from "@/styles/colors"
import { router, useLocalSearchParams } from "expo-router"
import { useColorScheme } from "nativewind"
import { Image, StatusBar, Text, View } from "react-native"

export default function Feedback() {
	const { status } = useLocalSearchParams()
	const { colorScheme } = useColorScheme()
	console.log(status)
	return (
		<View className="flex-1 items-center justify-center bg-gray-100 dark:bg-gray-700 px-5">
			<StatusBar
				backgroundColor={
					colorScheme === "light"
						? colors.gray[100]
						: colors.gray[700]
				}
				barStyle={
					colorScheme === "light" ? "dark-content" : "light-content"
				}
			/>
			{status == "1" ? (
				<View className="items-center gap-3">
					<Text className="text-green_dark font-NunitoSansBold text-2xl">
						Continue assim!
					</Text>
					<Text className="text-gray-600 font-NunitoSansRegular text-base text-center dark:text-white">
						Você continua
						<Text className="font-NunitoSansBold text-center dark:text-white">
							{" "}
							dentro da dieta{" "}
						</Text>
						. Muito bem!
					</Text>
					<Image
						source={require("@/assets/Illustration.png")}
						className="w-[224px] h-[288px] dark:bg-white"
						resizeMode="contain"
					/>
				</View>
			) : (
				<View className="items-center gap-3">
					<Text className="text-red_dark font-NunitoSansBold text-2xl">
						Que pena!
					</Text>
					<Text className="text-gray-600 font-NunitoSansRegular text-base text-center dark:text-white">
						Você{" "}
						<Text className="font-NunitoSansBold dark:text-white">
							saiu da dieta{" "}
						</Text>
						dessa vez, mas continue se esforçando e não desista!
					</Text>
					<Image
						source={require("@/assets/Illustration1.png")}
						className="w-[224px] h-[288px] dark:bg-white"
						resizeMode="contain"
					/>
				</View>
			)}
			<Button
				className="py-4 px-5 bg-gray-600 rounded-md mt-5 dark:bg-gray-300"
				onPress={() => router.navigate("/")}
			>
				<Button.Text className="font-NunitoSansBold text-base text-white dark:text-gray-600">
					Ir para a página inicial
				</Button.Text>
			</Button>
		</View>
	)
}
