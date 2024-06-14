import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { TypeAnimation } from "react-type-animation";
import { twMerge } from "tailwind-merge";
import { OptionChooser } from "./OptionChooser";
import { ScriptLog } from "./ScriptLog";
import type { Script } from "./types";
import "./animation.css";
import { twx } from "./util";
import "@fontsource/noto-sans-jp";

const longScript: Script[] = [
	{
		idx: 0,
		name: "P",
		bg: "blue",
		text: "結構長いログでも",
		type: "text",
	},
	{
		idx: 1,
		name: "キャラクター",
		bg: "yellow",
		text: "こんな感じに",
		type: "text",
	},
	{
		idx: 2,
		name: "P",
		bg: "blue",
		text: "スクロールさせたり",
		type: "text",
	},
	{
		idx: 3,
		name: "キャラクター",
		bg: "yellow",
		text: "することが",
		type: "blur",
	},
	{
		idx: 4,
		name: "キャラクター",
		bg: "yellow",
		text: "できるかもです",
		type: "blur",
	},
	{
		idx: 5,
		name: "P",
		bg: "blue",
		text: "もっとスクロールしてください",
		type: "text",
	},
	{
		idx: 6,
		name: "キャラクター",
		bg: "yellow",
		text: "がんばります！",
		type: "text",
	},
	{
		idx: 7,
		name: "P",
		bg: "blue",
		text: "その意気です",
		type: "text",
	},
	{
		idx: 8,
		name: "キャラクター",
		bg: "yellow",
		text: "結構疲れてきました",
		type: "text",
	},
	{
		idx: 9,
		name: "P",
		bg: "blue",
		text: "まだまだですよ。",
		type: "text",
	},
	{
		idx: 10,
		name: "キャラクター",
		bg: "yellow",
		text: "結構、スクロールできたんじゃないですか？",
		type: "text",
	},
	{
		idx: 11,
		name: "P",
		bg: "blue",
		text: "がんばりましたね。",
		type: "text",
	},
];

const OpacityButton = twx.button`rounded-full px-4 py-1 text-white bg-black/25 text-sm`;

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
			text: "(えっ)",
			type: "blur",
		},
		{
			idx: 4,
			name: "ふじた",
			bg: "yellow",
			text: "(この人、信用できんの？)",
			type: "blur",
		},
		{
			idx: 5,
			name: "P",
			bg: "blue",
			text: "私を信じてください。",
			type: "text",
		},
		{
			idx: 6,
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

type Mode = "normal" | "log" | "log2" | "hidehud";

const App: React.FC<{
	mode: Mode;
}> = (props) => {
	const [mode, setMode] = useState<Mode>(props.mode || "normal");
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
			{mode === "log2" && (
				<ScriptLog logs={longScript} onClose={() => setMode("normal")} />
			)}
			{currentScript.type === "option" && (
				<OptionChooser
					options={[
						{ label: "あなたをプロデュースします", value: "yes" },
						{ label: "うーん", value: "intermediate" },
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
						opacity: 1,
					}}
					initial={{
						opacity: 0,
					}}
					className="absolute space-y-0.5 px-3 py-1.5 top-8 w-[200px] bg-black/30 rounded-tr-full rounded-br-full text-white"
				>
					<div className="text-[8px]">親愛度</div>
					<div className="text-sm">第1話</div>
				</motion.div>

				<motion.section
					animate={{
						opacity: 1,
					}}
					initial={{
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
								<motion.span
									animate={{
										opacity: 1,
									}}
									initial={{
										opacity: 0,
									}}
									transition={{
										duration: 0.4,
									}}
									className="absolute bottom-3 right-4"
								>
									<ArrowIcon color="#999" />
								</motion.span>
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
						<OpacityButton
							type="button"
							className="bg-transparent pr-0"
							onClick={() => setMode("hidehud")}
						>
							<Expand />
						</OpacityButton>
						<OpacityButton type="button">SKIP</OpacityButton>
						<OpacityButton type="button" onClick={() => setMode("log")}>
							ログ
						</OpacityButton>
						<OpacityButton type="button" onClick={() => setMode("log2")}>
							長いログ
						</OpacityButton>
						<OpacityButton type="button" onClick={back}>
							戻る
						</OpacityButton>
					</div>
				</motion.section>
			</div>
		</>
	);
};

const ArrowIcon: React.FC<{
	color: string;
}> = ({ color }) => (
	// biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
	<svg
		className="anim-talk-arrow"
		height="18"
		width="18"
		viewBox="0 0 18 18"
		xmlns="http://www.w3.org/2000/svg"
	>
		<g fill="#212121">
			<path
				d="M2.75 6.5L9 12.75L15.25 6.5"
				fill="none"
				stroke={color}
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2"
			/>
		</g>
	</svg>
);

const Expand = () => (
	// biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
	<svg
		height="18"
		width="18"
		viewBox="0 0 18 18"
		xmlns="http://www.w3.org/2000/svg"
	>
		<g fill="#fff">
			<path
				d="M11.25,2.75h2c1.105,0,2,.895,2,2v2"
				fill="none"
				stroke="#fff"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2"
			/>
			<path
				d="M6.75,15.25h-2c-1.105,0-2-.895-2-2v-2"
				fill="none"
				stroke="#fff"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2"
			/>
			<path
				d="M2.75,6.75v-2c0-1.105,.895-2,2-2h2"
				fill="none"
				stroke="#fff"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2"
			/>
			<path
				d="M15.25,11.25v2c0,1.105-.895,2-2,2h-2"
				fill="none"
				stroke="#fff"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2"
			/>
		</g>
	</svg>
);

export default App;
