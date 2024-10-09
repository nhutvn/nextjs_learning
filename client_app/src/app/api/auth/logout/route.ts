import authApiRequest from '@/apiRequests/auth';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
	const cookieStore = cookies();
	const sessionToken = cookieStore.get('sessionToken');
	console.log(request);
	if (!sessionToken) {
		return Response.json(
			{
				message: 'Cannot recieve token !!!',
			},
			{ status: 400 },
		);
	}
	try {
		await authApiRequest.logoutFromNextServerToServer(sessionToken.value);
		return Response.json(
			{
				message: 'ok',
			},
			{
				status: 200,
				headers: {
					'Set-Cookie': `sessionToken=; Path=/; HttpOnly; Max-Age=0`,
				},
			},
		);
	} catch {
		Response.json(
			{
				message: ' loi',
			},
			{
				status: 500,
			},
		);
	}
}
