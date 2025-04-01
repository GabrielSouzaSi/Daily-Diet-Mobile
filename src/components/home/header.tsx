import { Header } from "../header"

import Logo from "@/assets/logo.png"

export function HeaderHome() {
	return (
		<Header className="flex-row justify-between mb-8">
			<Header.Img
				source={Logo}
				className="dark:bg-gray-400 dark:rounded-md"
				resizeMode="contain"
			/>
			<Header.Button activeOpacity={0.5}>
				<Header.Img
					src={"https://avatars.githubusercontent.com/u/25905000?v=4"}
					className="w-10 h-10 border-2 border-gray-600 rounded-full"
					resizeMode="contain"
				/>
			</Header.Button>
		</Header>
	)
}
