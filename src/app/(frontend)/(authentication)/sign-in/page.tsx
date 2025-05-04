import { notFound } from "next/navigation";
import SignInForm from "./SignInForm";
import { getCachedGlobal } from "@/utilities/getGlobals";
import type { Authentication, Media } from "@/payload-types";
import type { Header } from '@/payload-types'

export default async function SignInPage() {
  const headerData = (await getCachedGlobal('header', 1)()) as Header
  const media = headerData.Styles.media as Media;
  const enabledProviders = ["credentials", "magicLink", "google", "facebook"];

  return <SignInForm authMethods={enabledProviders} media={media} />;
}
