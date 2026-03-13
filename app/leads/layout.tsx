import { ThemeSwitcher } from "@/components/theme-switcher";
import { Plus, Users } from "lucide-react";
import Header from "@/components/nav-bar";

export default function LeadsLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="min-h-screen">
      <Header />
      <main className="min-h-screen mx-auto w-full max-w-6xl px-4 py-6 animate-fade-in">
        {children}
      </main>

      <footer className="border-t">
        <div className="mx-auto w-full max-w-6xl flex items-center justify-center gap-8 py-16 text-center text-xs px-4">
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
        </div>
      </footer>
    </div>
  );
}
