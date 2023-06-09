import { Link, Navigate, useLoaderData } from 'react-router-dom';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { useContext, useState } from 'react';
import SessionContext from '../context/user-session';
import { Loading } from '../components';
import { useBalance } from 'wagmi';
import maticLogo from '../assets/icons/matic.svg';
import usdcLogo from '../assets/icons/usdc.svg';

export default function UserProfile() {
	const session = useContext(SessionContext);
	const [avatarLoaded, setAvatarLoaded] = useState(false);
	const collection = useLoaderData() as Array<any>;
	const { data: matic } = useBalance({
		address: session?.userAddress as `0x${string}`,
	});
	const { data: fusdc } = useBalance({
		address: session?.userAddress as `0x${string}`,
		token: '0x66288967c129D4D7b92294dA8d55fa58838dDd9A',
	});

	if (session?.isLoading) {
		return <Loading />;
	}

	if (!session?.isLoggedIn) {
		return <Navigate to="/" />;
	}

	return (
		<>
			<Link to="/marketplace" className="ml-[10%] self-start mb-4">
				<div className="flex items-center text-white text-lg hover:underline">
					<ArrowLeftIcon height="1rem" width="1rem" className="mr-1" />
					Back
				</div>
			</Link>
			<div className="flex min-w-[80%] mb-7">
				<div className="bg-yagmi-yellow w-[14rem] h-[14rem] rounded-xl p-4 overflow-hidden relative">
					<div className="w-full h-full rounded-xl bg-black">
						<img
							src={session.ensAvatar!}
							alt="ENS avatar"
							onLoad={() => setAvatarLoaded(true)}
							className={`w-full h-full rounded-xl object-cover ${
								!avatarLoaded && 'hidden'
							}`}
						/>
					</div>
					{session.ensName && (
						<span className="absolute bg-white bottom-5 left-1/2 transform -translate-x-1/2 font-medium pb-0.5 px-3 rounded-3xl border-black border-2">
							{session.ensName}
						</span>
					)}
				</div>
				<div className="flex flex-col ml-10">
					<h1 className="text-white font-chromate text-3xl mb-1">
						Your Wallet
					</h1>
					<span className="text-[#717171] text-lg">{session.userAddress}</span>
					<div className="flex items-center mt-4">
						<img src={maticLogo} alt="MATIC logo" className="w-5 h-5 mr-2" />
						<span className="text-white text-xl">
							{Number(matic?.formatted).toLocaleString('en', {
								minimumFractionDigits: 2,
								maximumFractionDigits: 2,
							})}{' '}
							<span className="text-[#717171]">MATIC</span>
						</span>
					</div>
					<div className="flex items-center mt-1">
						<img src={usdcLogo} alt="MATIC logo" className="w-5 h-5 mr-2" />
						<span className="text-white text-xl">
							{Number(fusdc?.formatted).toLocaleString('en', {
								minimumFractionDigits: 2,
								maximumFractionDigits: 2,
							})}{' '}
							<span className="text-[#717171]">fUSDC</span>
						</span>
					</div>
				</div>
			</div>
			<div className="flex flex-col min-w-[80%] min-h-[40vh] border-[1px] border-white rounded-2xl p-4">
				<h2 className="text-4xl text-white self-end mr-4">My NFTs</h2>
				<div className="flex justify-between">
					{collection.length > 0 ? (
						<>
							<div className="flex space-x-4 mt-2">
								{collection.slice(0, 4).map((nft: any) => (
									<div key={nft.id.tokenId}>
										<img
											src={nft.media[0].gateway}
											className="max-h-[30vh] rounded-xl"
										/>
									</div>
								))}
							</div>
							<div className="flex flex-col justify-end">
								<button className="text-white flex items-center mr-4">
									See all
									<ArrowRightIcon width="1rem" height="1rem" className="ml-1" />
								</button>
							</div>
						</>
					) : (
						<div className="flex flex-col mt-10 ml-4">
							<h3 className="text-[#717171] text-3xl font-medium mb-1">
								Nothing here yet...
							</h3>
							<h3 className="text-[#717171] text-3xl font-medium mb-1">
								Support a champion now!
							</h3>
							<Link to="/" className="self-start">
								<div className="flex items-center text-yagmi-pink hover:underline mt-1">
									Go to marketplace
									<ArrowRightIcon
										height="1.2rem"
										width="1.2rem"
										className="ml-1 pt-0.5"
									/>
								</div>
							</Link>
						</div>
					)}
				</div>
			</div>
		</>
	);
}
