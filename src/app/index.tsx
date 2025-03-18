import { useEffect, useState } from "react";
import { Switch, Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";
import { Plus } from "phosphor-react-native";

import { useColorScheme } from "nativewind";
import { addDiet, statisticDiet } from "@/database/diet";
import { colors } from "@/styles/colors";
import { Button } from "@/components/button";
import { DietDTO } from "@/dtos/dietDTO";

export default function Home() {
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

    useEffect(() => {
        handleStatistic();
    }, [])

    return (
        <View className="flex-1 bg-lightBackground dark:bg-darkBackground p-8">
             <Text className="font-NunitoSansBold text-base text-gray-700">
                Refeições
             </Text>
            <Button className="flex-row p-4 my-4 bg-gray-600 rounded-md justify-center items-center gap-4" onPress={() => router.navigate("/createDiet")}>
                <Button.Icon Icon={Plus} />
                <Button.Title className="font-NunitoSansBold text-base text-white">Nova Refeição</Button.Title>
            </Button>

        </View>
    );
}