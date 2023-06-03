import { Link, Navigate, useLoaderData } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useContext } from 'react';
import SessionContext from '../context/user-session';
import { Loading } from '../components';

interface Data {
	championData: any;
	championMilestones: any;
}

export default function ChampionProfile() {
	const session = useContext(SessionContext);
	const data = useLoaderData() as Data;

	console.log(data);

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
					<div className="w-full h-full rounded-xl bg-black"></div>
					<span className="absolute bg-white bottom-5 left-1/2 transform -translate-x-1/2 font-medium pb-0.5 px-3 rounded-3xl border-black border-2"></span>
				</div>
			</div>
		</>
	);
}
