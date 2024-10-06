export async function POST(request: Request) {
	const res = await request.json();
	const sessionToken = res.data.token;
	console.log('sesstion token is:', sessionToken);

	if (!sessionToken) {
		return Response.json(
			{
				message: 'Cannot recieve token !!!',
			},
			{ status: 400 },
		);
	}
	// set cookie
	return Response.json(
		{ res },
		{
			status: 200,
			headers: {
				'Set-Cookie': `sessionToken=${sessionToken}; Path=/; HttpOnly`,
			},
		},
	);
}
