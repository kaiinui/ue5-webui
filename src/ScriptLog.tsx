import type { Script } from "./types";

export const ScriptLog: React.FC<{
	logs: Script[];
	onClose?: () => void;
}> = ({ logs, onClose }) => {
	return (
		// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
		<div
			className="absolute z-50 top-0 left-0 w-full h-full bg-black/60 space-y-4 py-6"
			onClick={onClose}
		>
			<div className="text-sm bg-white/90 text-slate-800 w-[140px] rounded-full rounded-tl-none rounded-bl-none px-4 py-1">
				会話ログ
			</div>
			<section className="px-4">
				{logs.map((script) => (
					<LogMessage key={script.idx} script={script} />
				))}
			</section>
			<div className="absolute bottom-8 left-0 w-full flex justify-center">
				<button
					type="button"
					className="text-slate-800 rounded-full bg-white/90 py-3 text-center px-12 text-sm"
					onClick={onClose}
				>
					x 閉じる
				</button>
			</div>
		</div>
	);
};

const LogMessage: React.FC<{
	script: Script;
}> = ({ script }) => {
	if (script.bg === "blue") {
		return (
			<div className="flex space-x-2 justify-end">
				<div className="flex flex-col items-end">
					<div className="text-xs text-white font-bold">{script.name}</div>
					<div className="bg-white/90 text-sm text-slate-800 rounded-[16px] rounded-tr-none p-3">
						{script.text}
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="flex space-x-2">
			<div className="w-10 h-10 bg-red-400 rounded-full" />
			<div>
				<div className="text-xs text-white font-bold">{script.name}</div>
				<div className="bg-white/90 text-sm text-slate-800 rounded-[16px] rounded-tl-none p-3">
					{script.text}
				</div>
			</div>
		</div>
	);
};
