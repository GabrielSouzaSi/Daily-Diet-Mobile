import { useCallback, useEffect, useState } from "react";
import { StatusBar, Switch, Text, TouchableOpacity, View } from "react-native";
import { router, useFocusEffect } from "expo-router";
import { ArrowUpRight, Circle, LineVertical, Plus, WarningCircle } from "phosphor-react-native";

import { useColorScheme } from "nativewind";
import { statisticDiet } from "@/database/diet";
import { colors } from "@/styles/colors";
import { Button } from "@/components/button";
import { DietDTO } from "@/dtos/dietDTO";
import { Header } from "@/components/header";

import Logo from "@/assets/logo.png"
import { Card } from "@/components/card";

export default function Home() {
    const { colorScheme } = useColorScheme();
    const [diet, setDiet] = useState<DietDTO[]>();
    const [percentage, setPercentage] = useState<string>();
    const [statusDiet, setStatusDiet] = useState<boolean>();

    async function handleStatistic() {
        try {
            let { percentage, statusDiet, diets } = await statisticDiet();
            setDiet(diets);
            setStatusDiet(statusDiet);
            setPercentage(percentage);

        } catch (error) {
            console.log("handleSequenceDiet =>", error);
        }
    }

    useFocusEffect(
        useCallback(() => {
            handleStatistic();
        }, [])
    );

    return (
        <View className="flex-1 bg-lightBackground dark:bg-darkBackground p-8">

            <StatusBar
                backgroundColor={colorScheme === "light" ? "white" : "dark"}
                barStyle={colorScheme === "light" ? "dark-content" : "light-content"}
            />

            <Header className="flex-row justify-between mb-8">
                <Header.Img source={Logo} resizeMode="contain" />
                <Header.Button activeOpacity={0.5}>
                    <Header.Img src={"https://avatars.githubusercontent.com/u/25905000?v=4"} className="w-10 h-10 border-2 border-gray-600 rounded-full" resizeMode="contain" />
                </Header.Button>
            </Header>

            {percentage ? (<Button activeOpacity={0.7}>
                <Card className={`${statusDiet ? "bg-green_light" : "bg-red_light"} p-3 rounded-xl`}>
                    <Card className="flex-row justify-end">
                        <Card.Icon Icon={ArrowUpRight} color={statusDiet ? colors.green_dark : colors.red_dark} />
                    </Card>
                    <Card className="flex items-center py-2">
                        <Card.Text className="font-NunitoSansBold text-2xl text-gray-700">{percentage}%</Card.Text>
                        <Card.Text className="font-NunitoSansRegular text-base text-gray-700">das refeições dentro da dieta</Card.Text>
                    </Card>
                </Card>
            </Button>)
                :
                (<Card className="bg-gray-300 p-3 dark:bg-gray-600 rounded-xl" >
                    <Card className="flex items-center gap-4 py-2">
                        <Card.Icon Icon={WarningCircle} color={colorScheme === "light" ? colors.gray[700] : "white"} size={32} />
                        <Card.Text className="font-NunitoSansBold text-2xl text-white">Nenhuma refeição cadastrada</Card.Text>
                    </Card>
                </Card>)}

            <Text className="font-NunitoSansBold text-base text-gray-700 dark:text-white mt-8 mb-4">
                Refeições
            </Text>

            <Button className="flex-row p-4 bg-gray-600 rounded-md justify-center items-center gap-4 mb-4 dark:bg-gray-600" onPress={() => router.navigate("/createDiet")}>
                <Button.Icon Icon={Plus} color="white" />
                <Button.Text className="font-NunitoSansBold text-base text-white">Nova Refeição</Button.Text>
            </Button>

            <Text className="font-NunitoSansBold text-lg text-gray-700 my-3 dark:text-white">
                12.08.22
            </Text>

            <Button className="flex-row p-4 border-2 border-gray-200 rounded-md items-center gap-3 mb-3" activeOpacity={0.7}>
                <Button.Text className="font-NunitoSansBold text-sm text-gray-600 dark:text-white">20:00</Button.Text>
                <Button.Icon Icon={LineVertical} size={20} color={colors.gray[400]} />
                <Button.Text className="flex-1 font-NunitoSansRegular text-base text-gray-600 dark:text-white">X-tudo</Button.Text>
                <Button.Icon Icon={Circle} size={20} weight="fill" color={colors.red_mid} />
            </Button>
            <Button className="flex-row p-4 border-2 border-gray-200 rounded-md items-center gap-3 mb-3" activeOpacity={0.7}>
                <Button.Text className="font-NunitoSansBold text-sm text-gray-600 dark:text-white">20:00</Button.Text>
                <Button.Icon Icon={LineVertical} size={20} color={colors.gray[400]} />
                <Button.Text className="flex-1 font-NunitoSansRegular text-base text-gray-600 dark:text-white">X-tudo</Button.Text>
                <Button.Icon Icon={Circle} size={20} weight="fill" color={colors.red_mid} />
            </Button>
            <Button className="flex-row p-4 border-2 border-gray-200 rounded-md items-center gap-3 mb-3" activeOpacity={0.7}>
                <Button.Text className="font-NunitoSansBold text-sm text-gray-600 dark:text-white">20:00</Button.Text>
                <Button.Icon Icon={LineVertical} size={20} color={colors.gray[400]} />
                <Button.Text className="flex-1 font-NunitoSansRegular text-base text-gray-600 dark:text-white">X-tudo</Button.Text>
                <Button.Icon Icon={Circle} size={20} weight="fill" color={colors.red_mid} />
            </Button>
            <Text className="font-NunitoSansBold text-lg text-gray-700 dark:text-white my-3">
                12.08.22
            </Text>

            <Button className="flex-row p-4 border-2 border-gray-200 rounded-md items-center gap-3 mb-3" activeOpacity={0.7}>
                <Button.Text className="font-NunitoSansBold text-sm text-gray-600 dark:text-white">20:00</Button.Text>
                <Button.Icon Icon={LineVertical} size={20} color={colors.gray[400]} />
                <Button.Text className="flex-1 font-NunitoSansRegular text-base text-gray-600 dark:text-white">X-tudo</Button.Text>
                <Button.Icon Icon={Circle} size={20} weight="fill" color={colors.red_mid} />
            </Button>
            <Button className="flex-row p-4 border-2 border-gray-200 rounded-md items-center gap-3 mb-3" activeOpacity={0.7}>
                <Button.Text className="font-NunitoSansBold text-sm text-gray-600 dark:text-white">20:00</Button.Text>
                <Button.Icon Icon={LineVertical} size={20} color={colors.gray[400]} />
                <Button.Text className="flex-1 font-NunitoSansRegular text-base text-gray-600 dark:text-white">X-tudo</Button.Text>
                <Button.Icon Icon={Circle} size={20} weight="fill" color={colors.red_mid} />
            </Button>
            <Button className="flex-row p-4 border-2 border-gray-200 rounded-md items-center gap-3 mb-3" activeOpacity={0.7}>
                <Button.Text className="font-NunitoSansBold text-sm text-gray-600 dark:text-white">20:00</Button.Text>
                <Button.Icon Icon={LineVertical} size={20} color={colors.gray[400]} />
                <Button.Text className="flex-1 font-NunitoSansRegular text-base text-gray-600 dark:text-white">X-tudo</Button.Text>
                <Button.Icon Icon={Circle} size={20} weight="fill" color={colors.red_mid} />
            </Button>

        </View>
    );
}