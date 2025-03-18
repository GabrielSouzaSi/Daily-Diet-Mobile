import { IconProps as PhosphorIconProps, IconWeight } from "phosphor-react-native";

interface ButtonIconProps {
    Icon: React.ComponentType<PhosphorIconProps>;
    size?: number;
    color?: string;
    weight?: IconWeight;
}

export function Icon({ Icon, size = 20, weight = "bold", ...rest }: ButtonIconProps) {
    return <Icon size={size} weight={weight} {...rest} />;
}