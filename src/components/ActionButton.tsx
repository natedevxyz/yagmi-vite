export default function ActionButton({
	className,
	children,
}: {
	className?: string;
	children: React.ReactNode;
}) {
	return (
		<button
			className={`bg-yagmi-pink font-medium shadow-[0.3rem_0.4rem_white] border-black border-[1px] transition duration-200 ease-in-out transform hover:shadow-sm hover:translate-y-1 hover:cursor-pointer text-black ${className} `}
		>
			{children}
		</button>
	);
}
