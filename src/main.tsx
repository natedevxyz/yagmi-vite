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
import {
	createBrowserRouter,
	RouterProvider,
	Outlet,
	LoaderFunctionArgs,
} from 'react-router-dom';
import { checkNftsByUser } from './utils';

const apiKey = import.meta.env.VITE_ALCHEMY_KEY;
const projectId = import.meta.env.VITE_PROJECT_ID;

const { chains, publicClient } = configureChains(
	[polygonMumbai],
	[alchemyProvider({ apiKey: apiKey }), publicProvider()]
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
				loader: async ({ params }: LoaderFunctionArgs) => {
					const nfts = await checkNftsByUser({ userId: params.userId });

					const collection = nfts.result.assets.filter(
						(nft: any) =>
							nft.collectionAddress ==
							'0x5066c0934632bcc2902d139d7c875cbd295429f8'
					);

					return collection;
				},
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
