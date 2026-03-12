export function Hero() {
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
    </div>
  );
}
