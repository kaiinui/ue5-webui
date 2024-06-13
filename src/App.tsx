import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { twc } from "react-twc";
import { TypeAnimation } from "react-type-animation";
import { twMerge } from "tailwind-merge";
import { OptionChooser } from "./OptionChooser";
import { ScriptLog } from "./ScriptLog";
import type { Script } from "./types";

const OpacityButton = twc.button`rounded-full px-4 py-1 text-white bg-black/30 text-sm`;

const useTouchPropagation = (ref: React.RefObject<HTMLDivElement>) => {
	const onClick = (e: React.MouseEvent) => {
		if (e.target === ref.current) {
			console.log(`ue:onclickgame(${e.clientX},${e.clientY})`);
		}
	};

	return { onClick };
};

const useTalkScript = () => {
	const scripts: Script[] = [
		{
			idx: 0,
			name: "P",
			bg: "blue",
			text: "ふじたさんですね。",
			type: "text",
		},
		{
			idx: 1,
			name: "ふじた",
			bg: "yellow",
			text: "あ、はい、そですけど……",
			type: "text",
		},
		{
			idx: 2,
			name: "P",
			bg: "blue",
			text: "(選択肢)",
			type: "option",
		},
		{
			idx: 3,
			name: "ふじた",
			bg: "yellow",
			text: "(この人、信用できんの？)",
			type: "blur",
		},
		{
			idx: 4,
			name: "P",
			bg: "blue",
			text: "私を信じてください。",
			type: "text",
		},
		{
			idx: 5,
			name: "ふじた",
			bg: "yellow",
			text: "そのお話、受けさせていただきますっ！",
			type: "text",
		},
	];

	const [index, setIndex] = useState(0);

	const currentScript = scripts[index];

	const next = () => {
		if (index === scripts.length - 1) {
			return;
		}
		setIndex((prevIndex) => prevIndex + 1);
	};

	const back = () => {
		if (index === 0) {
			return;
		}
		setIndex((prevIndex) => prevIndex - 1);
	};

	const logScripts = scripts.slice(0, index + 1);

	return { currentScript, logScripts, next, back };
};

function App() {
	const [mode, setMode] = useState<"normal" | "log" | "hidehud">("normal");
	const containerRef = useRef<HTMLDivElement>(null);
	const { onClick } = useTouchPropagation(containerRef);
	const { currentScript, logScripts, next, back } = useTalkScript();
	const isTest = window.location.search.includes("test");

	const grad =
		currentScript?.bg === "yellow"
			? "bg-gradient-to-r from-yellow-300 to-purple-300"
			: "bg-stone-400";
	const nameBlur =
		currentScript?.type === "blur" ? "blur-[8px] rounded-[40px]" : "";
	const blur =
		currentScript?.type === "blur" ? "blur-[8px] rounded-[20px]" : "";

	return (
		<>
			{mode === "log" && (
				<ScriptLog logs={logScripts} onClose={() => setMode("normal")} />
			)}
			{currentScript.type === "option" && (
				<OptionChooser
					options={[
						{ label: "あなたをプロデュースさせてください", value: "yes" },
						{ label: "…なんでもありません", value: "no" },
					]}
					onChoose={() => next()}
				/>
			)}
			{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
			<div
				className={`w-full h-screen relative flex flex-col justify-end ${isTest ? "bg-black/50" : ""} ${mode === "hidehud" ? "opacity-0" : ""}`}
				onClick={(e: React.MouseEvent) => {
					if (mode === "hidehud") {
						setMode("normal");
						return;
					}
					onClick(e);
				}}
				ref={containerRef}
			>
				<motion.div
					animate={{
						y: 0,
						opacity: 1,
					}}
					initial={{
						y: -12,
						opacity: 0,
					}}
					className="absolute space-y-0.5 px-3 py-1.5 top-8 w-[200px] bg-black/30 rounded-tr-full rounded-br-full text-white"
				>
					<div className="text-[8px]">親愛度</div>
					<div className="text-sm">第1話</div>
				</motion.div>

				<motion.section
					animate={{
						y: 0,
						opacity: 1,
					}}
					initial={{
						y: 12,
						opacity: 0,
					}}
					className="m-4 mb-12 space-y-4"
				>
					{currentScript && currentScript.type !== "option" && (
						<button
							type="button"
							className="block w-full text-start"
							onClick={next}
						>
							<div className="relative w-[45%] text-sm px-3 py-1 font-semibold">
								<div
									className={twMerge(
										"rounded-full rounded-bl-none absolute top-0 left-0 w-full h-full -z-10",
										nameBlur,
										grad,
									)}
								/>
								{currentScript.name}
							</div>
							<div className="relative min-h-[120px] p-3 text-sm">
								<div
									className={twMerge(
										"rounded-[12px] rounded-tl-none rounded-br-none absolute top-0 left-0 w-full h-full -z-10 bg-white/80",
										blur,
									)}
								/>
								<TypeAnimation
									key={currentScript.idx}
									sequence={[currentScript.text]}
									wrapper="span"
									speed={40}
									cursor={false}
								/>
							</div>
						</button>
					)}
					<div className="flex justify-between">
						<OpacityButton type="button" onClick={() => setMode("hidehud")}>
							[ ]
						</OpacityButton>
						<OpacityButton type="button">SKIP</OpacityButton>
						<OpacityButton type="button" onClick={() => setMode("log")}>
							ログ
						</OpacityButton>
						<OpacityButton type="button">AUTO</OpacityButton>
						<OpacityButton type="button" onClick={back}>
							戻る
						</OpacityButton>
					</div>
				</motion.section>
			</div>
		</>
	);
}

export default App;
