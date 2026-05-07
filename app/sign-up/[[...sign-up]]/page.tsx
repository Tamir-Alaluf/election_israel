import { SignUp } from "@clerk/nextjs";

export const metadata = {
  title: "הרשמה | בחירות 2026",
};

export default function SignUpPage() {
  return (
    <main className="min-h-[calc(100vh-4rem)] max-w-md mx-auto px-5 py-10 flex items-center justify-center">
      <SignUp routing="path" path="/sign-up" signInUrl="/sign-in" />
    </main>
  );
}
