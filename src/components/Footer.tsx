import instagramLogo from '../assets/icons/instagram.svg';
import facebookLogo from '../assets/icons/facebook.svg';
import twitterLogo from '../assets/icons/twitter.svg';
import twitchLogo from '../assets/icons/twitch.svg';

export default function Footer() {
	return (
		<div className="flex flex-col w-full">
			<div className="flex justify-evenly min-h-full bg-[#D6EBF6] py-14">
				<div className="flex flex-col w-full max-w-[20%] p-5">
					<span className="font-semibold mb-5">Placeholder 01</span>
					<p className="">
						Revolutionize crowdfunding with our profit-driven platform
					</p>
				</div>
				<div className="flex flex-col w-full max-w-[20%] p-5">
					<span className="font-semibold mb-5">Placeholder 02</span>
					<ul className="list-disc pl-6">
						<li>Subscribe to newsletter</li>
						<li>Visit our social links</li>
					</ul>
				</div>
				<div className="flex flex-col w-full max-w-[25%] border-black border-l-2 p-5 pl-20 mr-10">
					<span className="font-semibold mb-7">Follow us for more updates</span>
					<div className="flex items-center">
						<a href="/" className="mr-4">
							<img src={instagramLogo} alt="Instagram logo" />
						</a>
						<a href="/" className="mr-4">
							<img src={facebookLogo} alt="Facebook logo" />
						</a>
						<a href="/" className="mr-4">
							<img src={twitterLogo} alt="Twitter logo" />
						</a>
						<a href="/">
							<img src={twitchLogo} alt="Twitch logo" />
						</a>
					</div>
				</div>
			</div>
			<div className="flex justify-center items-center bg-black min-w-full min-h-[25vh]">
				<p className="font-chromate text-[#D7ECF7] text-9xl">
					You are gonna make it!
				</p>
			</div>
		</div>
	);
}
