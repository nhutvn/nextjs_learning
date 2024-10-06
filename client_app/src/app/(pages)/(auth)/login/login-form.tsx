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
import { LoginBody, LoginBodyType } from '@/schemaValidations/auth.schema';
import { useToast } from '@/hooks/use-toast';
import { useAppContext } from '@/app/context/app-provider';
import envConfig from '@/utils/config';

export default function LoginForm() {
	const { toast } = useToast();
	const { setSessionToken } = useAppContext();

	// 1. Define your form.
	const form = useForm<LoginBodyType>({
		resolver: zodResolver(LoginBody),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	// 2. Define a submit handler.
	async function onSubmit(values: LoginBodyType) {
		const result = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/auth/login`, {
			body: JSON.stringify(values),
			headers: {
				'Content-Type': 'application/json',
			},
			method: 'POST',
		});
		const resData = await result.json();
		if (result.ok) {
			// call api server set cookie for next server
			await fetch(`/api/auth`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(resData),
			});

			// set context save token for next client
			setSessionToken(resData.data.token);
			toast({
				description: 'Login success',
			});
		} else {
			toast({
				title: 'Login fail',
				description: 'Wrong email or password ! Please check ',
				variant: 'destructive',
				duration: 2000,
			});
		}
	}

	return (
		<Form {...form}>
			<form
				noValidate
				onSubmit={form.handleSubmit(onSubmit)}
				className='space-y-8'>
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
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button
					className='w-full !mt-14'
					type='submit'>
					Login
				</Button>
			</form>
		</Form>
	);
}
