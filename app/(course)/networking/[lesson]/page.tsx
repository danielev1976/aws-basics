import { notFound } from "next/navigation";

type Props = {
  params: { lesson: string };
};

export default function NetworkingLessonPage({ params }: Props) {
  // TODO: hämta lektionsinnehåll från content/networking/${params.lesson}.mdx
  if (!params.lesson) return notFound();

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <p className="text-xs uppercase tracking-wide text-[#a0aec0] mb-2">
        Networking
      </p>
      <h1 className="text-2xl font-bold">{params.lesson}</h1>
    </div>
  );
}
