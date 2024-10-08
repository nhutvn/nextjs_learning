'use client';
import { clientSessionToken } from '@/utils/http';
import React, { useState } from 'react';

export default function AppProvider({
	children,
	initSessionToken,
}: {
	children: React.ReactNode;
	initSessionToken: string;
}) {
	useState(() => {
		if (typeof window != 'undefined') {
			clientSessionToken.value = initSessionToken;
		}
	});
	return children;
}
