export default function SvgCircle({ fill }: { fill: string }) {
	return (
		<>
			<svg
				width="211"
				height="209"
				viewBox="0 0 264 261"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<circle cx="69.5" cy="66.5" r="194.5" fill={fill} fillOpacity="0.2" />
				<circle
					cx="69.5008"
					cy="66.4999"
					r="169.141"
					fill={fill}
					fillOpacity="0.4"
				/>
				<circle
					cx="69.5017"
					cy="66.5"
					r="143.783"
					fill={fill}
					fillOpacity="0.6"
				/>
				<circle
					cx="69.5025"
					cy="66.5001"
					r="118.424"
					fill={fill}
					fillOpacity="0.8"
				/>
				<g filter="url(#filter0_d_1152_191)">
					<circle cx="69.5033" cy="66.4999" r="93.0658" fill={fill} />
				</g>
				<defs>
					<filter
						id="filter0_d_1152_191"
						x="-35.5625"
						y="-38.5659"
						width="218.133"
						height="218.132"
						filterUnits="userSpaceOnUse"
						colorInterpolationFilters="sRGB"
					>
						<feFlood floodOpacity="0" result="BackgroundImageFix" />
						<feColorMatrix
							in="SourceAlpha"
							type="matrix"
							values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
							result="hardAlpha"
						/>
						<feOffset dx="4" dy="4" />
						<feGaussianBlur stdDeviation="8" />
						<feComposite in2="hardAlpha" operator="out" />
						<feColorMatrix
							type="matrix"
							values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
						/>
						<feBlend
							mode="normal"
							in2="BackgroundImageFix"
							result="effect1_dropShadow_1152_191"
						/>
						<feBlend
							mode="normal"
							in="SourceGraphic"
							in2="effect1_dropShadow_1152_191"
							result="shape"
						/>
					</filter>
				</defs>
			</svg>
		</>
	);
}
