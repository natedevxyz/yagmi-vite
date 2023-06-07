import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { ChampionProfile, Home, UserProfile, Marketplace } from './pages';
import { Header, Loading } from './components';
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
	useNavigation,
} from 'react-router-dom';
import { checkNftsByUser, supabaseClient } from './utils';

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
				path: 'profile/:userAddress',
				element: <UserProfile />,
				loader: async ({ params }: LoaderFunctionArgs) => {
					const nfts = await checkNftsByUser({
						userAddress: params.userAddress,
					});

					const collection = nfts.ownedNfts.filter(
						(nft: any) =>
							nft.contract.address ==
							'0x7582177f9e536ab0b6c721e11f383c326f2ad1d5'
					);

					return collection;
				},
			},
			{
				path: 'marketplace',
				element: <Marketplace />,
				loader: async () => {
					const daos = await supabaseClient.from('daos').select(`
					id,
					name,
					address,
					description,
					website_url,
					logo_url,
					champions(id, name, avatar_url)
					`);

					return daos;
				},
			},
			{
				path: 'marketplace/:championId',
				element: <ChampionProfile />,
				loader: async ({ params }: LoaderFunctionArgs) => {
					const championData = await supabaseClient
						.from('champions')
						.select()
						.eq('id', params.championId);

					const championMilestones = await supabaseClient
						.from('milestones')
						.select()
						.eq('champion_id', params.championId)
						.order('deadline', { ascending: true });

					const championAchievement = await supabaseClient
						.from('achievements')
						.select()
						.eq('champion_id', params.championId);

					return { championData, championMilestones, championAchievement };
				},
			},
		],
	},
]);

function Root() {
	const navigation = useNavigation();

	return (
		<div className="flex flex-col items-center min-h-screen bg-[#1D1D1D]">
			<Header />
			{navigation.state === 'loading' ? <Loading /> : <Outlet />}
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
