const apiKey = import.meta.env.VITE_ALCHEMY_KEY;

export default async function checkNftsByUser({
	userId,
}: {
	userId: string | undefined;
}) {
	let requestOptions = {
		method: 'GET',
		redirect: 'follow',
	} as RequestInit;

	const res = await fetch(
		`https://polygon-mumbai.g.alchemy.com/nft/v2/${apiKey}/getNFTs/?owner=${userId}`,
		requestOptions
	);

	return await res.json();
}
