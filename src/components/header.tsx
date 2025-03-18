import { View, ViewProps, Image, ImageProps } from "react-native";
import { Button } from "./button";
import { Card } from "./card";
import { Img } from "./img";

type HeaderProps = ViewProps;

function Header({ children, className, ...rest }: HeaderProps) {

    return (
        <View
            className={className}
            {...rest}
        >
            {children}
        </View>
    )
}



Header.Img = Img
Header.Button = Button
Header.Card = Card

export { Header }