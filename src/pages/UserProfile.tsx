import { Link, Navigate, useLoaderData } from 'react-router-dom';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { useContext, useState } from 'react';
import SessionContext from '../context/user-session';
import { Loading } from '../components';

export default function UserProfile() {
	const session = useContext(SessionContext);
	const [avatarLoaded, setAvatarLoaded] = useState(false);
	const collection = useLoaderData() as Array<any>;

	if (session?.isLoading) {
		return <Loading />;
	}

	if (!session?.isLoggedIn) {
		return <Navigate to="/" />;
	}

	return (
		<>
			<Link to="/" className="ml-[10%] self-start mb-4">
				<div className="flex items-center text-white text-lg hover:underline">
					<ArrowLeftIcon height="1rem" width="1rem" className="mr-1" />
					Back
				</div>
			</Link>
			<div className="min-w-[80%]">
				<div className="bg-yagmi-yellow w-[14rem] h-[14rem] rounded-xl mb-7 p-4 overflow-hidden relative">
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
			</div>
			<div className="flex flex-col min-w-[80%] min-h-[40vh] border-[1px] border-white rounded-2xl py-4 px-8">
				<h2 className="text-4xl text-white self-end">My NFTs</h2>
				<div className="flex space-x-5 mt-2">
					{collection.length > 0 ? (
						collection.map((nft: any) => (
							<div key={nft.id.tokenId}>
								<img
									src={nft.media[0].gateway}
									className="max-h-[30vh] rounded-xl"
								/>
							</div>
						))
					) : (
						<div className="flex flex-col mt-10">
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
