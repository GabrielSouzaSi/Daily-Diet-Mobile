import { View, ViewProps } from "react-native";
import { Title } from "./text";
import { Icon } from "./icon";

type CardProps = ViewProps;

function Card({ children, className, ...rest }: CardProps) {

    return (
        <View
            className={className}
            {...rest}
        >
            {children}
        </View>
    )
}

Card.Text = Title
Card.Icon = Icon

export { Card }