import ActionButton from '../ActionButton';

export default function LandingCard({
	title,
	text,
	btnText,
	imgSource,
	imgAlt,
	className,
}: {
	title: string;
	text: string;
	btnText: string;
	imgSource: string;
	imgAlt: string;
	className?: string;
}) {
	return (
		<div
			className={`bg-[#EBF7FE] rounded-2xl flex justify-between pl-8 pr-4 py-4 w-[34rem] h-[18rem] ${className}`}
		>
			<div className="max-w-[50%] flex flex-col justify-around">
				<h3 className="text-4xl font-semibold">{title}</h3>
				<p className="max-w-[60%] mb-4 leading-5">{text}</p>
				<ActionButton href="/" className="px-7 py-1 self-start text-lg mb-2">
					{btnText}
				</ActionButton>
			</div>
			<div className="max-w-[50%] self-center">
				<img
					className="object-contain w-full h-[14rem]"
					src={imgSource}
					alt={imgAlt}
				></img>
			</div>
		</div>
	);
}
