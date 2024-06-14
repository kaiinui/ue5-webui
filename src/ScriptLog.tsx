import { motion } from "framer-motion";
import type { Script } from "./types";
import { twx as twc } from "./util";

export const ScriptLog: React.FC<{
	logs: Script[];
	onClose?: () => void;
}> = ({ logs, onClose }) => {
	return (
		<motion.div
			initial={{
				opacity: 0,
			}}
			animate={{
				opacity: 1,
			}}
			className="absolute z-50 top-0 left-0 w-full h-full bg-black/60 flex flex-col gap-2 py-6"
			onClick={onClose}
		>
			<div className="text-sm bg-white/90 text-slate-800 w-[140px] rounded-full rounded-tl-none rounded-bl-none px-2 py-1">
				会話ログ
			</div>
			<motion.section
				initial={{
					y: -12,
				}}
				animate={{
					y: 0,
				}}
				className="px-4 pt-2 overflow-y-auto hidescroll"
				style={{
					maskImage:
						"linear-gradient(to top, transparent, black 25%, black 98%, transparent 100%)",
					WebkitMaskImage:
						"linear-gradient(to top, transparent, black 25%, black 98%, transparent 100%)",
				}}
			>
				{logs.map((script, index) => {
					const sameSpeaker = logs[index - 1]?.name === script.name;

					return (
						<LogMessage
							key={script.idx}
							script={script}
							sameSpeaker={sameSpeaker}
						/>
					);
				})}
				<div className="h-[120px]" />
			</motion.section>
			<motion.div
				initial={{
					y: 12,
				}}
				animate={{
					y: 0,
				}}
				className="fixed bottom-8 left-0 w-full flex justify-center"
			>
				<CloseButton onClick={onClose}>
					<CloseIcon /> 閉じる
				</CloseButton>
			</motion.div>
		</motion.div>
	);
};

const CloseButton = twc.button`text-slate-800 rounded-full bg-white/90 py-3 text-center pl-4 pr-10 text-sm drop-shadow-md flex gap-8 items-center`;

const Icon = twc.div`w-10 h-10 bg-red-400 rounded-full`;
const Name = twc.div`text-xs text-white font-bold`;
const Bubble = twc.div`bg-white/90 text-sm text-slate-800 rounded-[16px] p-3 max-w-[200px]`;

const LogMessage: React.FC<{
	script: Script;
	sameSpeaker?: boolean;
}> = ({ script, sameSpeaker }) => {
	if (script.bg === "blue") {
		return (
			<div className="flex space-x-2 justify-end">
				<div className="flex flex-col items-end">
					<Name>{script.name}</Name>
					<Bubble className="rounded-tr-none">{script.text}</Bubble>
				</div>
			</div>
		);
	}

	return (
		<div className="flex space-x-2">
			<Icon className={sameSpeaker ? "opacity-0" : ""} />
			<div>
				<Name className={sameSpeaker ? "opacity-0 -mb-2" : ""}>
					{script.name}
				</Name>
				<Bubble className="rounded-tl-none">{script.text}</Bubble>
			</div>
		</div>
	);
};

const CloseIcon = () => (
	// biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
	<svg
		className="opacity-80"
		height="14"
		width="14"
		viewBox="0 0 18 18"
		xmlns="http://www.w3.org/2000/svg"
	>
		<g fill="#212121">
			<path
				d="M14 4L4 14"
				fill="none"
				stroke="#212121"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="1.5"
			/>
			<path
				d="M4 4L14 14"
				fill="none"
				stroke="#212121"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="1.5"
			/>
		</g>
	</svg>
);
