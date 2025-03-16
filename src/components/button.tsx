import { Text, TextProps, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { IconProps as PhosphorIconProps, IconWeight } from "phosphor-react-native";
import clsx from "clsx";

type ButtonProps = TouchableOpacityProps;

function Button({ children, className, ...rest }: ButtonProps) {

    return (
        <TouchableOpacity
            className={clsx("justify-center items-center rounded-md", className)}
            {...rest}
        >
            {children}
        </TouchableOpacity>
    )
}

function Title({ children, className }: TextProps) {
    return <Text className={className}>{children}</Text>
}

interface ButtonIconProps {
    Icon: React.ComponentType<PhosphorIconProps>;
    size?: number;
    color?: string;
    weight?: IconWeight;
}

function Icon({ Icon, size=20, color="#8047F8", weight="bold", ...rest }: ButtonIconProps) {
    return <Icon size={size} color={color} weight={weight} {...rest} />;
}

Button.Title = Title
Button.Icon = Icon

export { Button }