import { createContext, useState, useEffect, ReactNode } from 'react';
import { useAccount } from 'wagmi';

const SessionContext = createContext({
	isLoggedIn: false,
});

export function SessionContextProvider({ children }: { children: ReactNode }) {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const { address } = useAccount({
		onDisconnect() {
			setIsLoggedIn(false);
		},
	});

	useEffect(() => {
		if (address) {
			setIsLoggedIn(true);
		}
	}, [address]);

	return (
		<SessionContext.Provider value={{ isLoggedIn: isLoggedIn }}>
			{children}
		</SessionContext.Provider>
	);
}

export default SessionContext;
