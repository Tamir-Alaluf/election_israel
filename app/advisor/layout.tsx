import { ensureCurrentUser } from "@/lib/auth/ensure-user";

export default async function AdvisorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await ensureCurrentUser();

  return children;
}
