import { View, ViewProps, Text, TextProps, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { IconProps as PhosphorIconProps, IconWeight } from "phosphor-react-native";
import clsx from "clsx";

type CardProps = ViewProps;

function Card({ children, className, ...rest }: CardProps) {

    return (
        <View
            className={clsx("rounded-md", className)}
            {...rest}
        >
            {children}
        </View>
    )
}

function Title({ children, className, ...rest }: TextProps) {
    return <Text className={className} {...rest}>{children}</Text>
}

interface ButtonIconProps {
    Icon: React.ComponentType<PhosphorIconProps>;
    size?: number;
    color?: string;
    weight?: IconWeight;
}

function Icon({ Icon, size = 20, weight = "bold", ...rest }: ButtonIconProps) {
    return <Icon size={size} weight={weight} {...rest} />;
}

Card.Title = Title
Card.Icon = Icon

export { Card }