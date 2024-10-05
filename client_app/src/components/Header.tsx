import { ModeToggle } from '@/components/mode-theme-toggle';
import React from 'react';

export default function Header() {
	return (
		<div className='flex justify-start align-middle space-x-5 space-y-3'>
			<div>
				<ModeToggle />
			</div>
			<div>Login</div>
			<div>Register</div>
			{/* <ul>
				<li>Login</li>
				<li>Register</li>
			</ul> */}
		</div>
	);
}
