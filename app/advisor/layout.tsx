import { ensureCurrentUser } from "@/lib/utils/auth";

export default async function AdvisorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await ensureCurrentUser();

  return children;
}
