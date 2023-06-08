import { Fragment, useContext } from 'react';
import SessionContext from '../context/user-session';
import { ActionButton, Loading } from '../components';
import { Link, useLoaderData } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function Dashboard() {
	const session = useContext(SessionContext);
	const query = useLoaderData() as any;

	if (session?.isLoading) {
		return <Loading />;
	}

	return (
		<>
			<Link to="/" className="ml-[10%] self-start mb-4">
				<div className="flex items-center text-white text-lg hover:underline">
					<ArrowLeftIcon height="1rem" width="1rem" className="mr-1" />
					Back
				</div>
			</Link>
			<div className="flex w-[80%] mb-7">
				<div className="bg-yagmi-yellow min-w-[14rem] min-h-[14rem] rounded-xl p-4 overflow-hidden relative">
					<div className="w-full h-full rounded-xl bg-white">
						<img
							src={query?.data[0].logo_url}
							alt="ENS avatar"
							className="w-full h-full rounded-xl object-cover"
						/>
					</div>

					<span className="absolute bg-white bottom-5 left-1/2 transform -translate-x-1/2 font-medium pb-0.5 px-3 rounded-3xl border-black border-2 whitespace-nowrap">
						{query?.data[0].name}
					</span>
				</div>
				<div className="flex flex-col ml-10 pr-5 py-2 justify-between">
					<div className="flex flex-col">
						<h1 className="text-white font-chromate text-4xl mb-2">
							Propose a <span className="text-yagmi-aqua">champion</span>
						</h1>
						<p className="text-[#717171] text-lg">
							The collateral requirement for a loan is set at a 1:1 ratio for
							this organization. The collateral needs to be available in the
							organization's address when you initiate a proposal and IT WILL BE
							LOCKED. Over time, as your champions successfully repay the loans,
							the ratio of collateral required will decrease.
						</p>
					</div>
					<ActionButton className="self-start px-7 py-1 text-lg mb-2">
						Propose now
					</ActionButton>
				</div>
			</div>
			<h2 className="text-white font-chromate text-3xl self-start ml-[10%] mt-16 mb-10">
				Manage Champions
			</h2>
			<div className="grid grid-cols-6 content-start min-w-[80%] min-h-[40vh] border-[1px] border-white rounded-2xl pt-4 pb-9 px-4 justify-between mb-7">
				<h3 className="text-white font-medium text-xl text-center border-b-[1px] border-white max-h-[4rem] mt-5 pb-5">
					Name
				</h3>
				<h3 className="text-white font-medium text-xl text-center border-b-[1px] border-white max-h-[4rem] mt-5 pb-5">
					Address
				</h3>
				<h3 className="text-white font-medium text-xl text-center border-b-[1px] border-white max-h-[4rem] mt-5 pb-5">
					Tokens minted
				</h3>
				<h3 className="text-white font-medium text-xl text-center border-b-[1px] border-white max-h-[4rem] mt-5 pb-5">
					Total Debt
				</h3>
				<h3 className="text-white font-medium text-xl text-center border-b-[1px] border-white max-h-[4rem] mt-5 pb-5">
					Instalments
				</h3>
				<h3 className="text-white font-medium text-xl text-center border-b-[1px] border-white max-h-[4rem] mt-5 pb-5">
					Mint actions
				</h3>
				{query.data[0].champions.map((champion: any) => (
					<Fragment key={champion.id}>
						<Link
							to={`/marketplace/${champion.id}`}
							className="text-white max-h-[4rem] border-b-[1px] border-white text-center py-4 hover:cursor-pointer hover:underline"
						>
							{champion.name}
						</Link>
						<Link
							to={`https://mumbai.polygonscan.com/address/${champion.address}`}
							className="text-white max-h-[4rem] border-b-[1px] border-white text-center py-4 hover:cursor-pointer hover:underline"
						>
							{`${champion.address.slice(0, 4)}...${champion.address.slice(
								-4
							)}`}
						</Link>
						<span className="text-white max-h-[4rem] border-b-[1px] border-white text-center py-4">
							{champion.name}
						</span>
						<span className="text-white max-h-[4rem] border-b-[1px] border-white text-center py-4">
							{champion.name}
						</span>
						<span className="text-white max-h-[4rem] border-b-[1px] border-white text-center py-4">
							{champion.name}
						</span>
						<div className="flex items-center justify-center space-x-2 text-white max-h-[4rem] border-b-[1px] border-white py-1">
							<button className="bg-yagmi-aqua text-black px-3 py-1">
								Open
							</button>
							<button className="bg-[#FF6F61] text-black px-3 py-1">
								Cancel
							</button>
						</div>
					</Fragment>
				))}
			</div>
		</>
	);
}
