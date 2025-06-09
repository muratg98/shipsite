import { notFound } from "next/navigation";
import SignUpForm from "./SignUpForm";
import { getCachedGlobalFromCollection } from "@/utilities/getGlobals";
import type { Media } from "@/payload-types";
import type { Header } from '@/payload-types'

export default async function SignInPage({ tenantID }: { tenantID: string}) {
  const headerData = (await getCachedGlobalFromCollection('header', 'header', tenantID, 1)()) as Header
  const media = headerData.Styles.media as Media;
  const enabledProviders = ["credentials", "magicLink", "google", "facebook"];

  return <SignUpForm authMethods={enabledProviders} media={media} />;
}
