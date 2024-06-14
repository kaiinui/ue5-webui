import type { Meta, StoryObj } from "@storybook/react";
import { ScriptLog } from "../ScriptLog";
import type { Script } from "../types";

const logs: Script[] = [
	{
		idx: 0,
		name: "ふじた",
		bg: "yellow",
		text: "ど、どどど、どーゆーことですか！？",
		type: "text",
	},
	{
		idx: 1,
		name: "P",
		bg: "blue",
		text: "ふじたさん、落ち着いてください。",
		type: "text",
	},
	{
		idx: 2,
		name: "ふじた",
		bg: "yellow",
		text: "いや、落ち着けるわけないじゃないですか！",
		type: "text",
	},
	{
		idx: 3,
		name: "P",
		bg: "blue",
		text: "いいから…落ち着いてください。",
		type: "text",
	},
	{
		idx: 4,
		name: "ふじた",
		bg: "yellow",
		text: "(この人、信用できんの？)",
		type: "blur",
	},
];

const meta: Meta<typeof ScriptLog> = {
	component: ScriptLog,
};
export default meta;
type Story = StoryObj<typeof ScriptLog>;

export const Default: Story = {
	args: {
		logs,
	},
};

export const Long: Story = {
	args: {
		logs: [...logs, ...logs, ...logs, ...logs, ...logs],
	},
};
