import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  try {
    const response = await auth.api.getSession({
      headers: await headers(),
    });
    const session = response?.session ?? null;

    if (!session) {
      return redirect("/sign-in");
    }

    return children;
  } catch (error: any) {
    console.error("Error fetching session:", error);

    return redirect("/sign-in");
  }
}
