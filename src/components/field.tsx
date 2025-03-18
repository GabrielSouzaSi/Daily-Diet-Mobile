import { View, ViewProps } from "react-native";
import { Title } from "./text";
import { Input } from "./input";

type FieldProps = ViewProps;

function Field({ children, className, ...rest }: FieldProps) {

    return (
        <View
            className={className}
            {...rest}
        >
            {children}
        </View>
    )
}

Field.Title = Title
Field.Input = Input

export { Field }