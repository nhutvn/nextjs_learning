import LoginForm from '@/app/(pages)/(auth)/login/login-form';
import React from 'react';

export default function LoginPage() {
	return (
		<div>
			<div className='max-w-[400px] mx-auto'>
				<div className='text-3xl font-semibold'>Login page</div>
				<div className='mt-5'>
					<LoginForm />
				</div>
			</div>
		</div>
	);
}
