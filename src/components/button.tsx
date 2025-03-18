import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { Title } from "./text";
import { Icon } from "./icon";

type ButtonProps = TouchableOpacityProps;

function Button({ children, className, ...rest }: ButtonProps) {

    return (
        <TouchableOpacity
            className={className}
            {...rest}
        >
            {children}
        </TouchableOpacity>
    )
}

Button.Text = Title
Button.Icon = Icon

export { Button }