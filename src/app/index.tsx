import { useEffect, useState } from "react"
import { Switch, Text, TouchableOpacity, View } from "react-native"

import { useColorScheme } from "nativewind"
import { colors } from "@/styles/colors";

export default function Home() {
    const { colorScheme, toggleColorScheme } = useColorScheme();
    const [isEnabled, setIsEnabled] = useState(colorScheme === "dark"); // Inicializa com base no tema

    useEffect(() => {
        console.log(colorScheme);
        setIsEnabled(colorScheme === "dark")
    }, [colorScheme]);

    // const handleToggleSwitch = () => {
    //     toggleColorScheme();
    //     // Não é necessário setIsEnabled aqui, pois o useEffect já o faz
    // };

    return (
        <View className="flex-1 justify-center items-center bg-lightBackground dark:bg-darkBackground">
            <Text className="text-3xl capitalize font-bold text-black dark:text-white">Daily Diet</Text>
            <TouchableOpacity className="mt-10">
                <Text className="text-3xl capitalize font-bold text-darkBackground dark:text-white">
                    Modo {colorScheme === "light" ? "Light" : "Dark"}
                </Text>
            </TouchableOpacity>

            <Switch
                onValueChange={toggleColorScheme}
                value={isEnabled}
                trackColor={{ true: colors.lightBackground, false: colors.gray[500] }}
                thumbColor={colors.gray[200]}
            />
        </View>
    );
}