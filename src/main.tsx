import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Home, UserProfile } from './pages';
import { Header } from './components';
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { polygonMumbai } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { SessionContextProvider } from './context/user-session';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';

const projectId = import.meta.env.VITE_PROJECT_ID;

const { chains, publicClient } = configureChains(
	[polygonMumbai],
	[
		alchemyProvider({ apiKey: import.meta.env.VITE_ALCHEMY_KEY }),
		publicProvider(),
	]
);

const { connectors } = getDefaultWallets({
	appName: 'yagmi',
	projectId: projectId,
	chains,
});

const wagmiConfig = createConfig({
	autoConnect: true,
	connectors,
	publicClient,
});

const router = createBrowserRouter([
	{
		path: '/',
		element: <Root />,
		children: [
			{
				path: '/',
				element: <Home />,
			},
			{
				path: 'profile/:userId',
				element: <UserProfile />,
			},
		],
	},
]);

function Root() {
	return (
		<div className="flex flex-col items-center min-h-screen bg-[#1D1D1D]">
			<Header />
			<Outlet />
		</div>
	);
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<WagmiConfig config={wagmiConfig}>
			<RainbowKitProvider chains={chains}>
				<SessionContextProvider>
					<RouterProvider router={router} />
				</SessionContextProvider>
			</RainbowKitProvider>
		</WagmiConfig>
	</React.StrictMode>
);
