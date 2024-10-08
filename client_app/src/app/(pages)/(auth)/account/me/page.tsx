import React from 'react';
import { cookies } from 'next/headers';
import Profile from '@/app/(pages)/(auth)/account/me/profile';
import accountApiRequest from '@/apiRequests/account';

export default async function AccountPage() {
	const cookiesStore = cookies();
	const sessionTokean = cookiesStore.get('sessionToken');
	await accountApiRequest.me(sessionTokean?.value);
	return (
		<div>
			<Profile />
		</div>
	);
}
