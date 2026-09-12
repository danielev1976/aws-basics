import { notFound } from "next/navigation";

type Props = {
  params: { lesson: string };
};

export default function HTMLLessonPage({ params }: Props) {
  // TODO: hämta lektionsinnehåll från content/html/${params.lesson}.mdx
  if (!params.lesson) return notFound();

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <p className="text-xs uppercase tracking-wide text-[#a0aec0] mb-2">
        HTML
      </p>
      <h1 className="text-2xl font-bold">{params.lesson}</h1>
    </div>
  );
}
