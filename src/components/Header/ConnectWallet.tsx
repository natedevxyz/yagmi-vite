import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function CustomConnect() {
	return (
		<ConnectButton.Custom>
			{({
				account,
				chain,
				openAccountModal,
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
										className="font-work font-medium border-black border-[1px] rounded-lg px-4 py-1 text-white bg-black"
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
										className="font-work font-medium border-black border-[1px] rounded-lg px-4 py-1 text-white bg-black"
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

									<button
										onClick={openAccountModal}
										type="button"
										className="font-work font-medium border-black border-[1px] rounded-lg px-4 py-1 text-white bg-black"
									>
										{account.displayName}
									</button>
								</div>
							);
						})()}
					</div>
				);
			}}
		</ConnectButton.Custom>
	);
}
