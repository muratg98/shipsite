import { redirect } from "next/navigation";
import SignUpForm from "./SignUpForm";
import { getCachedGlobal } from "@/utilities/getGlobals";
import type { Media } from "@/payload-types";
import type { Header } from '@/payload-types'
import { auth } from "@/lib/auth"
import { headers } from "next/headers"

export default async function SignInPage() {
  const response = await auth.api.getSession({
      headers: await headers(),
  });
  const user = response?.user ?? null;
  const session = response?.session ?? null;
  if (session || user) {
    redirect('/dashboard');
  }
  
  const headerData = (await getCachedGlobal('header', 1)()) as Header
  const media = headerData.Styles.media as Media;
  const enabledProviders = ["credentials", "magicLink", "google", "facebook"];

  return <SignUpForm authMethods={enabledProviders} media={media} />;
}
