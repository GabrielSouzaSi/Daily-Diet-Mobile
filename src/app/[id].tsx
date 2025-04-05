import { Button } from "@/components/button"
import { Header } from "@/components/header"
import { Icon } from "@/components/icon"
import { getDietId } from "@/database/diet"
import { DietDTO } from "@/dtos/dietDTO"
import { colors } from "@/styles/colors"
import { router, useLocalSearchParams } from "expo-router"
import {
	ArrowLeft,
	Circle,
	PencilSimpleLine,
	Trash,
} from "phosphor-react-native"
import { useEffect, useState } from "react"
import { Modal, StatusBar, Text, View } from "react-native"
export default function Diet() {
	const { id } = useLocalSearchParams()
	const [diet, setDiet] = useState<DietDTO>()
	const [modal, setModal] = useState(false)

	useEffect(() => {
		async function handleGetDiet() {
			try {
				let respoense = await getDietId(Number(id))
				console.log(respoense)
				setDiet(respoense)
			} catch (error) {
				console.log("handleAddDiet => ", error)
			}
		}
		if (id) handleGetDiet()
	}, [id])

	return (
		<View
			className={`flex-1 ${
				diet?.compliant ? "bg-green_light" : "bg-red_light"
			}`}
		>
			<StatusBar
				backgroundColor={
					diet?.compliant ? colors.green_light : colors.red_light
				}
				barStyle="dark-content"
			/>
			<View className="p-8">
				<Header className="relative flex-row items-center">
					<Button onPress={() => router.navigate("/")}>
						<Button.Icon
							Icon={ArrowLeft}
							color={colors.gray[600]}
						/>
					</Button>
					<Text className="absolute left-1/2 -translate-x-1/2 font-NunitoSansBold text-lg text-gray-700">
						Refeição
					</Text>
				</Header>
			</View>
			{diet && (
				<View className="flex-1 bg-white rounded-s-3xl p-8 dark:bg-gray-700 gap-2">
					<Text className="font-NunitoSansBold text-lg dark:text-gray-100">
						{diet.name}
					</Text>
					<Text className="font-NunitoSansRegular text-base dark:text-gray-100">
						{diet.description == ""
							? "Sem descrição"
							: diet.description}
					</Text>
					<Text className="font-NunitoSansBold text-base dark:text-gray-100 mt-2">
						Data e hora
					</Text>
					<Text className="font-NunitoSansRegular text-base dark:text-gray-100 ">
						{diet.date} às {diet.time.slice(0, 5)}
					</Text>
					<View className="self-start flex-row gap-2 px-4 py-2 items-center bg-gray-200 rounded-full mt-2">
						<Icon
							Icon={Circle}
							size={10}
							weight="fill"
							color={
								diet.compliant
									? colors.green_dark
									: colors.red_dark
							}
						/>
						<Text className="font-NunitoSansBold text-base text-gray-700">
							{diet.compliant
								? "Dentro da dieta"
								: "Fora da dieta"}
						</Text>
					</View>
					<View className="flex-1 justify-end bg-white gap-3">
						<Button
							className="flex-row gap-4 py-4 bg-gray-700 justify-center items-center border rounded-md"
							onPress={() => {}}
						>
							<Button.Icon
								Icon={PencilSimpleLine}
								color={colors.gray[100]}
							/>
							<Button.Text className="font-NunitoSansBold text-base text-white">
								Editar refeição
							</Button.Text>
						</Button>
						<Button
							className="flex-row gap-4 py-4 bg-gray-100 justify-center items-center border border-gray-700 rounded-md"
							onPress={() => setModal(true)}
						>
							<Button.Icon
								Icon={Trash}
								color={colors.gray[700]}
							/>
							<Button.Text className="font-NunitoSansBold text-base text-gray-700">
								Ecluir refeição
							</Button.Text>
						</Button>
					</View>
				</View>
			)}
			<Modal
				visible={modal}
				animationType="slide"
				transparent
				statusBarTranslucent
			>
				<View className="flex-1 justify-center items-center bg-black/10 px-6">
					<View className="w-full bg-white dark:bg-gray-700 rounded-lg p-6">
						<Text className="font-NunitoSansBold text-lg dark:text-gray-100 mb-6 text-center">
							Deseja realmente excluir o registro da refeição?
						</Text>

						<View className="flex-row gap-3">
							<Button
								className="flex-1 gap-4 py-4 bg-gray-100 justify-center items-center border border-gray-700 rounded-md"
								onPress={() => setModal(false)}
							>
								<Button.Text className="font-NunitoSansBold text-base text-gray-700">
									Cancelar
								</Button.Text>
							</Button>
							<Button
								className="flex-1 gap-4 py-4 bg-gray-700 justify-center items-center border rounded-md"
								onPress={() => {}}
							>
								<Button.Text className="font-NunitoSansBold text-base text-white">
									Sim, excluir
								</Button.Text>
							</Button>
						</View>
					</View>
				</View>
			</Modal>
		</View>
	)
}
