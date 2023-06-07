const apiKey = import.meta.env.VITE_ALCHEMY_KEY;

export default async function checkNftsByUser({
	userAddress,
}: {
	userAddress: string | undefined;
}) {
	let requestOptions = {
		method: 'GET',
		redirect: 'follow',
	} as RequestInit;

	const res = await fetch(
		`https://polygon-mumbai.g.alchemy.com/nft/v2/${apiKey}/getNFTs/?owner=${userAddress}`,
		requestOptions
	);

	return await res.json();
}
