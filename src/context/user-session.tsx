import { createContext, useState, useEffect, ReactNode } from 'react';
import { useAccount, useDisconnect } from 'wagmi';
import { createPublicClient, http } from 'viem';
import { mainnet } from 'viem/chains';

const client = createPublicClient({
	chain: mainnet,
	transport: http(),
});

interface SessionContextType {
	isLoggedIn: boolean;
	userId: string;
	ensName: string;
	ensAvatar: string;
	disconnect: () => void;
}

const SessionContext = createContext<SessionContextType | null>(null);

export function SessionContextProvider({ children }: { children: ReactNode }) {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [userId, setUserId] = useState('');
	const [ensName, setEnsName] = useState('');
	const [ensAvatar, setEnsAvatar] = useState('');

	const { address } = useAccount({
		onDisconnect() {
			setIsLoggedIn(false);
			setUserId('');
			setEnsName('');
			setEnsAvatar('');
		},
	});

	const { disconnect } = useDisconnect();

	useEffect(() => {
		if (address) {
			setIsLoggedIn(true);
			setUserId(address);
			client
				.getEnsName({
					address,
				})
				.then(ensName => {
					if (ensName) {
						setEnsName(ensName);
						client
							.getEnsAvatar({
								name: ensName,
							})
							.then(ensAvatar => {
								if (ensAvatar) {
									setEnsAvatar(ensAvatar);
								}
							});
					}
				});
		}
	}, [address]);

	return (
		<SessionContext.Provider
			value={{
				isLoggedIn,
				userId,
				ensName,
				ensAvatar,
				disconnect,
			}}
		>
			{children}
		</SessionContext.Provider>
	);
}

export default SessionContext;
