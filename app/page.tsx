import { EnvVarWarning } from "@/components/env-var-warning";
import { AuthButton } from "@/components/auth-button";
import { Hero } from "@/components/hero";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { ConnectSupabaseSteps } from "@/components/tutorial/connect-supabase-steps";
import { SignUpUserSteps } from "@/components/tutorial/sign-up-user-steps";
import { hasEnvVars } from "@/lib/utils";
import Link from "next/link";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="min-h-screen">
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
          <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">

            <div className="flex items-center gap-6">

              <Link
                href="/"
                className="text-lg font-bold tracking-tight text-foreground"
              >
                LeadFlow
              </Link>
            </div>
            {!hasEnvVars ? (
              <EnvVarWarning />
            ) : (
              <Suspense>
                <AuthButton />
              </Suspense>
            )}
          </div>
        </nav>
        <div className="flex-1 flex flex-col gap-20 max-w-5xl p-5">
          <Hero />
          <main className="text-center gap-6 px-4">
            <h2 className="font-medium text-xl mb-4">Sign Up or Login to continue</h2>
          </main>
        </div>


        <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16">
          <p>
            Made by{" "}
            <a
              href="https://iiharsha.xyz"
              target="_blank"
              className="font-bold hover:underline"
              rel="noreferrer"
            >
              Harshavardhan Vadluri
            </a>
          </p>
          <ThemeSwitcher />
        </footer>
      </div>
    </div>
  );
}
