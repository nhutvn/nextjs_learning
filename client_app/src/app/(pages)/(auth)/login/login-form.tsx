'use client';
import React, { useState } from 'react';

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
import authApiRequest from '@/apiRequests/auth';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
	const { toast } = useToast();
	const router = useRouter();
	const [loading, setLoading] = useState(false);

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
		try {
			if (loading) return;
			setLoading(true);
			const resData = await authApiRequest.login(values);
			if (resData) {
				// call api server set cookie for next server
				// set context save token for next client => improve in http file
				await authApiRequest.auth({ sessionToken: resData.payload.data.token });
				toast({
					description: 'Login success',
				});
				router.push('/account/me');
			}
		} catch {
			toast({
				title: 'Login fail',
				description: 'Wrong email or password ! Please check ',
				variant: 'destructive',
				duration: 2000,
			});
		} finally {
			setLoading(true);
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
