import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Menu, Transition } from '@headlessui/react';
import { useContext, Fragment } from 'react';
import SessionContext from '../../context/user-session';
import { Link, useLocation } from 'react-router-dom';

export default function CustomConnect() {
	const session = useContext(SessionContext);
	const location = useLocation();

	return (
		<ConnectButton.Custom>
			{({
				account,
				chain,
				openChainModal,
				openConnectModal,
				authenticationStatus,
				mounted,
			}) => {
				// Note: If your app doesn't use authentication, you
				// can remove all 'authenticationStatus' checks
				const ready = mounted && authenticationStatus !== 'loading';
				const connected =
					ready &&
					account &&
					chain &&
					(!authenticationStatus || authenticationStatus === 'authenticated');

				return (
					<div
						{...(!ready && {
							'aria-hidden': true,
							style: {
								opacity: 0,
								pointerEvents: 'none',
								userSelect: 'none',
							},
						})}
					>
						{(() => {
							if (!connected) {
								return (
									<button
										onClick={openConnectModal}
										type="button"
										className="font-medium border-black border-[1px] rounded-lg px-3 py-0.5 text-lg bg-white"
									>
										Connect Wallet
									</button>
								);
							}

							if (chain.unsupported) {
								return (
									<button
										onClick={openChainModal}
										type="button"
										className="font-medium border-black border-[1px] rounded-lg px-3 py-0.5 text-lg bg-white"
									>
										{String.fromCodePoint(0x270b)} Wrong network
									</button>
								);
							}

							return (
								<div style={{ display: 'flex', gap: 12 }}>
									<button
										onClick={openChainModal}
										style={{ display: 'flex', alignItems: 'center' }}
										type="button"
									>
										{chain.hasIcon && (
											<div
												style={{
													background: chain.iconBackground,
													width: 24,
													height: 24,
													borderRadius: 999,
													overflow: 'hidden',
												}}
											>
												{chain.iconUrl && (
													<img
														alt={chain.name ?? 'Chain icon'}
														src={chain.iconUrl}
														style={{ width: 24, height: 24 }}
													/>
												)}
											</div>
										)}
									</button>

									<Menu as="div" className="relative">
										<Menu.Button className="font-medium border-black border-[1px] rounded-lg px-3 py-0.5 text-lg bg-white">
											{account.displayName}
										</Menu.Button>
										<Transition
											as={Fragment}
											enter="transition ease-out duration-100"
											enterFrom="transform opacity-0 scale-95"
											enterTo="transform opacity-100 scale-100"
											leave="transition ease-in duration-75"
											leaveFrom="transform opacity-100 scale-100"
											leaveTo="transform opacity-0 scale-95"
										>
											<Menu.Items className="absolute bg-white mt-5 px-3 py-1 rounded-md min-w-[8.3rem]">
												{!location.pathname.includes('profile') && (
													<Menu.Item>
														{({ active }) => (
															<Link
																to={`profile/${session?.userId}`}
																className={`${
																	active
																		? 'text-lg hover:font-medium'
																		: 'text-lg'
																}`}
															>
																Profile
															</Link>
														)}
													</Menu.Item>
												)}
												<Menu.Item>
													{({ active }) => (
														<button
															className={`${
																active
																	? 'text-lg text-red-600 hover:font-medium'
																	: 'text-lg text-red-600'
															}`}
															onClick={session?.disconnect}
														>
															Disconnect
														</button>
													)}
												</Menu.Item>
											</Menu.Items>
										</Transition>
									</Menu>
								</div>
							);
						})()}
					</div>
				);
			}}
		</ConnectButton.Custom>
	);
}
