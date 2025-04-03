import { View, ViewProps, Text } from "react-native"
import { Button } from "./button"
import { Card } from "./card"
import { Img } from "./img"
import { Icon } from "./icon"

type HeaderProps = ViewProps

function Header({ children, className, ...rest }: HeaderProps) {
	return (
		<View className={className} {...rest}>
			{children}
		</View>
	)
}

Header.Img = Img
Header.Button = Button
Header.Card = Card
Header.Icon = Icon
Header.Text = Text

export { Header }
