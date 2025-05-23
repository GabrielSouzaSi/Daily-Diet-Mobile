const { version } = require("./package.json")

export default () => ({
	expo: {
		name: "daily-diet",
		slug: "daily-diet",
		version,
		orientation: "portrait",
		icon: "./assets/images/icon.png",
		scheme: "myapp",
		userInterfaceStyle: "automatic",
		newArchEnabled: true,
		splash: {
			image: "./assets/images/splash-icon.png",
			resizeMode: "contain",
			backgroundColor: "#ffffff",
		},
		ios: {
			supportsTablet: true,
			buildNumber: version,
		},
		android: {
			package: "com.gabrielsouzasi.appdailydiet",
			versionCode: parseInt(version.split(".").join("")),
			adaptiveIcon: {
				foregroundImage: "./assets/images/adaptive-icon.png",
				backgroundColor: "#ffffff",
			},
		},
		web: {
			bundler: "metro",
			output: "static",
			favicon: "./assets/images/favicon.png",
		},
		plugins: ["expo-router", "expo-sqlite"],
		experiments: {
			typedRoutes: true,
		},
		extra: {
			eas: {
				projectId: "451667ab-7b59-4d77-8bfd-a9d24fe2320f",
			},
		},
	},
})
