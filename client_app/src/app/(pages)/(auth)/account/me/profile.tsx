'use client';
import { useAppContext } from '@/app/context/app-provider';
import envConfig from '@/utils/config';
import React, { useEffect } from 'react';

export default function Profile() {
	const { sessionToken } = useAppContext();

	useEffect(() => {
		const fetchRequest = async () => {
			const request = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/account/me`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${sessionToken}`,
				},
			}).then((res) => res.json());
			console.log(request);
		};
		fetchRequest();
	}, [sessionToken]);
	return <div>Profile</div>;
}
