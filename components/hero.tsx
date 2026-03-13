import { createClient } from "@/lib/supabase/server";

async function UserDetails() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // if (!user) {
  //   redirect("/auth/login");
  // }

  return user;
}
export async function Hero() {
  const user = await UserDetails();
  return (
    <div className="flex flex-col gap-16 items-center">
      <h1 className="sr-only">Supabase and Next.js Starter Template</h1>
      <p className="text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center">
        Lightweight CRM application for small teams made by{" "}
        <a
          href="https://iiharsha.xyz"
          target="_blank"
          className="font-bold hover:underline"
          rel="noreferrer"
        >
          Harshavardhan Vadluri
        </a>{" "}
      </p>
      <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8" />
      {!user && (
        <p className="text-muted-foreground text-sm">
          Sign up or login to continue
        </p>
      )}
    </div>
  );
}
