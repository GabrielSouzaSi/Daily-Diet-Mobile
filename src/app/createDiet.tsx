import { StatusBar, Text, View, Alert } from "react-native"
import { router, useLocalSearchParams } from "expo-router"

import { Button } from "@/components/button"
import { ArrowLeft, Circle } from "phosphor-react-native"
import { colors } from "@/styles/colors"
import { Field } from "@/components/field"
import { useEffect, useState } from "react"
import { addDiet, upDiet } from "@/database/diet"
import { DietDTO } from "@/dtos/dietDTO"
import { Header } from "@/components/header"

export default function CreateDiet() {
	const [name, setName] = useState("")
	const [description, setDescription] = useState("")
	const [date, setDate] = useState("")
	const [time, setTime] = useState("")
	const [compliant, setCompliant] = useState<boolean>()
	const { data } = useLocalSearchParams()
	const [diet, setDiet] = useState<DietDTO | null>()

	async function handleAddDiet() {
		if (
			!name.trim() ||
			!date.trim() ||
			!time.trim() ||
			compliant === undefined
		) {
			Alert.alert("Atenção", "Preencha todos os campos obrigatórios.")
			return
		}

		const data = {
			name: name.trim(),
			date: date.trim(),
			time: time.trim(),
			description: description?.trim() || "",
			compliant: Number(compliant), // ou manter boolean, dependendo do seu schema
		} as DietDTO

		try {
			await addDiet(data)
			console.log("Cadastrado!")
			router.push({
				pathname: "/feedback",
				params: {
					status: data.compliant,
				},
			} as any)
		} catch (error) {
			console.log("handleAddDiet =>", error)
			Alert.alert("Erro", "Não foi possível cadastrar a refeição.")
		}
	}
	async function handleEditDiet() {
		let data = {
			id: diet.id,
			name,
			date,
			description,
			compliant: Number(compliant),
			time,
		} as DietDTO
		try {
			await upDiet(data)
			console.log("Dieta editada!")
		} catch (error) {
			console.log("handleEditDiet => ", error)
		} finally {
			router.replace("/")
		}
	}

	useEffect(() => {
		if (data) {
			const diet = JSON.parse(data as string) as DietDTO
			setDiet(diet)
			setName(diet.name)
			setDescription(diet.description)
			setDate(diet.date)
			setTime(diet.time)
			setCompliant(diet.compliant ? true : false)
		}
	}, [data])

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
						{diet ? "Editar refeição" : "Nova refeição"}
					</Text>
				</Header>
			</View>

			<View className="flex-1 bg-white dark:bg-gray-700 rounded-t-3xl p-8 gap-4">
				<Field>
					<Field.Title className="font-NunitoSansBold text-lg text-gray-700 dark:text-gray-100">
						Nome
					</Field.Title>
					<Field.Input
						className="font-NunitoSansRegular text-base rounded-md border dark:text-gray-100 border-gray-400 p-4"
						onChangeText={setName}
						value={name}
					/>
				</Field>

				<Field>
					<Field.Title className="font-NunitoSansBold text-lg text-gray-700 dark:text-gray-100">
						Descrição
					</Field.Title>
					<Field.Input
						className="font-NunitoSansRegular text-base rounded-md border border-gray-400 dark:text-gray-100 p-4 h-36"
						style={{ textAlignVertical: "top" }}
						onChangeText={setDescription}
						value={description}
						multiline={true}
						numberOfLines={5}
					/>
				</Field>

				<View className="flex-row justify-between gap-4">
					<Field className="flex-1">
						<Field.Title className="font-NunitoSansBold text-lg text-gray-700 dark:text-gray-100">
							Data
						</Field.Title>
						<Field.Input
							className="font-NunitoSansRegular text-base rounded-md border border-gray-400 dark:text-gray-100 p-4"
							onChangeText={setDate}
							value={date}
						/>
					</Field>
					<Field className="flex-1">
						<Field.Title className="font-NunitoSansBold text-lg text-gray-700 dark:text-gray-100">
							Hora
						</Field.Title>
						<Field.Input
							className="font-NunitoSansRegular text-base rounded-md border border-gray-400 p-4 dark:text-gray-100"
							onChangeText={setTime}
							value={time}
						/>
					</Field>
				</View>

				<View className="gap-4">
					<Text className="font-NunitoSansBold text-lg text-gray-700 dark:text-gray-100">
						Está dentro da dieta?
					</Text>
					<View className="flex-row justify-between gap-4">
						<Button
							className={`flex-1 flex-row gap-2 py-4 justify-center items-center rounded-md ${
								compliant === true
									? "bg-green_light border border-green_dark"
									: "bg-gray-300 border border-gray-300"
							}`}
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
							className={`flex-1 flex-row gap-2 py-4 justify-center items-center rounded-md ${
								compliant === false
									? "bg-red_light border border-red_dark"
									: "bg-gray-300 border border-gray-300"
							}`}
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

				{diet ? (
					<View className="flex-1 justify-end bg-white dark:bg-gray-700">
						<View className="flex-row">
							<Button
								className="flex-1 py-4 bg-gray-700 justify-center items-center rounded-md dark:bg-gray-100"
								onPress={() => handleEditDiet()}
							>
								<Button.Text className="font-NunitoSansBold text-base text-white dark:text-gray-700">
									Salvar alterações
								</Button.Text>
							</Button>
						</View>
					</View>
				) : (
					<View className="flex-1 justify-end bg-white dark:bg-gray-700">
						<View className="flex-row">
							<Button
								className="flex-1 py-4 bg-gray-700 justify-center items-center rounded-md dark:bg-gray-100"
								onPress={() => handleAddDiet()}
							>
								<Button.Text className="font-NunitoSansBold text-base text-white dark:text-gray-700">
									Cadastrar refeição
								</Button.Text>
							</Button>
						</View>
					</View>
				)}
			</View>
		</View>
	)
}
