import type { Meta, StoryObj } from "@storybook/react";
import { type Option, OptionChooser } from "../OptionChooser";

const options: Option[] = [
	{ label: "Option 1", value: "option1" },
	{ label: "Option 2", value: "option2" },
	{ label: "Option 3", value: "option3" },
];

const many: Option[] = [
	{ label: "たとえば", value: "option1" },
	{ label: "選択肢が", value: "option2" },
	{ label: "こんなに", value: "option3" },
	{ label: "あったら", value: "option1" },
	{ label: "どういう", value: "option2" },
	{ label: "画面に", value: "option3" },
	{ label: "なっちゃうだろう？", value: "option3" },
];

const long: Option[] = [
	{
		label:
			"たとえば、めっちゃ長い選択肢ってどうなるねん？な問題なんだけどどうなるんだろう",
		value: "option1",
	},
	{ label: "うーん", value: "option2" },
];

const meta: Meta<typeof OptionChooser> = {
	component: OptionChooser,
};
export default meta;
type Story = StoryObj<typeof OptionChooser>;

export const Default: Story = {
	args: {
		options,
	},
};
export const Many: Story = {
	args: {
		options: many,
	},
};

export const Long: Story = {
	args: {
		options: long,
	},
};
