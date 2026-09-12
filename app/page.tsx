import Link from "next/link";


function Sprockets() {
  return (
    <div className="flex justify-between px-3">
      {Array.from({ length: 28 }).map((_, i) => (
        <span key={i} className="h-2 w-2 rounded-[2px] bg-[#0B0F14]" />
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <main className="bg-[#141B24] text-white">
      {/* ---------- Hero ---------- */}
      <section className="pt-40 pb-24 px-8">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="inline-block bg-[#FF9900] text-[#232F3E] text-[11px] font-bold tracking-widest uppercase px-3 py-1 rounded mb-6">
              Webbutveckling · Nivå 1
            </span>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Bygg en filmsida.
              <br />
              Lär dig webben från grunden.
            </h1>
            <p className="text-[#a0aec0] text-base leading-relaxed max-w-md mb-8">
              Sex moduler, gott om övningar och ett riktigt projekt: en
              filmsida byggd mot ett öppet API. Du behöver inga
              förkunskaper — bara en webbläsare och lite nyfikenhet.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/webbgrunder"
                className="bg-[#FF9900] text-[#232F3E] font-semibold text-sm px-6 py-3 rounded-lg hover:bg-[#e88a00] transition-colors"
              >
                Börja kursen
              </Link>
              <a
                href="#moduler"
                className="border border-white/20 text-white text-sm font-medium px-6 py-3 rounded-lg hover:bg-white/5 transition-colors"
              >
                Se alla moduler
              </a>
            </div>
          </div>

          {/* Mockup: vad eleverna bygger */}
          <div className="flex flex-col gap-4">
            <div className="rounded-xl border border-white/10 bg-[#1B2531] overflow-hidden shadow-2xl">
              <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/10">
                <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F56]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#27C93F]" />
                <span className="ml-3 text-xs text-[#a0aec0]">
                  moviesite.dev
                </span>
              </div>
              <div className="p-4">
                <div className="rounded-md bg-[#141B24] border border-white/10 px-3 py-2 text-xs text-[#a0aec0] mb-4">
                  Sök film …
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { title: "Dune: Part Two", rating: "8.4" },
                    { title: "The Batman", rating: "7.8" },
                    { title: "Oppenheimer", rating: "8.3" },
                  ].map((m) => (
                    <div
                      key={m.title}
                      className="rounded-md bg-[#141B24] border border-white/10 overflow-hidden"
                    >
                      <div className="aspect-[2/3] bg-gradient-to-br from-[#1A73C8]/30 to-[#FF9900]/20" />
                      <div className="p-2">
                        <p className="text-[11px] font-medium truncate">
                          {m.title}
                        </p>
                        <p className="text-[10px] text-[#FF9900]">
                          ★ {m.rating}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-[#0F151C] px-5 py-4 font-mono text-[12px] leading-relaxed overflow-x-auto">
              <p className="text-[#a0aec0]">
                <span className="text-[#1A73C8]">const</span> res ={" "}
                <span className="text-[#1A73C8]">await</span> fetch(
                <span className="text-[#FF9900]">
                  `${"{API_URL}"}/search/movie?query=${"{query}"}`
                </span>
                );
              </p>
              <p className="text-[#a0aec0]">
                <span className="text-[#1A73C8]">const</span> {"{ results }"}{" "}
                = <span className="text-[#1A73C8]">await</span>{" "}
                res.json();
              </p>
              <p className="text-[#a0aec0] mt-2">
                renderMovieCards(results);
              </p>
            </div>
          </div>
        </div>
      </section>

 
     

      {/* ---------- Avslutande CTA ---------- */}
      <section className="py-24 px-8 border-t border-white/10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Redo att börja?</h2>
            <p className="text-[#a0aec0] text-sm">
              Första modulen tar dig igenom verktygen du behöver.
            </p>
          </div>
          <Link
            href="/webbgrunder"
            className="bg-[#FF9900] text-[#232F3E] font-semibold text-sm px-6 py-3 rounded-lg hover:bg-[#e88a00] transition-colors flex-shrink-0"
          >
            Starta med Webb Grunder
          </Link>
        </div>
      </section>
    </main>
  );
}