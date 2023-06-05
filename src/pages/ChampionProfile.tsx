import { Link, Navigate, useLoaderData } from 'react-router-dom';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { useContext, useState } from 'react';
import SessionContext from '../context/user-session';
import { Loading, ActionButton } from '../components';

interface Data {
	championData: any;
	championMilestones: any;
	championAchievement: any;
}

export default function ChampionProfile() {
	const session = useContext(SessionContext);
	const query = useLoaderData() as Data;
	const [avatarLoaded, setAvatarLoaded] = useState(false);
	const [bannerLoaded, setBannerLoaded] = useState(false);

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
			<div className="flex w-[80%] mb-7">
				<div className="bg-yagmi-yellow min-w-[14rem] min-h-[14rem] max-w-[14rem] max-h-[14rem] rounded-xl p-4 overflow-hidden relative">
					<div className="w-full h-full rounded-xl bg-black">
						<img
							src={query.championData.data[0].avatar_url}
							alt="Avatar"
							onLoad={() => setAvatarLoaded(true)}
							className={`w-full h-full rounded-xl object-cover ${
								!avatarLoaded && 'hidden'
							}`}
						/>
					</div>
					<span className="absolute bg-white bottom-5 left-1/2 transform -translate-x-1/2 font-medium pb-0.5 px-3 rounded-3xl border-black border-2">
						{query.championData.data[0].name}
					</span>
				</div>
				<div className="flex flex-col w-full ml-10 justify-between">
					<div className="flex flex-col">
						<h2 className="text-white font-medium text-2xl mb-2">
							{query.championData.data[0].ens !== null
								? query.championData.data[0].ens
								: query.championData.data[0].address}
						</h2>
						<p className="text-[#717171] text-xl">
							{query.championData.data[0].bio}
						</p>
					</div>
					<div className="flex justify-between">
						<div className="flex">
							<a
								href={query.championData.data[0].linkedin_url || '/'}
								className="text-white flex items-center hover:cursor-pointer border-yagmi-pink border-2 rounded-lg px-3 py-0.5"
							>
								LinkedIn
								<ArrowRightIcon height="1rem" width="1rem" className="ml-2" />
							</a>
							<a
								href={query.championData.data[0].twitter_url || '/'}
								className="text-white flex items-center hover:cursor-pointer border-yagmi-pink border-2 rounded-lg px-3 py-0.5 ml-4"
							>
								Twitter
								<ArrowRightIcon height="1rem" width="1rem" className="ml-2" />
							</a>
						</div>
						<ActionButton className="px-6 py-1 mr-4 mb-1">
							Buy NFT now!
						</ActionButton>
					</div>
				</div>
			</div>
			<div className="flex min-w-[80%] min-h-[40vh] border-[1px] border-white rounded-2xl py-4 px-4 justify-between mb-7">
				<div className="flex space-x-4">
					{query.championMilestones.data.map((milestone: any) => (
						<div
							key={milestone.id}
							className={`bg-white flex flex-col h-full w-[30%] p-4 rounded-lg justify-between ${
								milestone.completed === true && 'opacity-50'
							}`}
						>
							<h4 className="font-medium text-2xl">{milestone.title}</h4>
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
			<div className="flex min-w-[80%] h-[40vh] border-[1px] border-white rounded-2xl py-4 px-4 justify-between mb-7">
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
						{query.championAchievement.data[0].tags.map((tag: any) => (
							<span className="bg-white font-medium pb-0.5 px-3 rounded-3xl border-black border-2">
								{tag}
							</span>
						))}
					</div>
				</div>
				<div className="w-[75%] min-h-full rounded-xl bg-black relative">
					<a
						href=""
						className="bg-yagmi-pink absolute bottom-7 right-10 z-20 py-2 px-8 font-medium border-black border-2"
					>
						Visit project
					</a>
					<div className="w-full h-full bg-gradient-to-t from-black absolute rounded-xl z-10"></div>
					<img
						src={query.championAchievement.data[0].image_url}
						alt="Project banner"
						onLoad={() => setBannerLoaded(true)}
						className={`w-full h-full rounded-xl object-cover relative z-0 ${
							!bannerLoaded && 'hidden'
						}`}
					/>
				</div>
			</div>
		</>
	);
}
