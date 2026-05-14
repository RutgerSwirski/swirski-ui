import Link from "next/link";
import { componentDocs } from "@/content/components";

export default function ComponentsPage() {
  return (
    <main className="px-6 py-24 md:px-16 lg:px-32">
      <div className="mb-12 max-w-3xl">
        <p className="mb-3 text-sm font-bold uppercase tracking-widest">
          Components
        </p>

        <h1 className="text-5xl font-black tracking-tight md:text-7xl">
          Swirski UI components
        </h1>

        <p className="mt-6 text-lg leading-8 text-neutral-700">
          A growing collection of reusable components used across Swirski Dev,
          Swirski Studio and future creative web projects.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {componentDocs.map((component) => (
          <Link
            key={component.slug}
            href={`/components/${component.slug}`}
            className="group border-2 border-black bg-white p-6 shadow-[6px_6px_0_#000] transition hover:-translate-y-1 hover:shadow-[9px_9px_0_#000]"
          >
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-neutral-500">
              {component.category}
            </p>

            <h2 className="text-2xl font-black">{component.title}</h2>

            <p className="mt-3 text-sm leading-6 text-neutral-700">
              {component.description}
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}