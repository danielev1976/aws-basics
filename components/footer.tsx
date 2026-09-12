import { courseModules } from "@/lib/course-modules";
import Link from "next/link";


const buildStages = [
  {
    tag: "HTML",
    title: "Statisk struktur",
    body: "Filmdata hårdkodas direkt i markupen.",
  },
  {
    tag: "CSS",
    title: "Layout & design",
    body: "Korten får grid, flexbox och responsivitet.",
  },
  {
    tag: "JavaScript",
    title: "Interaktivitet",
    body: "Sökning och filtrering körs i webbläsaren.",
  },
  {
    tag: "API",
    title: "Live-data",
    body: "Sidan hämtar riktig filmdata från ett öppet API.",
  },
];
export default function Footer(){

    function Sprockets() {
  return (
    <div className="flex justify-between px-3">
      {Array.from({ length: 28 }).map((_, i) => (
        <span key={i} className="h-2 w-2 rounded-[2px] bg-[#0B0F14]" />
      ))}
    </div>
  );
}

    return (
        <div>
                 {/* ---------- Moduler: filmremsa ---------- */}
             <section id="moduler" className="py-20 px-8 scroll-mt-24">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-2">Kursens sex moduler</h2>
          <p className="text-[#a0aec0] text-sm mb-10 max-w-lg">
            Modulerna bygger på varandra i ordning — varje modul lägger till
            ett nytt lager i samma projekt.
          </p>

          <div className="rounded-xl bg-[#1B2531] border border-white/10 overflow-hidden">
            <Sprockets />
            <ol className="grid md:grid-cols-6 divide-y md:divide-y-0 md:divide-x divide-white/10">
              {courseModules.map((mod, i) => (
                <li key={mod.slug}>
                  <Link
                    href={`/${mod.slug}`}
                    className="group flex flex-col h-full px-5 py-8 hover:bg-white/5 transition-colors"
                  >
                    <span className="text-[11px] font-mono text-[#a0aec0] mb-3">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm font-semibold mb-2 group-hover:text-[#FF9900] transition-colors">
                      {mod.title}
                    </span>
                    <span className="text-xs text-[#a0aec0] leading-relaxed">
                      {mod.description}
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
            <Sprockets />
          </div>
        </div>
      </section>

      {/* ---------- Samma projekt hela vägen ---------- */}
      <section className="py-20 px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-2">Samma projekt, hela vägen</h2>
          <p className="text-[#a0aec0] text-sm mb-10 max-w-lg">
            En filmsida som växer i varje modul — från statisk HTML till en
            sida med riktig, live filmdata.
          </p>

          <div className="flex overflow-x-auto md:grid md:grid-cols-4 gap-px bg-white/10 rounded-xl overflow-hidden">
            {buildStages.map((stage) => (
              <div
                key={stage.tag}
                className="min-w-[220px] bg-[#1B2531] px-5 py-6"
              >
                <span className="inline-block text-[11px] font-mono text-[#FF9900] mb-4">
                  {stage.tag}
                </span>
                <h3 className="text-sm font-semibold mb-2">{stage.title}</h3>
                <p className="text-xs text-[#a0aec0] leading-relaxed">
                  {stage.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
        </div>
    )
}