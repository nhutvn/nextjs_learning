import envConfig from '@/utils/config';
import React from 'react';
import { cookies } from 'next/headers';
import Profile from '@/app/(pages)/(auth)/account/me/profile';

export default async function AccountPage() {
	const cookiesStore = cookies();
	const sessionToken = cookiesStore.get('sessionToken');
	const resNextServer = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/account/me`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${sessionToken?.value}`,
		},
	});

	const resData = await resNextServer.json();
	return (
		<div>
			Xin chao {resData.data.name}
			<Profile />
		</div>
	);
}
