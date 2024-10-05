import React from 'react';
import RegisterForm from '@/app/(pages)/(auth)/register/register-form';

export default function RegisterPage() {
	return (
		<div>
			<div className='max-w-[400px] mx-auto'>
				<div className='text-3xl font-semibold'>Register form</div>
				<div className='mt-5'>
					<RegisterForm />
				</div>
			</div>
		</div>
	);
}
