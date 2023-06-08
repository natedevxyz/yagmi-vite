import { useLoaderData, Link } from 'react-router-dom';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

export default function Marketplace() {
	const query = useLoaderData() as any;

	return (
		<>
			<div className="flex flex-col items-center my-10">
				<h1 className="text-white font-chromate text-5xl mb-8">
					\\ Explore the Marketplace \\
				</h1>
				<p className="text-[#717171] text-xl max-w-[60%] text-center">
					Here is where community and opportunity intersect, a manifestation of
					the collective power of crowdfunding backed by smart contracts
				</p>
			</div>
			{query.data.map((dao: any) => (
				<div
					key={dao.id}
					className="flex w-[80%] min-h-[46vh] border-[1px] border-white rounded-2xl py-8 justify-between mb-7"
				>
					<div className="flex flex-col justify-between px-8 w-[35%]">
						<div>
							<div className="flex items-center mb-6">
								<img
									src={dao.logo_url}
									alt="DAO logo"
									className="h-[2rem] w-[2rem] rounded-full mr-2"
								/>
								<h2 className="text-white font-medium text-4xl">{dao.name}</h2>
							</div>
							<p className="text-[#717171] text-lg">{dao.description}</p>
						</div>
						<a
							href={dao.website_url}
							className="flex text-white items-center text-xl hover:cursor-pointer border-yagmi-pink border-2 rounded-md px-4 py-1 self-start"
						>
							Visit website
							<ArrowRightIcon
								width="1.1rem"
								height="1.1rem"
								className="ml-2 mt-0.5"
							/>
						</a>
					</div>
					<div className="flex flex-col min-w-[65%] justify-between">
						<button className="text-white flex items-center mr-8 mb-4 self-end">
							See all champions
							<ArrowRightIcon width="1rem" height="1rem" className="ml-1" />
						</button>
						<div className="flex overflow-hidden px-4 space-x-4 max-w-full">
							{dao.champions.map((champion: any) => (
								<Link
									to={`${champion.id}`}
									key={champion.id}
									className="flex justify-center min-h-[15rem] max-h-[15rem] min-w-[15rem] max-w-[15rem] overflow-hidden relative"
								>
									<div className="w-full h-full">
										<img
											src={champion.avatar_url}
											alt="Champion avatar"
											className="w-full h-full object-cover rounded-lg p-1 hover:bg-gray-50"
										/>
									</div>
									<span className="absolute bg-white bottom-3 left-1/2 transform -translate-x-1/2 font-medium pb-0.5 px-3 rounded-3xl border-black border-2">
										{champion.name}
									</span>
								</Link>
							))}
						</div>
					</div>
				</div>
			))}
		</>
	);
}
