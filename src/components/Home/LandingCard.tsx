import ActionButton from '../ActionButton';
import SvgCircle from './svgCircle';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

export default function LandingCard({
	title,
	text,
	btnText,
	circleColor,
	href,
	className,
}: {
	title: string;
	text: string;
	btnText: string;
	circleColor: string;
	href: string;
	className?: string;
}) {
	return (
		<div
			className={`flex justify-end w-[34rem] h-[18rem] relative border-white border-2 ${className}`}
		>
			<div className="absolute left-0">
				<SvgCircle fill={circleColor} />
			</div>
			<div className="max-w-[50%] flex flex-col justify-around items-end relative mr-8 py-6">
				<h3 className="text-white text-3xl font-semibold text-right">
					{title}
				</h3>
				<p className="text-white max-w-[60%] mb-4 leading-5 text-sm text-right">
					{text}
				</p>
				<Link to={href}>
					<ActionButton className="flex items-center px-7 py-1 text-lg mb-2">
						{btnText}
						<ArrowRightIcon width="1rem" height="1rem" className="ml-2" />
					</ActionButton>
				</Link>
			</div>
		</div>
	);
}
