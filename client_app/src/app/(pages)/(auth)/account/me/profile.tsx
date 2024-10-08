'use client';
import accountApiRequest from '@/apiRequests/account';
import React, { useEffect } from 'react';

export default function Profile() {
	useEffect(() => {
		const fetchRequest = async () => {
			const request = await accountApiRequest.meClient();
			console.log(request);
		};
		fetchRequest();
	});
	return <div>Profile</div>;
}
