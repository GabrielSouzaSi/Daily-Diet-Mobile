import { StatusBar, Text, View } from "react-native"
import { router, useLocalSearchParams } from "expo-router"

import { Button } from "@/components/button"
import { ArrowLeft, Circle } from "phosphor-react-native"
import { colors } from "@/styles/colors"
import { Field } from "@/components/field"
import { useEffect, useState } from "react"
import { addDiet } from "@/database/diet"
import { DietDTO } from "@/dtos/dietDTO"
import { Header } from "@/components/header"

export default function CreateDiet() {
	const [name, setName] = useState("")
	const [description, setDescription] = useState("")
	const [date, setDate] = useState("")
	const [time, setTime] = useState("")
	const [compliant, setCompliant] = useState<boolean>()
	const { data } = useLocalSearchParams()

	async function handleAddDiet() {
		let data = {
			name,
			date,
			description,
			compliant: Number(compliant),
			time,
		} as DietDTO
		try {
			await addDiet(data)
			console.log("Cadastratado!")
		} catch (error) {
			console.log("handleAddDiet => ", error)
		}
	}

	useEffect(() => {
		console.log(data)
	}, [])

	return (
		<View className="flex-1 bg-gray-300">
			<StatusBar
				backgroundColor={colors.gray[300]}
				barStyle="dark-content"
			/>
			<View className="p-8">
				<Header className="relative flex-row items-center">
					<Button onPress={() => router.back()}>
						<Button.Icon
							Icon={ArrowLeft}
							color={colors.gray[600]}
						/>
					</Button>
					<Text className="absolute left-1/2 -translate-x-1/2 font-NunitoSansBold text-lg text-gray-700">
						Nova refeição
					</Text>
				</Header>
			</View>

			<View className="flex-1 bg-white rounded-t-3xl p-8 gap-4">
				<Field>
					<Field.Title className="font-NunitoSansBold text-lg text-gray-700">
						Nome
					</Field.Title>
					<Field.Input
						className="font-NunitoSansRegular text-base rounded-md border border-gray-400 p-4"
						onChangeText={setName}
						value={name}
					/>
				</Field>

				<Field>
					<Field.Title className="font-NunitoSansBold text-lg text-gray-700">
						Descrição
					</Field.Title>
					<Field.Input
						className="font-NunitoSansRegular text-base rounded-md border border-gray-400 p-4 h-36"
						style={{ textAlignVertical: "top" }}
						onChangeText={setDescription}
						value={description}
						multiline={true}
						numberOfLines={5}
					/>
				</Field>

				<View className="flex-row justify-between gap-4">
					<Field className="flex-1">
						<Field.Title className="font-NunitoSansBold text-lg text-gray-700">
							Data
						</Field.Title>
						<Field.Input
							className="font-NunitoSansRegular text-base rounded-md border border-gray-400 p-4"
							onChangeText={setDate}
							value={date}
						/>
					</Field>
					<Field className="flex-1">
						<Field.Title className="font-NunitoSansBold text-lg text-gray-700">
							Hora
						</Field.Title>
						<Field.Input
							className="font-NunitoSansRegular text-base rounded-md border border-gray-400 p-4"
							onChangeText={setTime}
							value={time}
						/>
					</Field>
				</View>

				<View className="gap-4">
					<Text className="font-NunitoSansBold text-lg text-gray-700">
						Está dentro da dieta?
					</Text>
					<View className="flex-row justify-between gap-4">
						<Button
							className="flex-1 flex-row gap-2 bg-gray-300 py-4 justify-center items-center rounded-md"
							onPress={() => setCompliant(true)}
						>
							<Button.Icon
								Icon={Circle}
								size={10}
								weight="fill"
								color={colors.green_dark}
							/>
							<Button.Text className="font-NunitoSansBold text-base text-gray-700">
								Sim
							</Button.Text>
						</Button>
						<Button
							className="flex-1 flex-row gap-2 bg-gray-300 py-4 justify-center items-center rounded-md"
							onPress={() => setCompliant(false)}
						>
							<Button.Icon
								Icon={Circle}
								size={10}
								weight="fill"
								color={colors.red_dark}
							/>
							<Button.Text className="font-NunitoSansBold text-base text-gray-700">
								Não
							</Button.Text>
						</Button>
					</View>
				</View>

				<View className="flex-1 justify-end bg-white">
					<View className="flex-row">
						<Button
							className="flex-1 py-4 bg-gray-700 justify-center items-center rounded-md"
							onPress={() => handleAddDiet()}
						>
							<Button.Text className="font-NunitoSansBold text-base text-white">
								Cadastrar refeição
							</Button.Text>
						</Button>
					</View>
				</View>
			</View>
		</View>
	)
}
