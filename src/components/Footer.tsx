import twitterLogo from '../assets/icons/twitter.svg';

export default function Footer() {
	return (
		<section className="flex flex-col w-full min-h-[60vh] pt-20">
			<div className="flex justify-evenly min-h-full bg-yagmi-yellow py-14">
				<div className="flex flex-col w-full max-w-[20%] p-5">
					<span className="font-work-sans font-semibold mb-5">Our Mission</span>
					<p className="font-work-sans">
						We believe web3 can change lives, and we are going to prove it NFT
						by NFT.
					</p>
				</div>
				<div className="flex flex-col w-full max-w-[20%] p-5">
					<span className="font-work-sans font-semibold mb-5">Our Roadmap</span>
					<ul className="list-disc pl-6">
						<li className="font-work-sans">Alpha launch - May 2023</li>
						<li className="font-work-sans">Beta launch - June 2023</li>
						<li className="font-work-sans">... and more, stay tuned!</li>
					</ul>
				</div>
				<div className="flex flex-col w-full max-w-[25%] border-black border-l-2 p-5 pl-20 mr-10">
					<span className="font-work-sans font-semibold mb-7">
						Follow us for more updates
					</span>
					<div className="flex items-center">
						<a href="https://twitter.com/yagmifinance" className="mr-4">
							<img src={twitterLogo} alt="Twitter logo" className="w-10 h-10" />
						</a>
					</div>
				</div>
			</div>
			<div className="flex justify-center items-center bg-black min-w-full min-h-[25vh]">
				<p className="font-chromate text-9xl text-white">
					You are gonna make it!
				</p>
			</div>
		</section>
	);
}
