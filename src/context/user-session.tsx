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
	userAddress: string;
	ensName: string | null;
	ensAvatar: string | null;
	disconnect: () => void;
	isLoading: boolean;
}

const SessionContext = createContext<SessionContextType | null>(null);

export function SessionContextProvider({ children }: { children: ReactNode }) {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [userAddress, setUserAddress] = useState('');
	const [ensName, setEnsName] = useState<string | null>('');
	const [ensAvatar, setEnsAvatar] = useState<string | null>('');
	const [isLoading, setIsLoading] = useState(true);

	const { address } = useAccount({
		onDisconnect() {
			setIsLoggedIn(false);
			setUserAddress('');
			setEnsName('');
			setEnsAvatar('');
		},
	});

	const { disconnect } = useDisconnect();

	useEffect(() => {
		if (address) {
			setIsLoggedIn(true);
			setUserAddress(address);

			const fetchEnsName = async () => {
				try {
					const ensNameResponse: string | null = await client.getEnsName({
						address,
					});
					setEnsName(ensNameResponse);
					return ensNameResponse;
				} catch (error) {
					console.error('Failed to get ENS name:', error);
				}
			};

			const fetchEnsAvatar = async (ensName: string | null) => {
				if (ensName) {
					try {
						const ensAvatarResponse: string | null = await client.getEnsAvatar({
							name: ensName,
						});
						setEnsAvatar(ensAvatarResponse);
					} catch (error) {
						console.error('Failed to get ENS avatar:', error);
					}
				}
			};

			fetchEnsName().then(ensNameResponse => {
				fetchEnsAvatar(ensNameResponse!).finally(() => {
					setIsLoading(false);
				});
			});
		} else {
			setIsLoggedIn(false);
			setUserAddress('');
			setEnsName('');
			setEnsAvatar('');
			setIsLoading(false);
		}
	}, [address]);

	return (
		<SessionContext.Provider
			value={{
				isLoggedIn,
				userAddress,
				ensName,
				ensAvatar,
				disconnect,
				isLoading,
			}}
		>
			{children}
		</SessionContext.Provider>
	);
}

export default SessionContext;
