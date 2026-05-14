import { notFound } from "next/navigation";
import { componentDocs } from "@/content/components";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return componentDocs.map((component) => ({
    slug: component.slug,
  }));
}

export default async function ComponentPage({ params }: Props) {
  const { slug } = await params;

  const component = componentDocs.find((item) => item.slug === slug);

  if (!component) {
    return notFound();
  }

  return (
    <main className="px-6 py-24 md:px-16 lg:px-32">
      <div className="mb-12 max-w-3xl">
        <p className="mb-3 text-sm font-bold uppercase tracking-widest">
          {component.category}
        </p>

        <h1 className="text-5xl font-black tracking-tight md:text-7xl">
          {component.title}
        </h1>

        <p className="mt-6 text-lg leading-8 text-neutral-700">
          {component.description}
        </p>
      </div>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-black">Preview</h2>

        <div className="border-2 border-black bg-neutral-50 p-8 shadow-[6px_6px_0_#000]">
          {component.preview}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-black">Import</h2>

        <pre className="overflow-x-auto border-2 border-black bg-black p-5 text-sm text-white">
          <code>{component.importCode}</code>
        </pre>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-black">Usage</h2>

        <pre className="overflow-x-auto border-2 border-black bg-black p-5 text-sm text-white">
          <code>{component.usageCode}</code>
        </pre>
      </section>
    </main>
  );
}