import { View, ViewProps, Text, TextProps, TouchableOpacity, TouchableOpacityProps, TextInput, TextInputProps } from "react-native";
import { IconProps as PhosphorIconProps, IconWeight } from "phosphor-react-native";
import clsx from "clsx";

type FieldProps = ViewProps;

function Field({ children, className, ...rest }: FieldProps) {

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

function Input({ className, ...rest }: TextInputProps) {
    return <TextInput className={clsx("rounded-md", className)} {...rest} />
}


Field.Title = Title
Field.Input = Input

export { Field }