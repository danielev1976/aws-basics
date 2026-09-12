import Link from "next/link";
import { courseModules } from "../../../lib/course-modules";

const lessonSummaries: Record<string, string> = {
  "verktyg-och-devtools":
    "VS Code, terminalen, Git/GitHub och webbläsarens DevTools.",
  "internet-och-webblasare":
    "Vad som händer mellan att du trycker Enter och att sidan syns.",
  filstruktur: "Hur du organiserar filer och mappar i ett webbprojekt.",
};

export default function WebbGrunderPage() {
  const module = courseModules.find((m) => m.slug === "webbgrunder")!;

  return (
    <div className="min-h-screen bg-[#141B24]">
      <div className="max-w-3xl mx-auto px-6 pt-32 pb-20">
        <span className="inline-block bg-[#FF9900] text-[#232F3E] text-[11px] font-bold tracking-widest uppercase px-3 py-1 rounded mb-6">
          Modul 1
        </span>
        <h1 className="text-3xl font-bold text-white mb-4">{module.title}</h1>
        <p className="text-[#a0aec0] leading-relaxed mb-12 max-w-xl">
          Innan vi skriver en enda rad HTML behöver du verktygen och
          grundbegreppen på plats. Den här modulen tar dig igenom hur du
          jobbar, hur webben fungerar under ytan, och hur du organiserar ett
          projekt så att det inte blir kaos när det växer.
        </p>

        <ol className="flex flex-col gap-3">
          {module.lessons.map((lesson, i) => (
            <li key={lesson.slug}>
              <Link
                href={`/webbgrunder/${lesson.slug}`}
                className="group flex items-start gap-4 rounded-lg text-white border border-white/10 bg-[#1B2531] px-5 py-4 hover:border-[#FF9900]/50 transition-colors"
              >
                <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border border-white/20 text-[11px] text-[#a0aec0] group-hover:border-[#FF9900] group-hover:text-[#FF9900] transition-colors">
                  {i + 1}
                </span>
                <span className="flex flex-col">
                  <span className="text-sm font-semibold group-hover:text-[#FF9900] transition-colors">
                    {lesson.title}
                  </span>
                  <span className="text-xs text-[#a0aec0] mt-1 leading-relaxed">
                    {lessonSummaries[lesson.slug]}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}