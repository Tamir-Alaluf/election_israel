import { ensureCurrentUser } from "@/lib/utils/ensure-user";

export default async function AdvisorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await ensureCurrentUser();

  return children;
}
