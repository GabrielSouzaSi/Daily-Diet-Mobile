import { StatusBar, Text, View, KeyboardAvoidingView, Platform } from "react-native";
import { router } from "expo-router";

import { Button } from "@/components/button";
import { ArrowLeft, Circle } from "phosphor-react-native";
import { colors } from "@/styles/colors";
import { Field } from "@/components/field";
import { useState } from "react";
import { addDiet, delDiet } from "@/database/diet";
import { DietDTO } from "@/dtos/dietDTO";
import { Header } from "@/components/header";

type DietDataWithoutId = Omit<DietDTO, 'id'>;

export default function CreateDiet() {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [date, setDate] = useState("")
    const [time, setTime] = useState("")
    const [compliant, setCompliant] = useState<boolean>()

    const dietData: DietDataWithoutId[] = [
        {
            name: "X-Salada",
            description: "Sanduíche com ovo, alface, tomate, presunto, queijo, carne e pão",
            date: "2023-10-26",
            time: "21:00:00",
            compliant: 0,
        },
        {
            name: "Salada de Frutas",
            description: "Morango, banana, maçã e melão",
            date: "2023-10-27",
            time: "10:30:00",
            compliant: 1,
        },
        {
            name: "Frango Grelhado",
            description: "Filé de frango grelhado com salada",
            date: "2023-10-27",
            time: "12:00:00",
            compliant: 1,
        },
        {
            name: "Pizza",
            description: "Pizza de calabresa",
            date: "2023-10-27",
            time: "20:00:00",
            compliant: 0,
        },
        {
            name: "Omelete",
            description: "Omelete com queijo e tomate",
            date: "2023-10-28",
            time: "08:00:00",
            compliant: 1,
        },
        {
            name: "Sopa de Legumes",
            description: "Sopa de cenoura, batata e abóbora",
            date: "2023-10-28",
            time: "19:00:00",
            compliant: 1,
        },
        {
            name: "Hambúrguer",
            description: "Hambúrguer com batata frita",
            date: "2023-10-28",
            time: "22:00:00",
            compliant: 0,
        },
        {
            name: "Iogurte com Granola",
            description: "Iogurte natural com granola e mel",
            date: "2023-10-29",
            time: "09:00:00",
            compliant: 1,
        },
        {
            name: "Peixe Assado",
            description: "Filé de peixe assado com legumes",
            date: "2023-10-29",
            time: "13:00:00",
            compliant: 1,
        },
        {
            name: "Chocolate",
            description: "Barra de chocolate ao leite",
            date: "2023-10-29",
            time: "16:00:00",
            compliant: 0,
        },
        {
            name: "Salada de Atum",
            description: "Salada com atum, ovo e tomate",
            date: "2023-10-30",
            time: "11:00:00",
            compliant: 1,
        },
        {
            name: "Carne com Batata Doce",
            description: "Carne magra com batata doce cozida",
            date: "2023-10-30",
            time: "14:00:00",
            compliant: 1,
        },
        {
            name: "Sorvete",
            description: "Sorvete de chocolate",
            date: "2023-10-30",
            time: "17:00:00",
            compliant: 0,
        },
        {
            name: "Frango com Salada",
            description: "Frango cozido com salada verde",
            date: "2023-10-31",
            time: "12:00:00",
            compliant: 1,
        },
        {
            name: "Macarrão Integral",
            description: "Macarrão integral com molho de tomate",
            date: "2023-10-31",
            time: "19:00:00",
            compliant: 1,
        },
        {
            name: "Bolo de Chocolate",
            description: "Fatia de bolo de chocolate",
            date: "2023-10-31",
            time: "21:00:00",
            compliant: 0,
        },
        {
            name: "Omelete com Espinafre",
            description: "Omelete com espinafre e queijo branco",
            date: "2023-11-01",
            time: "08:30:00",
            compliant: 1,
        },
        {
            name: "Salmão Grelhado",
            description: "Salmão grelhado com brócolis",
            date: "2023-11-01",
            time: "13:30:00",
            compliant: 1,
        },
        {
            name: "Coxinha",
            description: "Coxinha de frango",
            date: "2023-11-01",
            time: "16:30:00",
            compliant: 0,
        },
        {
            name: "Aveia com Frutas",
            description: "Aveia com banana e morango",
            date: "2023-11-02",
            time: "09:30:00",
            compliant: 1,
        },
    ];

    async function handleAddDiet() {
        let data = {
            name,
            date,
            description,
            compliant: Number(compliant),
            time
        } as DietDTO
        try {
            await addDiet(data)
            console.log("Cadastratado!");
        } catch (error) {
            console.log("handleAddDiet => ", error);
        }
    }

    return (
        <View className="flex-1 bg-gray-300">
            <StatusBar
                backgroundColor={colors.gray[300]}
                barStyle="dark-content"
            />
            <View className="p-8">

                <Header className="relative flex-row items-center">
                    <Button onPress={() => router.back()}>
                        <Button.Icon Icon={ArrowLeft} color={colors.gray[600]} />
                    </Button>
                    <Text className="absolute left-1/2 -translate-x-1/2 font-NunitoSansBold text-lg text-gray-700">
                        Nova refeição
                    </Text>
                </Header>

            </View>

            <View className="flex-1 bg-white rounded-t-3xl p-8 gap-4">

                <Field>
                    <Field.Title className="font-NunitoSansBold text-lg text-gray-700">Nome</Field.Title>
                    <Field.Input className="font-NunitoSansRegular text-base rounded-md border border-gray-400 p-4" onChangeText={setName} value={name} />
                </Field>

                <Field>
                    <Field.Title className="font-NunitoSansBold text-lg text-gray-700">Descrição</Field.Title>
                    <Field.Input className="font-NunitoSansRegular text-base rounded-md border border-gray-400 p-4 h-36" style={{ textAlignVertical: "top" }} onChangeText={setDescription} value={description} multiline={true} numberOfLines={5} />
                </Field>

                <View className="flex-row justify-between gap-4">
                    <Field className="flex-1">
                        <Field.Title className="font-NunitoSansBold text-lg text-gray-700">Data</Field.Title>
                        <Field.Input className="font-NunitoSansRegular text-base rounded-md border border-gray-400 p-4" onChangeText={setDate} value={date} />
                    </Field>
                    <Field className="flex-1">
                        <Field.Title className="font-NunitoSansBold text-lg text-gray-700">Hora</Field.Title>
                        <Field.Input className="font-NunitoSansRegular text-base rounded-md border border-gray-400 p-4" onChangeText={setTime} value={time} />
                    </Field>
                </View>

                <View className="gap-4">
                    <Text className="font-NunitoSansBold text-lg text-gray-700">
                        Está dentro da dieta?
                    </Text>
                    <View className="flex-row justify-between gap-4">
                        <Button className="flex-1 flex-row gap-2 bg-gray-300 py-4 justify-center items-center rounded-md" onPress={() => setCompliant(true)}>
                            <Button.Icon Icon={Circle} size={10} weight="fill" color={colors.green_dark} />
                            <Button.Text className="font-NunitoSansBold text-base text-gray-700">Sim</Button.Text>
                        </Button>
                        <Button className="flex-1 flex-row gap-2 bg-gray-300 py-4 justify-center items-center rounded-md" onPress={() => setCompliant(false)}>
                            <Button.Icon Icon={Circle} size={10} weight="fill" color={colors.red_dark} />
                            <Button.Text className="font-NunitoSansBold text-base text-gray-700">Não</Button.Text>
                        </Button>
                    </View>
                </View>

                <View className="flex-1 justify-end bg-white">

                    <View className="flex-row">
                        <Button className="flex-1 py-4 bg-gray-700 justify-center items-center rounded-md" onPress={() => handleAddDiet()}>
                            <Button.Text className="font-NunitoSansBold text-base text-white">Cadastrar refeição</Button.Text>
                        </Button>
                    </View>

                </View>

            </View>
        </View>
    )
}