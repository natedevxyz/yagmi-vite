import { Link, Navigate } from 'react-router-dom';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { useContext } from 'react';
import SessionContext from '../context/user-session';

export default function UserProfile() {
	const session = useContext(SessionContext);

	if (!session.isLoggedIn) {
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
				<div className="bg-yagmi-yellow w-[14rem] h-[14rem] rounded-xl mb-7"></div>
			</div>
			<div className="flex flex-col min-w-[80%] min-h-[40vh] border-[1px] border-white rounded-2xl py-4 px-8">
				<h2 className="text-4xl text-white self-end">My NFTs</h2>
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
			</div>
		</>
	);
}
