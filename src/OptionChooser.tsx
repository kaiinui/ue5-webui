import { motion } from "framer-motion";
import { useState } from "react";
import { twc } from "react-twc";
import { timeout } from "./util";

export type Option = {
	label: string;
	value: string;
};

export const OptionChooser: React.FC<{
	options: Option[];
	onChoose?: (value: string) => void;
}> = ({ options, onChoose }) => {
	const [clicking, setClicking] = useState<string | undefined>(undefined);

	return (
		<>
			<div className="absolute z-50 top-0 left-0 w-full h-full bg-black/60 flex justify-center items-center">
				<div className="w-full flex flex-wrap gap-4 justify-center">
					{options.map((option, index) => (
						<motion.span
							key={option.value}
							initial={{
								opacity: clicking ? 0 : 1,
								transform: "scale(1)",
							}}
							animate={
								clicking && {
									opacity: 0,
									transform: "scale(1.3)",
								}
							}
						>
							<motion.span
								initial={{
									opacity: 0,
								}}
								animate={{
									opacity: 1,
								}}
								transition={{
									delay: index * 0.07,
								}}
							>
								<OptionButton
									className={
										clicking === undefined || clicking === option.value
											? ""
											: "opacity-0"
									}
									onClick={async () => {
										setClicking(option.value);
										await timeout(400);
										onChoose?.(option.value);
									}}
								>
									<OptionButtonBackground />
									{option.label}
								</OptionButton>
							</motion.span>
						</motion.span>
					))}
				</div>
			</div>
		</>
	);
};

const OptionButton = twc.button`relative text-slate-800 py-6 min-w-[160px] max-w-[80vw] text-nowrap overflow-hidden text-ellipsis px-4 text-sm font-semibold backdrop-blur-sm bg-slate-300 rounded-full rounded-br-none`;
const OptionButtonBackground = twc.div`-z-10 absolute top-0 left-0 w-full h-full rounded-full bg-white/80`;
