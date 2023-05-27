import { createContext, useState, useEffect, ReactNode } from 'react';
import { useAccount } from 'wagmi';

const SessionContext = createContext({
	isLoggedIn: false,
	userId: '',
});

export function SessionContextProvider({ children }: { children: ReactNode }) {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [userId, setUserId] = useState('');
	const { address } = useAccount({
		onDisconnect() {
			setIsLoggedIn(false);
			setUserId('');
		},
	});

	useEffect(() => {
		if (address) {
			setIsLoggedIn(true);
			setUserId(address);
		}
	}, [address]);

	return (
		<SessionContext.Provider value={{ isLoggedIn: isLoggedIn, userId: userId }}>
			{children}
		</SessionContext.Provider>
	);
}

export default SessionContext;
