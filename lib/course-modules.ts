export type Lesson = {
  slug: string;
  title: string;
};

export type CourseModule = {
  slug: string;
  title: string;
  description: string;
  lessons: Lesson[];
};

export const courseModules: CourseModule[] = [
  {
    slug: "webbgrunder",
    title: "Webb Grunder",
    description: "Verktyg, filstruktur och hur webben fungerar",
    lessons: [
      { slug: "verktyg-och-devtools", title: "Verktyg och DevTools" },
      { slug: "internet-och-webblasare", title: "Hur internet och webbläsare fungerar" },
      { slug: "filstruktur", title: "Filstruktur i ett webbprojekt" },
    ],
  },
  {
    slug: "html",
    title: "HTML",
    description: "Struktur, semantik och formulär",
    lessons: [
      { slug: "dokumentstruktur", title: "Dokumentstruktur och semantik" },
      { slug: "text-lankar-bilder", title: "Text, länkar och bilder" },
      { slug: "formular", title: "Formulär och inputs" },
      { slug: "tabeller", title: "Tabeller" },
      { slug: "tillganglighet", title: "Tillgänglighet grunder" },
      { slug: "delprojekt-movie-html", title: "Delprojekt - statisk Movie Info-sida" },
    ],
  },
  {
    slug: "css",
    title: "CSS",
    description: "Layout, flexbox, grid och responsivitet",
    lessons: [
      { slug: "selektorer-och-box-model", title: "Selektorer, specificitet och box model" },
      { slug: "flexbox", title: "Flexbox" },
      { slug: "grid", title: "Grid" },
      { slug: "responsiv-design", title: "Responsiv design" },
      { slug: "pseudoklasser-och-transitions", title: "Pseudo-klasser och transitions" },
      { slug: "delprojekt-movie-css", title: "Delprojekt - styla Movie Info-sidan" },
    ],
  },
  {
    slug: "javascript",
    title: "JavaScript",
    description: "Språkgrunder, DOM och events",
    lessons: [
      { slug: "variabler-och-datatyper", title: "Variabler och datatyper" },
      { slug: "funktioner-villkor-loopar", title: "Funktioner, villkor och loopar" },
      { slug: "arrays-och-objekt", title: "Arrays och objekt" },
      { slug: "dom-selektering", title: "DOM-selektering och manipulation" },
      { slug: "events", title: "Event listeners" },
      { slug: "delprojekt-movie-js", title: "Delprojekt - interaktiv Movie Info-sida" },
    ],
  },
  {
    slug: "networking",
    title: "Networking",
    description: "HTTP, statuskoder och CORS",
    lessons: [
      { slug: "http-metoder-och-statuskoder", title: "HTTP-metoder och statuskoder" },
      { slug: "headers-och-cors", title: "Headers och CORS" },
      { slug: "request-response-devtools", title: "Request/response i DevTools" },
    ],
  },
  {
    slug: "apier",
    title: "APIer",
    description: "Fetch, async/await och externa API:er",
    lessons: [
      { slug: "rest-och-json", title: "REST och JSON" },
      { slug: "fetch-async-await", title: "Fetch, promises och async/await" },
      { slug: "loading-och-error-states", title: "Loading- och error states" },
      { slug: "sokning-och-paginering", title: "Sökning och paginering" },
      { slug: "capstone-movie-api", title: "Capstone - Movie Info med riktigt API" },
    ],
  },
];