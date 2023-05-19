import LandingCard from '../components/Home/LandingCard';
import { Header, Footer } from '../components';
import successImg from '../assets/images/success.png';
import certificateImg from '../assets/images/certificate.png';

export default function Home() {
	return (
		<div className="flex flex-col items-center min-w-full min-h-screen relative z-50 ">
			<div className="top-0 left-0 absolute z-0">
				<svg
					width="78"
					height="478"
					viewBox="0 0 78 478"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M-40.3883 375.763C-77.0266 406.561 -107.415 443.526 -150.819 462.722C-194.223 481.919 -250.084 483.476 -289.185 458.499C-328.006 433.586 -350.003 381.859 -347.898 335.701C-346.138 289.759 -320.492 249.041 -303.557 212.805C-286.342 176.634 -278.054 144.599 -259.307 104.354C-240.775 63.7629 -211.721 14.6811 -173.557 2.8348C-135.459 -8.73124 -87.9711 17.003 -43.1578 45.3667C1.59073 74.0107 43.3849 105.219 63.4657 147.352C83.8914 189.269 82.2588 242.326 60.2784 281.234C38.5782 320.207 -4.0302 344.901 -40.3883 375.763Z"
						fill="#F6FCFF"
					/>
				</svg>
			</div>
			<div className="top-0 right-0 absolute z-0">
				<svg
					width="393"
					height="276"
					viewBox="0 0 393 276"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M392.061 -79.3779C435.751 -46.5279 484.698 -22.2189 517.219 21.1431C549.741 64.5051 565.837 126.263 548.098 176.195C530.359 225.799 478.456 263.576 426.553 273.103C374.979 282.958 323.076 264.89 278.4 255.364C233.724 245.509 195.946 244.523 146.343 234.011C96.4109 223.828 34.3244 204.118 11.3294 164.698C-11.3371 125.278 5.08787 65.8191 25.1264 8.66011C45.4934 -48.4989 69.4739 -103.03 111.193 -136.208C152.584 -169.715 212.043 -181.541 260.989 -167.087C309.936 -152.962 348.37 -111.899 392.061 -79.3779Z"
						fill="#F6FCFF"
					/>
				</svg>
			</div>
			<Header />
			<main className="flex flex-col items-center min-w-full min-h-[81vh] rounded-b-[6rem] border-b-[1px] border-black relative z-10">
				<div className="flex flex-col items-center my-10">
					<h1 className="font-chromate text-6xl mb-8">
						YAGMI helps you hop on board
					</h1>
					<p className="font-work mb-8 text-lg max-w-[60%] text-center">
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
			<section className="flex justify-center items-center min-h-[70vh] relative z-10">
				<span className="font-chromate text-[25rem] absolute z-10 text-[#F5F5F5] left-[8rem] top-0 max-h-[1rem]">
					“
				</span>
				<span className="font-chromate text-[25rem] absolute z-10 text-[#F5F5F5] right-[20rem] top-[7rem]">
					”
				</span>
				<h2 className="font-chromate text-6xl max-w-[70%] text-center leading-tight relative z-50">
					Web 3.0 is for everyone, we make it easy for you to join in
				</h2>
			</section>
			<Footer />
		</div>
	);
}
