export default function ActionButton({
	href,
	className,
	children,
}: {
	href?: string;
	className?: string;
	children: React.ReactNode;
}) {
	return (
		<a
			href={href}
			className={`bg-yagmi-pink font-medium shadow-[0.3rem_0.4rem_white] border-black border-[1px] transition duration-200 ease-in-out transform hover:shadow-sm hover:translate-y-1 hover:cursor-pointer text-black ${className} `}
		>
			{children}
		</a>
	);
}
