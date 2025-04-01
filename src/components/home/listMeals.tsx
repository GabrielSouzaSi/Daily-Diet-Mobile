import { Text, View } from "react-native"
import { Button } from "../button"
import { Circle, LineVertical } from "phosphor-react-native"
import { colors } from "@/styles/colors"
import { GroupedDiets } from "@/dtos/groupDiets"
import { router } from "expo-router"

export function ListMeals({ date, meals }: GroupedDiets) {
	return (
		<View className="mb-3">
			<Text className="font-NunitoSansBold text-lg text-gray-700 my-3 dark:text-white">
				{date}
			</Text>

			{meals.map((meal) => (
				<Button
					key={meal.id}
					className="flex-row p-4 border-2 border-gray-200 rounded-md items-center gap-3 mb-3"
					activeOpacity={0.7}
					onPress={() =>
						router.push({
							pathname: "/createDiet",
							params: { data: JSON.stringify({ id: meal.id }) },
						})
					}
				>
					<Button.Text className="font-NunitoSansBold text-sm text-gray-600 dark:text-white">
						{meal.time.slice(0, 5)}
					</Button.Text>
					<Button.Icon
						Icon={LineVertical}
						size={20}
						color={colors.gray[400]}
					/>
					<Button.Text className="flex-1 font-NunitoSansRegular text-base text-gray-600 dark:text-white">
						{meal.name}
					</Button.Text>
					<Button.Icon
						Icon={Circle}
						size={20}
						weight="fill"
						color={
							meal.compliant === 1
								? colors.green_mid
								: colors.red_mid
						}
					/>
				</Button>
			))}
		</View>
	)
}
