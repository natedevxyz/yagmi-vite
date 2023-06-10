import { Link, useLoaderData } from 'react-router-dom';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { useContext, useState } from 'react';
import SessionContext from '../context/user-session';
import { Loading, ActionButton } from '../components';
import { Dialog } from '@headlessui/react';
import { useForm } from 'react-hook-form';
import { useContractWrite } from 'wagmi';
import yagmiControllerAbi from '../utils/yagmiControllerAbi.json';

interface Data {
	championData: any;
	championMilestones: any;
	championAchievement: any;
}

const contractAddress = '0x4274e51D378f84B578b17c4c51732fba2f2Ff676';

export default function ChampionProfile() {
	const session = useContext(SessionContext);
	const query = useLoaderData() as Data;
	const [modalOpen, setModalOpen] = useState(false);
	const { register, handleSubmit } = useForm();

	const { isLoading: isLoadingMint, write: writeMint } = useContractWrite({
		address: contractAddress,
		abi: yagmiControllerAbi,
		functionName: 'mint',
	});

	const { isLoading: isLoadingBurn, write: writeBurn } = useContractWrite({
		address: contractAddress,
		abi: yagmiControllerAbi,
		functionName: 'burnToRecover',
	});

	const onSubmit = (data: any) => {
		writeMint({
			args: [query.championData.data[0].token_id, data.amount],
		});
	};

	if (session?.isLoading) {
		return <Loading className="w-12 h-12" dimensions="min-h-[50vh]" />;
	}

	return (
		<>
			{modalOpen && (
				<Dialog
					open={modalOpen}
					onClose={() => setModalOpen(false)}
					className="relative"
				>
					<div className="fixed inset-0 bg-black/30"></div>
					<div className="fixed inset-0 flex items-center justify-center p-4">
						<Dialog.Panel className="flex flex-col bg-yagmi-blue rounded-xl border-[1px] border-white p-10">
							<Dialog.Title className="text-white font-chromate text-5xl text-center mb-10">
								Buy {query.championData.data[0].name}'s NFT
							</Dialog.Title>
							<form
								onSubmit={handleSubmit(onSubmit)}
								className="flex flex-col space-y-2"
							>
								<div className="flex justify-between">
									<h4 className="text-white mr-3">Amount</h4>
									<input
										type="number"
										{...register('amount', {
											required: true,
											min: 0,
											max: Number(query.championData.data[0].total_nfts),
										})}
										className="rounded-sm max-w-[3rem] pl-1"
									/>
								</div>
								<h4 className="text-white mr-3 text-center">
									${query.championData.data[0].nft_price} each -{' '}
									{query.championData.data[0].apy}% APY
								</h4>
								<input
									type="submit"
									className="bg-yagmi-pink py-1 px-8 text-lg font-medium border-black border-2 hover:cursor-pointer self-center"
								/>
							</form>
						</Dialog.Panel>
					</div>
				</Dialog>
			)}
			<Link to="/marketplace" className="ml-[10%] self-start mb-4">
				<div className="flex items-center text-white text-lg hover:underline">
					<ArrowLeftIcon height="1rem" width="1rem" className="mr-1" />
					Back
				</div>
			</Link>
			<div className="flex w-[80%] mb-7">
				<div className="bg-yagmi-yellow min-w-[14rem] min-h-[14rem] max-w-[14rem] max-h-[14rem] rounded-xl p-4 overflow-hidden relative">
					<img
						src={query.championData.data[0].avatar_url}
						alt="Avatar"
						className="w-full h-full rounded-xl object-cover"
					/>
					<span className="absolute bg-white bottom-5 left-1/2 transform -translate-x-1/2 font-medium pb-0.5 px-3 rounded-3xl border-black border-2 whitespace-nowrap">
						{query.championData.data[0].name}
					</span>
				</div>
				<div className="flex flex-col w-full ml-10 justify-between">
					<div className="flex flex-col">
						<h1 className="text-white font-medium text-2xl mb-2">
							{query.championData.data[0].ens !== null
								? query.championData.data[0].ens
								: query.championData.data[0].address}
						</h1>
						<p className="text-[#717171] text-xl">
							{query.championData.data[0].bio}
						</p>
					</div>
					<div className="flex justify-between">
						<div className="flex">
							<a
								href={query.championData.data[0].linkedin_url}
								className="text-white flex items-center hover:cursor-pointer border-yagmi-pink border-2 rounded-lg px-3 py-0.5"
							>
								LinkedIn
								<ArrowRightIcon height="1rem" width="1rem" className="ml-2" />
							</a>
							<a
								href={query.championData.data[0].twitter_url}
								className="text-white flex items-center hover:cursor-pointer border-yagmi-pink border-2 rounded-lg px-3 py-0.5 ml-4"
							>
								Twitter
								<ArrowRightIcon height="1rem" width="1rem" className="ml-2" />
							</a>
						</div>
						<div className="flex">
							<ActionButton
								onClick={() => setModalOpen(true)}
								className="px-6 py-1 mr-6 mb-2"
							>
								{!isLoadingMint ? (
									'Buy NFT now!'
								) : (
									<Loading dimensions="min-w-[7rem]" className="w-6 h-6" />
								)}
							</ActionButton>
							<ActionButton
								onClick={() =>
									writeBurn({ args: [query.championData.data[0].token_id] })
								}
								className="px-6 py-1 mr-6 mb-2"
							>
								{!isLoadingBurn ? (
									'Burn and withdraw'
								) : (
									<Loading dimensions="min-w-[7rem]" className="w-6 h-6" />
								)}
							</ActionButton>
						</div>
					</div>
				</div>
			</div>
			<div className="flex min-w-[80%] min-h-[40vh] border-[1px] border-white rounded-2xl py-4 px-4 justify-between mb-7">
				<div className="flex w-full space-x-4">
					{query.championMilestones.data.map((milestone: any) => (
						<div
							key={milestone.id}
							className={`bg-white flex flex-col h-full w-[25%] p-4 rounded-lg justify-between ${
								milestone.completed === true && 'opacity-50'
							}`}
						>
							<h3 className="font-medium text-2xl">{milestone.title}</h3>
							<span className="font-medium">
								{new Date(milestone.deadline).toLocaleString('en-US', {
									day: 'numeric',
									month: 'long',
									year: 'numeric',
								})}
							</span>
						</div>
					))}
				</div>
				<div className="flex flex-col justify-between items-end">
					<h2 className="text-4xl text-white mr-4">Milestones</h2>
					<button className="text-white flex items-center mr-4">
						All milestones
						<ArrowRightIcon width="1rem" height="1rem" className="ml-1" />
					</button>
				</div>
			</div>
			<div className="flex w-[80%] h-[40vh] border-[1px] border-white rounded-2xl py-4 px-4 justify-between mb-7">
				<div className="flex flex-col m-4 justify-between">
					<div className="flex flex-col">
						<h2 className="text-4xl text-white font-semibold mb-2">
							{query.championAchievement.data[0].title}
						</h2>
						<p className="text-xl text-white pr-4">
							{query.championAchievement.data[0].description}
						</p>
					</div>
					<div className="flex space-x-2">
						{query.championAchievement.data[0].tags.map(
							(tag: any, index: number) => (
								<span
									key={`${tag}${index}`}
									className="bg-white font-medium pb-0.5 px-3 rounded-3xl border-black border-2"
								>
									{tag}
								</span>
							)
						)}
					</div>
				</div>
				<div className="min-w-[60%] min-h-full rounded-xl bg-black relative">
					<a
						href={undefined}
						className="bg-yagmi-pink absolute bottom-7 right-10 z-20 py-2 px-8 font-medium border-black border-2 hover:cursor-pointer"
					>
						Visit project
					</a>
					<img
						src={query.championAchievement.data[0].image_url}
						alt="Project banner"
						className="w-full h-full rounded-xl object-cover relative z-0"
					/>
				</div>
			</div>
		</>
	);
}
