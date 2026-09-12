#!/usr/bin/env bash
set -euo pipefail

# ---------------------------------------------------------------------------
# scaffold-course.sh
#
# Skapar mappstruktur + placeholderfiler för webbutvecklingskursen.
# Idempotent: skriver aldrig över filer som redan finns.
#
# Kör från projektets rot:
#   chmod +x scaffold-course.sh
#   ./scaffold-course.sh
# ---------------------------------------------------------------------------

ROOT="$(pwd)"

# ---- Hjälpfunktioner --------------------------------------------------------

make_dir() {
  mkdir -p "$1"
}

# write_file <path> <heredoc-content via stdin>
# Skriver bara filen om den inte redan finns.
write_file() {
  local path="$1"
  if [ -f "$path" ]; then
    echo "  skip (finns redan): $path"
  else
    mkdir -p "$(dirname "$path")"
    cat > "$path"
    echo "  skapad: $path"
  fi
}

# ---- Modulplan ---------------------------------------------------------------
# format: "slug|Titel|lesson-slug:Lektionstitel,lesson-slug:Lektionstitel,..."

MODULES=(
  "webbgrunder|Webb Grunder|verktyg-och-devtools:Verktyg och DevTools;internet-och-webblasare:Hur internet och webbläsare fungerar;filstruktur:Filstruktur i ett webbprojekt"
  "html|HTML|dokumentstruktur:Dokumentstruktur och semantik;text-lankar-bilder:Text, länkar och bilder;formular:Formulär och inputs;tabeller:Tabeller;tillganglighet:Tillgänglighet grunder;delprojekt-movie-html:Delprojekt - statisk Movie Info-sida"
  "css|CSS|selektorer-och-box-model:Selektorer, specificitet och box model;flexbox:Flexbox;grid:Grid;responsiv-design:Responsiv design;pseudoklasser-och-transitions:Pseudo-klasser och transitions;delprojekt-movie-css:Delprojekt - styla Movie Info-sidan"
  "javascript|JavaScript|variabler-och-datatyper:Variabler och datatyper;funktioner-villkor-loopar:Funktioner, villkor och loopar;arrays-och-objekt:Arrays och objekt;dom-selektering:DOM-selektering och manipulation;events:Event listeners;delprojekt-movie-js:Delprojekt - interaktiv Movie Info-sida"
  "networking|Networking|http-metoder-och-statuskoder:HTTP-metoder och statuskoder;headers-och-cors:Headers och CORS;request-response-devtools:Request/response i DevTools"
  "apier|APIer|rest-och-json:REST och JSON;fetch-async-await:Fetch, promises och async/await;loading-och-error-states:Loading- och error states;sokning-och-paginering:Sökning och paginering;capstone-movie-api:Capstone - Movie Info med riktigt API"
)

echo "== Skapar grundstruktur =="

make_dir "$ROOT/app/(course)"
make_dir "$ROOT/components/course"
make_dir "$ROOT/data/exercises"
make_dir "$ROOT/content"
make_dir "$ROOT/lib"

# ---- Delade komponenter (skapas bara som stubbar om de saknas) --------------

write_file "$ROOT/lib/course-modules.ts" <<'EOF'
// Central källa för modul- och lektionsdata.
// Navbar, modulöversikter och LessonLayout kan alla läsa från denna fil
// istället för att hårdkoda listor på flera ställen.

export type Lesson = {
  slug: string;
  title: string;
};

export type CourseModule = {
  slug: string;
  title: string;
  lessons: Lesson[];
};

export const courseModules: CourseModule[] = [
  // Fylls i per modul - se app/(course)/<modul>/page.tsx för motsvarande route.
];
EOF

write_file "$ROOT/components/course/LessonLayout.tsx" <<'EOF'
"use client";

import { ReactNode } from "react";

type LessonLayoutProps = {
  moduleTitle: string;
  lessonTitle: string;
  children: ReactNode;
  prevHref?: string;
  nextHref?: string;
};

