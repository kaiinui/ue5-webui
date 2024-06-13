import { twc } from "react-twc";

export type Option = {
	label: string;
	value: string;
};

export const OptionChooser: React.FC<{
	options: Option[];
	onChoose?: (value: string) => void;
}> = ({ options, onChoose }) => (
	<>
		<div className="absolute z-50 top-0 left-0 w-full h-full bg-black/60 flex flex-col justify-center items-center gap-4">
			{options.map((option) => (
				<OptionButton
					key={option.value}
					onClick={() => onChoose?.(option.value)}
				>
					{option.label}
				</OptionButton>
			))}
		</div>
	</>
);

const OptionButton = twc.button`text-slate-800 bg-white/80 py-6 rounded-full min-w-[200px] px-4 text-sm font-semibold backdrop-blur-sm`;
