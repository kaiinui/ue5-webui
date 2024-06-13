import { OptionChooser } from "../OptionChooser";

export default {
	title: "OptionChooser",
	component: OptionChooser,
};

export const Default = () => (
	<OptionChooser
		options={[
			{ label: "Option 1", value: "option1" },
			{ label: "Option 2", value: "option2" },
			{ label: "Option 3", value: "option3" },
		]}
	/>
);
