// apps/docs/app/page.tsx
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen px-6 py-24 md:px-16 lg:px-32">
      <section className="max-w-4xl">
        <p className="mb-4 text-sm font-black uppercase tracking-widest">
          @swirski/ui
        </p>

        <h1 className="text-6xl font-black tracking-tight md:text-8xl">
          Swirski UI
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-700">
          A growing component library for expressive, editorial and creative web
          interfaces.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/components"
            className="border-2 border-black bg-black px-5 py-3 text-sm font-black uppercase tracking-widest text-white shadow-[5px_5px_0_#000]"
          >
            View components
          </Link>

          <code className="border-2 border-black bg-white px-5 py-3 text-sm font-bold shadow-[5px_5px_0_#000]">
            pnpm add @swirski/ui
          </code>
        </div>
      </section>
    </main>
  );
}
