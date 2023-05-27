export default function ActionButton({
	href,
	className,
	children,
}: {
	href: string;
	className?: string;
	children: React.ReactNode;
}) {
	return (
		<a
			href={href}
			className={`bg-primary font-medium shadow-[0.2rem_0.2rem_black] rounded-sm transition duration-200 ease-in-out transform hover:shadow-sm hover:translate-y-1 ${className} `}
		>
			{children}
		</a>
	);
}
