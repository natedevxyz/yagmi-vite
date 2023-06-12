import { Fragment, useContext, useEffect, useState } from 'react';
import SessionContext from '../context/user-session';
import { ActionButton, Loading } from '../components';
import { Link, useLoaderData } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { Dialog } from '@headlessui/react';
import { useForm } from 'react-hook-form';
import { useContractWrite, useContractRead } from 'wagmi';
import yagmiControllerAbi from '../utils/yagmiControllerAbi.json';
import { supabaseClient } from '../utils';

const contractAddress = '0xe095c1dF9Ac9C5531A9be4824B88A0327191e42F';
const erc20Address = '0x6826E9F211D3EfA2520561Ba9773F07B1488e8DE';

export default function Dashboard() {
	const session = useContext(SessionContext);
	const query = useLoaderData() as any;
	const [modalOpen, setModalOpen] = useState(false);
	const { register, handleSubmit, reset, formState } = useForm({
		defaultValues: {
			championAddress: '',
			nftSupply: '',
			apy: '',
			installments: '',
			nftPrice: '',
			gracePeriod: '',
			championName: '',
			avatarUrl: '',
			championBio: '',
			championEns: '',
		},
	});

	const { data: tokenId } = useContractRead({
		address: contractAddress,
		abi: yagmiControllerAbi,
		functionName: 'currentId',
	});

	const { isLoading: isLoadingPropose, write: writePropose } = useContractWrite(
		{
			address: contractAddress,
			abi: yagmiControllerAbi,
			functionName: 'proposeChampion',
		}
	);

	const { isLoading: isLoadingOpen, write: writeOpen } = useContractWrite({
		address: contractAddress,
		abi: yagmiControllerAbi,
		functionName: 'openMint',
	});

	const { isLoading: isLoadingCancel, write: writeCancel } = useContractWrite({
		address: contractAddress,
		abi: yagmiControllerAbi,
		functionName: 'cancelSponsorship',
	});

	const { isLoading: isLoadingClaim, write: writeClaim } = useContractWrite({
		address: contractAddress,
		abi: yagmiControllerAbi,
		functionName: 'claimDeposit',
	});

	const onSubmit = async (data: any) => {
		writePropose({
			args: [
				data.championAddress,
				data.nftSupply,
				(data.apy * 1000000).toString(),
				'30',
				data.installments,
				(data.nftPrice * 1000000000000000000).toString(),
				erc20Address,
				data.gracePeriod,
				'30',
			],
		});

		const championData = (await supabaseClient
			.from('champions')
			.insert({
				name: data.championName,
				dao: 1,
				avatar_url: data.avatarUrl,
				address: data.championAddress,
				bio: data.championBio,
				ens: data.championEns,
				token_id: Number(tokenId).toString(),
				total_nfts: data.nftSupply,
				nft_price: data.nftPrice,
				apy: data.apy,
			})
			.select()) as any;

		await supabaseClient.from('achievements').insert({
			title: 'Placeholder Title',
			description: 'Placeholder description',
			image_url:
				'https://cdn.dribbble.com/userupload/3640061/file/original-210dc6cee62c8b794c8d7c6c52c0aac5.png?compress=1&resize=1200x900',
			tags: ['Design', 'UI/UX'],
			champion_id: championData.data[0].id.toString(),
		});

		await supabaseClient.from('milestones').insert({
			champion_id: championData.data[0].id.toString(),
			title: 'Placeholder Milestone',
			deadline: new Date(2023, 12, 31).toISOString(),
		});
	};

	useEffect(() => {
		if (formState.isSubmitSuccessful) {
			reset();
		}
	}, [formState, reset]);

	if (session?.isLoading) {
		return <Loading dimensions="min-h-[50vh]" className="w-12 h-12" />;
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
								Champion Proposal
							</Dialog.Title>
							<form
								onSubmit={handleSubmit(onSubmit)}
								className="flex flex-col space-y-2"
							>
								<div className="flex justify-between">
									<h4 className="text-white mr-3">Champion Address</h4>
									<input
										{...register('championAddress', { required: true })}
										className="rounded-sm min-w-[26rem] pl-1"
									/>
								</div>
								<div className="flex justify-between">
									<h4 className="text-white mr-3">NFT Supply</h4>
									<input
										type="number"
										{...register('nftSupply', { required: true, min: 1 })}
										className="rounded-sm max-w-[4rem] text-center"
									/>
								</div>
								<div className="flex justify-between">
									<h4 className="text-white mr-3">APY</h4>
									<input
										type="number"
										{...register('apy', { required: true, min: 0, max: 100 })}
										className="rounded-sm max-w-[4rem] text-center"
									/>
								</div>
								<div className="flex justify-between">
									<h4 className="text-white mr-3">Number of installments</h4>
									<input
										type="number"
										{...register('installments', { required: true, min: 1 })}
										className="rounded-sm max-w-[4rem] text-center"
									/>
								</div>
								<div className="flex justify-between">
									<h4 className="text-white mr-3">Price of each NFT</h4>
									<input
										type="number"
										{...register('nftPrice', { required: true, min: 10 })}
										className="rounded-sm max-w-[4rem] text-center"
									/>
								</div>
								<div className="flex justify-between">
									<h4 className="text-white mr-3">Grace period (days)</h4>
									<input
										type="number"
										{...register('gracePeriod', {
											required: true,
											min: 0,
											max: 365,
										})}
										className="rounded-sm max-w-[4rem] text-center"
									/>
								</div>
								<div className="flex justify-between">
									<h4 className="text-white mr-3">Name</h4>
									<input
										{...register('championName', { required: true })}
										className="rounded-sm min-w-[26rem] pl-1"
									/>
								</div>
								<div className="flex justify-between">
									<h4 className="text-white mr-3">Avatar URL</h4>
									<input
										{...register('avatarUrl', { required: true })}
										className="rounded-sm min-w-[26rem] pl-1"
									/>
								</div>
								<div className="flex justify-between">
									<h4 className="text-white mr-3">Bio</h4>
									<input
										{...register('championBio', { required: true })}
										className="rounded-sm min-w-[26rem] pl-1"
									/>
								</div>
								<div className="flex justify-between">
									<h4 className="text-white mr-3">ENS</h4>
									<input
										{...register('championEns', { required: true })}
										className="rounded-sm min-w-[26rem] pl-1"
									/>
								</div>
								<input
									type="submit"
									className="bg-yagmi-pink py-1 px-8 text-lg font-medium border-black border-2 hover:cursor-pointer self-center"
								/>
							</form>
						</Dialog.Panel>
					</div>
				</Dialog>
			)}
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
					<ActionButton
						onClick={() => setModalOpen(true)}
						className="self-start px-7 py-1 text-lg mb-2"
					>
						{!isLoadingPropose ? (
							'Propose now'
						) : (
							<Loading dimensions="min-w-[7rem]" className="w-6 h-6" />
						)}
					</ActionButton>
				</div>
			</div>
			<h2 className="text-white font-chromate text-3xl self-start ml-[10%] mt-16 mb-10">
				Manage Champions
			</h2>
			<div className="grid grid-cols-7 content-start min-w-[80%] min-h-[40vh] border-[1px] border-white rounded-2xl pt-4 pb-9 px-4 justify-between mb-7">
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
					Token price
				</h3>
				<h3 className="text-white font-medium text-xl text-center border-b-[1px] border-white max-h-[4rem] mt-5 pb-5">
					APY
				</h3>
				<h3 className="text-white font-medium text-xl text-center border-b-[1px] border-white max-h-[4rem] mt-5 pb-5">
					Mint actions
				</h3>
				<h3 className="text-white font-medium text-xl text-center border-b-[1px] border-white max-h-[4rem] mt-5 pb-5">
					Deposit
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
							{champion.total_nfts}
						</span>
						<span className="text-white max-h-[4rem] border-b-[1px] border-white text-center py-4">
							{champion.nft_price}
						</span>
						<span className="text-white max-h-[4rem] border-b-[1px] border-white text-center py-4">
							{champion.apy}
						</span>
						<div className="flex items-center justify-center space-x-2 text-white max-h-[4rem] border-b-[1px] border-white py-1">
							<button
								onClick={() => writeOpen({ args: [champion.token_id] })}
								className="bg-yagmi-aqua text-black px-3 py-1"
							>
								{!isLoadingOpen ? (
									'Open'
								) : (
									<Loading dimensions="min-w-[2rem]" className="w-6 h-6" />
								)}
							</button>
							<button
								onClick={() => writeCancel({ args: [champion.token_id] })}
								className="bg-[#FF6F61] text-black px-3 py-1"
							>
								{!isLoadingCancel ? (
									'Cancel'
								) : (
									<Loading dimensions="min-w-[2rem]" className="w-6 h-6" />
								)}
							</button>
						</div>
						<div className="flex items-center justify-center space-x-2 text-white max-h-[4rem] border-b-[1px] border-white py-1">
							<button
								onClick={() => writeClaim({ args: [champion.token_id] })}
								className="bg-yagmi-pink text-black px-3 py-1"
							>
								{!isLoadingClaim ? (
									'Claim'
								) : (
									<Loading dimensions="min-w-[2rem]" className="w-6 h-6" />
								)}
							</button>
						</div>
					</Fragment>
				))}
			</div>
		</>
	);
}
