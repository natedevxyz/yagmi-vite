const token = import.meta.env.VITE_QUICKNODE_TOKEN;

export default async function checkNftsByUser({
	userId,
}: {
	userId: string | undefined;
}) {
	let headers = new Headers();
	headers.append('Content-Type', 'application/json');

	let body = JSON.stringify({
		id: 67,
		jsonrpc: '2.0',
		method: 'qn_fetchNFTs',
		params: [
			{
				wallet: userId,
				page: 1,
				perPage: 10,
				contracts: ['0x5066C0934632BCc2902D139D7C875CBD295429f8'],
			},
		],
	});

	let requestOptions = {
		method: 'POST',
		headers: headers,
		body: body,
		redirect: 'follow',
	} as RequestInit;

	const res = await fetch(
		`https://powerful-dry-patron.matic.discover.quiknode.pro/${token}`,
		requestOptions
	);

	return await res.json();
}
