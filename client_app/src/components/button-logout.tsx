'use client';
import authApiRequest from '@/apiRequests/auth';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function ButtonLogOut() {
	const router = useRouter();
	const handleLogout = async () => {
		try {
			await authApiRequest.logoutFromClientToNextServer();
			router.push('/login');
		} catch {
			throw new Error('Error roi');
		}
	};
	return <Button onClick={handleLogout}>Logout</Button>;
}
