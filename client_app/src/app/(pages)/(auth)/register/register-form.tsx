'use client';
import React from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RegisterBody, RegisterBodyType } from '@/schemaValidations/auth.schema';
import envConfig from '@/utils/config';

export default function RegisterForm() {
	// 1. Define your form.
	const form = useForm<RegisterBodyType>({
		resolver: zodResolver(RegisterBody),
		defaultValues: {
			name: '',
			email: '',
			password: '',
			confirmPassword: '',
		},
	});

	// 2. Define a submit handler.
	async function onSubmit(values: RegisterBodyType) {
		console.log(values);
		const result = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/auth/register`, {
			body: JSON.stringify(values),
			headers: {
				'Content-Type': 'application/json',
			},
			method: 'POST',
		}).then((res) => res.json());
		console.log(result);
	}

	return (
		<Form {...form}>
			<form
				noValidate
				onSubmit={form.handleSubmit(onSubmit)}
				className='space-y-8'>
				<FormField
					control={form.control}
					name='name'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Username</FormLabel>
							<FormControl>
								<Input
									placeholder='Enter your name'
									{...field}
								/>
							</FormControl>
							{/* <FormDescription></FormDescription> */}
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='email'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input
									type='email'
									placeholder='Enter your email'
									{...field}
								/>
							</FormControl>
							{/* <FormDescription></FormDescription> */}
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='password'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input
									type='password'
									placeholder='Enter your password'
									{...field}
								/>
							</FormControl>
							{/* <FormDescription></FormDescription> */}
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='confirmPassword'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Confirm password</FormLabel>
							<FormControl>
								<Input
									type='password'
									placeholder='Confirm password'
									{...field}
								/>
							</FormControl>
							{/* <FormDescription></FormDescription> */}
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button
					className='w-full !mt-14'
					type='submit'>
					Register account
				</Button>
			</form>
		</Form>
	);
}
