import { TextInput, TextInputProps } from "react-native";

export function Input({ className, ...rest }: TextInputProps) {
    return <TextInput className={className} {...rest} />
}