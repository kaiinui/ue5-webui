import type { Preview } from "@storybook/react";
import "../src/tailwind.css";
import "./main.css";
import "@fontsource/noto-sans-jp";

const preview: Preview = {
	parameters: {
		layout: "fullscreen",
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
	},
};

export default preview;
