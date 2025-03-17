import { useEffect, useState } from "react"
import { Switch, Text, TouchableOpacity, View } from "react-native"
import { Plus } from "phosphor-react-native";

import { useColorScheme } from "nativewind"
import { addDiet, statisticDiet } from "@/database/diet";
import { colors } from "@/styles/colors";
import { Button } from "@/components/button";

export default function Home() {
 
    async function handleStatistic() {
        try {
            let { percentage, statusDiet, diet } = await statisticDiet();

        } catch (error) {
            console.log("handleSequenceDiet =>", error);
        }
    }

    return (
        <View className="flex-1 justify-center items-center bg-lightBackground dark:bg-darkBackground">
             
            <Button className="flex-row p-4 m-4 bg-gray-700 rounded-md justify-center items-center" onPress={() => {}}>
                <Button.Icon Icon={Plus} />
                <Button.Title className="font-NunitoSansBold text-base text-white">Nova Refeição</Button.Title>
            </Button>
            
        </View>
    );
}