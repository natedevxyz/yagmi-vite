import ConnectButton from '../components/Header/ConnectWallet';
import { useContext } from 'react';
import SessionContext from '../context/user-session';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
	const session = useContext(SessionContext);
	const location = useLocation();

	return (
		<header
			className={
				'flex justify-between items-center bg-white rounded-2xl border-[1px] border-black mt-10 mb-5 w-[80%] py-3 px-5'
			}
		>
			<h3 className="text-2xl font-chromate ml-1">YAGMI</h3>
			<div className="flex items-center">
				{session?.isLoggedIn && !location.pathname.includes('profile') && (
					<Link
						to={`profile/${session.userId}`}
						className="mr-3 text-lg hover:underline font-medium"
					>
						Profile
					</Link>
				)}
				<ConnectButton />
			</div>
		</header>
	);
}