export default function LessonLayout({
  moduleTitle,
  lessonTitle,
  children,
  prevHref,
  nextHref,
}: LessonLayoutProps) {
  return (
    <article className="max-w-3xl mx-auto px-6 py-12">
      <p className="text-xs uppercase tracking-wide text-[#a0aec0] mb-2">
        {moduleTitle}
      </p>
      <h1 className="text-2xl font-bold mb-8">{lessonTitle}</h1>

      <div className="prose prose-invert max-w-none">{children}</div>

      <nav className="flex justify-between mt-12 pt-6 border-t border-white/10">
        {prevHref ? <a href={prevHref}>&larr; Föregående</a> : <span />}
        {nextHref ? <a href={nextHref}>Nästa &rarr;</a> : <span />}
      </nav>
    </article>
  );
}
EOF

write_file "$ROOT/components/course/ExerciseList.tsx" <<'EOF'
type Exercise = {
  id: string;
  title: string;
  difficulty: "lätt" | "medel" | "svår";
  instructions: string;
};

export default function ExerciseList({ exercises }: { exercises: Exercise[] }) {
  return (
    <section className="mt-10">
      <h2 className="text-lg font-semibold mb-4">Övningar</h2>
      <ol className="flex flex-col gap-4">
        {exercises.map((ex) => (
          <li key={ex.id} className="rounded-lg border border-white/10 p-4">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-medium">{ex.title}</h3>
              <span className="text-xs uppercase text-[#a0aec0]">
                {ex.difficulty}
              </span>
            </div>
            <p className="text-sm text-[#a0aec0]">{ex.instructions}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
EOF

# ---- Loop över moduler --------------------------------------------------------

for entry in "${MODULES[@]}"; do
  IFS='|' read -r slug title lessons_raw <<< "$entry"

  echo ""
  echo "== Modul: $title (/$slug) =="

  module_dir="$ROOT/app/(course)/$slug"
  content_dir="$ROOT/content/$slug"

  make_dir "$module_dir"
  make_dir "$content_dir"

  # Modulöversikt (app/(course)/<slug>/page.tsx)
  write_file "$module_dir/page.tsx" <<EOF
export default function ${title// /}ModulePage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-bold mb-4">${title}</h1>
      <p className="text-[#a0aec0]">
        Moduléversikt och lektionslista för ${title} - fylls i.
      </p>
    </div>
  );
}
EOF

  # Dynamisk lektionsroute (app/(course)/<slug>/[lesson]/page.tsx)
  write_file "$module_dir/[lesson]/page.tsx" <<EOF
import { notFound } from "next/navigation";

type Props = {
  params: { lesson: string };
};

export default function ${title// /}LessonPage({ params }: Props) {
  // TODO: hämta lektionsinnehåll från content/${slug}/\${params.lesson}.mdx
  if (!params.lesson) return notFound();

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <p className="text-xs uppercase tracking-wide text-[#a0aec0] mb-2">
        ${title}
      </p>
      <h1 className="text-2xl font-bold">{params.lesson}</h1>
    </div>
  );
}
EOF

  # Övnings-JSON per modul
  write_file "$ROOT/data/exercises/$slug.json" <<EOF
{
  "module": "$slug",
  "exercises": []
}
EOF

  # Lektioner: mdx-fil + entry i övnings-json-strukturen (bara filer, exercises.json är gemensam)
  IFS=';' read -ra LESSONS <<< "$lessons_raw"
  order=1
  for lesson in "${LESSONS[@]}"; do
    lesson_slug="${lesson%%:*}"
    lesson_title="${lesson#*:}"

    write_file "$content_dir/$(printf '%02d' "$order")-${lesson_slug}.mdx" <<EOF
---
title: "${lesson_title}"
module: "${slug}"
order: ${order}
---

Innehåll för lektionen **${lesson_title}** skrivs här.
EOF

    order=$((order + 1))
  done
done

echo ""
echo "Klart. Mappstruktur och placeholderfiler skapade under:"
echo "  $ROOT/app/(course)"
echo "  $ROOT/content"
echo "  $ROOT/data/exercises"
echo "  $ROOT/components/course"
echo "  $ROOT/lib/course-modules.ts"