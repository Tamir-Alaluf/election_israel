import { SignIn } from "@clerk/nextjs";

export const metadata = {
  title: "התחברות | בחירות 2026",
};

export default function SignInPage() {
  return (
    <main className="min-h-[calc(100vh-4rem)] max-w-md mx-auto px-5 py-10 flex items-center justify-center">
      <SignIn routing="path" path="/sign-in" signUpUrl="/sign-up" />
    </main>
  );
}
