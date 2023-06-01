import LandingCard from '../components/Home/LandingCard';
import { Footer } from '../components';
import successImg from '../assets/images/success.png';
import certificateImg from '../assets/images/certificate.png';

export default function Home() {
	return (
		<>
			<main className="flex flex-col items-center min-w-full min-h-[81vh] rounded-b-[6rem] border-b-[1px] border-black">
				<div className="flex flex-col items-center my-10">
					<h1 className="font-chromate text-6xl mb-8">
						YAGMI helps you hop on board
					</h1>
					<p className="mb-8 text-lg max-w-[60%] text-center">
						Lorem ipsum dolor sit amet consectetur. Vel sem orci eget potenti
						pulvinar ut eget. Sit neque amet congue urna lectus.
					</p>
				</div>
				<div className="flex min-w-full justify-center">
					<LandingCard
						title="Support a champion"
						text="adipiscing aliquam gravida. adipiscing aliquam gravida."
						btnText="Marketplace"
						imgSource={successImg}
						imgAlt="Succesful launch"
						className="mr-14"
					/>
					<LandingCard
						title="Propose a champion"
						text="adipiscing aliquam gravida. adipiscing aliquam gravida."
						btnText="DAO Dashboard"
						imgSource={certificateImg}
						imgAlt="Person holding certificate"
					/>
				</div>
			</main>
			<section className="flex justify-center items-center min-h-[70vh] relative">
				<span className="font-chromate text-[25rem] absolute text-[#F5F5F5] left-[8rem] top-0 max-h-[1rem]">
					“
				</span>
				<span className="font-chromate text-[25rem] absolute text-[#F5F5F5] right-[20rem] top-[7rem]">
					”
				</span>
				<h2 className="font-chromate text-6xl max-w-[70%] text-center leading-tight relative">
					Web 3.0 is for everyone, we make it easy for you to join in
				</h2>
			</section>
			<Footer />
		</>
	);
}
