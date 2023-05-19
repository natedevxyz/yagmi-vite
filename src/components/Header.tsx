import ConnectButton from '../components/Header/ConnectWallet';

export default function Header({ className }: { className?: string }) {
	return (
		<header
			className={`flex justify-between items-center bg-white rounded-2xl border-[1px] border-black my-10 w-full max-w-[80%] py-3 px-5 relative z-10 ${className}`}
		>
			<h3 className="text-2xl font-chromate ml-1">YAGMI</h3>
			<ConnectButton />
		</header>
	);
}
