"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import LoadingButton from "@/components/loading-button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { authClient } from "@/lib/auth-client";
import { useToast } from "@/hooks/useToast";
import { forgotPasswordSchema } from "@/lib/zod";
import Link from "next/link";

export default function ForgotPassword() {
	const { toast } = useToast();
	const [isPending, setIsPending] = useState(false);

	const form = useForm<z.infer<typeof forgotPasswordSchema>>({
		resolver: zodResolver(forgotPasswordSchema),
		defaultValues: {
			email: "",
		},
	});

	const onSubmit = async (data: z.infer<typeof forgotPasswordSchema>) => {
		setIsPending(true);
		const { error } = await authClient.forgetPassword({
			email: data.email,
			redirectTo: "/reset-password",
		});

		if (error) {
			toast({
				title: "Error",
				description: error.message,
				variant: "error",
			});
		} else {
			toast({
				title: "Success",
				description:
					"If an account exists with this email, you will receive a password reset link.",
			});
		}
		setIsPending(false);
	};

	return (
		<div className="grow flex items-center justify-center p-4 bg-slate-50">
			<Card className="w-full max-w-md bg-white">
				<CardHeader>
					<CardTitle className="text-3xl font-bold text-center text-gray-800">
						Forgot Password
					</CardTitle>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input
												type="email"
												placeholder="Enter your email"
												{...field}
												autoComplete="email"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<LoadingButton pending={isPending}>Send Reset Link</LoadingButton>
						</form>
					</Form>
					<div className="mt-4 text-start text-sm">
						Back to <Link href="/sign-in" className="text-blue-600 hover:underline">
							login
						</Link>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}