import ConnectButton from '../components/Header/ConnectWallet';
import { Link } from 'react-router-dom';

export default function Header() {
	return (
		<header
			className={
				'flex justify-between items-center bg-white rounded-2xl border-[1px] border-black mt-10 mb-5 w-[80%] py-3 px-5'
			}
		>
			<Link to="/">
				<h3 className="text-2xl font-chromate ml-1">YAGMI</h3>
			</Link>
			<ConnectButton />
		</header>
	);
}
