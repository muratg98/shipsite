"use client";

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
import { signInSchema } from "@/lib/zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import Link from "next/link";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/useToast";
import { ReactNode } from "react";
import {
  FaGithub,
  FaGoogle,
  FaFacebook,
  FaMicrosoft,
  FaTwitter,
  FaLinkedin,
  FaReddit,
  FaDiscord,
} from "react-icons/fa";
import type { Media as MediaType} from "@/payload-types";
import { Media } from "@/components/Media";

const validProviders = [
  "github",
  "google",
  "facebook",
  "microsoft",
  "twitter",
  "linkedin",
  "reddit",
  "discord",
  "apple",
  "spotify",
  "twitch",
  "dropbox",
  "gitlab",
] as const;

const authIcons: Record<string, ReactNode> = {
  github: <FaGithub className="w-5 h-5 mr-2" />,
  google: <FaGoogle className="w-5 h-5 mr-2" />,
  facebook: <FaFacebook className="w-5 h-5 mr-2" />,
  microsoft: <FaMicrosoft className="w-5 h-5 mr-2" />,
  twitter: <FaTwitter className="w-5 h-5 mr-2" />,
  linkedin: <FaLinkedin className="w-5 h-5 mr-2" />,
  reddit: <FaReddit className="w-5 h-5 mr-2" />,
  discord: <FaDiscord className="w-5 h-5 mr-2" />,
};

export default function SignUpForm({ authMethods, media }: { authMethods: string[], media: MediaType }) {
  const router = useRouter();
  const { toast } = useToast();
  const [pending, setPending] = useState<Record<string, boolean>>({});
  const [showPasswordField, setShowPasswordField] = useState(false); // Track password visibility

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleCredentialsSignIn = async (values: z.infer<typeof signInSchema>) => {
    const callbackURL = process.env.CALLBACK_URL ?? "/";
    await authClient.signUp.email(
      { email: values.email, password: values.password, name: values.email, callbackURL: callbackURL },
      {
        onRequest: () => setPending((prev) => ({ ...prev, credentials: true })),
        onError: (ctx) => {
          toast({
            title: "Something went wrong",
            description: ctx.error.message ?? "Something went wrong.",
            variant: "error",
          });
        },
      }
    );
    setPending((prev) => ({ ...prev, credentials: false }));
  };

  const handleMagicLinkSignIn = async (email: string) => {
    await authClient.signIn.magicLink(
      { email, callbackURL: process.env.CALLBACK_URL },
      {
        onRequest: () => setPending((prev) => ({ ...prev, magicLink: true })),
        onSuccess: async () => {
          toast({
            title: "Check your inbox!",
            description: "We've sent you a magic link. Please check your email.",
          });
        },
        onError: (ctx) => {
          toast({
            title: "Something went wrong",
            description: ctx.error.message ?? "Something went wrong.",
            variant: "error",
          });
        },
      }
    );
    setPending((prev) => ({ ...prev, magicLink: false }));
  };

  const handleSocialSignIn = async (provider: (typeof validProviders)[number]) => {
    await authClient.signIn.social(
      { provider },
      {
        onRequest: () => setPending((prev) => ({ ...prev, [provider]: true })),
        onSuccess: async () => {
          router.push("/");
          router.refresh();
        },
        onError: (ctx) => {
          toast({
            title: "Something went wrong",
            description: ctx.error.message ?? "Something went wrong.",
            variant: "error",
          });
        },
      }
    );
    setPending((prev) => ({ ...prev, [provider]: false }));
  };

  return (
    <div className="grow flex flex-col items-center justify-center p-4 bg-slate-50 py-32">
      {media && (
        <a href="/" className="mb-8"><Media resource={media} className="w-32 mx-auto shadow-xl"/></a>
      )}
      <Card className="w-full max-w-md bg-white shadow-xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-gray-800">
            Sign Up
          </CardTitle>
        </CardHeader>
        <CardContent>
          {authMethods.includes("credentials") || authMethods.includes("magicLink") ? (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit((values) =>
                  showPasswordField
                    ? handleCredentialsSignIn(values)
                    : handleMagicLinkSignIn(values.email)
                )}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field: fieldProps }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter your email"
                          {...fieldProps}
                          autoComplete="email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {(showPasswordField && authMethods.includes("credentials") || (authMethods.includes("credentials") && !authMethods.includes("magicLink"))) && (
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field: fieldProps }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Enter your password"
                            {...fieldProps}
                            autoComplete="current-password"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                {showPasswordField && (
                  <LoadingButton pending={!!pending.credentials}>Sign up</LoadingButton>
                )}

                {!showPasswordField && authMethods.includes("magicLink") && (
                  <LoadingButton pending={!!pending.magicLink} onClick={() => handleMagicLinkSignIn(form.getValues().email)}>Send Magic Link</LoadingButton>
                )}

                {authMethods.includes("credentials") && authMethods.includes("magicLink") && (
                <button
                    type="button"
                    onClick={() => setShowPasswordField((prev) => !prev)}
                    className="text-sm text-primary hover:underline"
                >
                    {showPasswordField ? "Sign up with Magic Link" : "Sign up with Password"}
                </button>
                )}
              </form>
            </Form>
          ) : null}

            {(authMethods.includes("credentials") || authMethods.includes("magicLink")) && (
            <div className="my-4 flex items-center gap-4">
                <hr className="w-full border-gray-300" />
                <p className="text-sm text-gray-800 text-center">or</p>
                <hr className="w-full border-gray-300" />
            </div>
            )}

          {/* Render buttons for enabled social auth methods */}
          {authMethods
            .filter((method): method is (typeof validProviders)[number] => validProviders.includes(method as any)) // Ensure method is valid
            .map((method) => (
              <div key={method} className="mt-4">
                <LoadingButton
                  pending={!!pending[method]}
                  onClick={() => handleSocialSignIn(method)}
                >
                  {authIcons[method.toLowerCase()] || null}
                  Sign up with {method.charAt(0).toUpperCase() + method.slice(1)}
                </LoadingButton>
              </div>
            ))}

          <div className="mt-4 text-center text-sm">
            <Link href="/sign-in" className="text-primary hover:underline">
              Already got an account? Sign in here.
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
