import { notFound } from "next/navigation";
import SignUpForm from "./SignUpForm";
import { getCachedGlobal } from "@/utilities/getGlobals";
import type { Media } from "@/payload-types";
import type { Header } from '@/payload-types'

export default async function SignInPage() {
  const headerData = (await getCachedGlobal('header', 1)()) as Header
  const media = headerData.Styles.media as Media;
  const enabledProviders = ["credentials", "magicLink", "google", "facebook"];

  return <SignUpForm authMethods={enabledProviders} media={media} />;
}
