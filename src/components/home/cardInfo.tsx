import { ArrowUpRight, WarningCircle } from "phosphor-react-native"
import { useColorScheme } from "nativewind"

import { Button } from "../button"
import { Card } from "../card"

import { colors } from "@/styles/colors"
import { router } from "expo-router"

type CardInfoProps = {
	percentage: string
	statusDiet: boolean
}

export function CardInfo({ percentage, statusDiet }: CardInfoProps) {
	const { colorScheme } = useColorScheme()
	return (
		<>
			{percentage ? (
				<Button
					activeOpacity={0.7}
					onPress={() => router.navigate("/statistic")}
				>
					<Card
						className={`${
							statusDiet ? "bg-green_light" : "bg-red_light"
						} p-3 rounded-xl`}
					>
						<Card className="flex-row justify-end">
							<Card.Icon
								Icon={ArrowUpRight}
								color={
									statusDiet
										? colors.green_dark
										: colors.red_dark
								}
							/>
						</Card>
						<Card className="flex items-center py-2">
							<Card.Text className="font-NunitoSansBold text-2xl text-gray-700">
								{percentage}%
							</Card.Text>
							<Card.Text className="font-NunitoSansRegular text-base text-gray-700">
								das refeições dentro da dieta
							</Card.Text>
						</Card>
					</Card>
				</Button>
			) : (
				<Card className="bg-gray-300 p-3 dark:bg-gray-600 rounded-xl">
					<Card className="flex items-center gap-4 py-2">
						<Card.Icon
							Icon={WarningCircle}
							color={
								colorScheme === "light"
									? colors.gray[700]
									: "white"
							}
							size={32}
						/>
						<Card.Text className="font-NunitoSansBold text-2xl text-white">
							Nenhuma refeição cadastrada
						</Card.Text>
					</Card>
				</Card>
			)}
		</>
	)
}
