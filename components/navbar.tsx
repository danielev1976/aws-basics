"use client";

import { useState } from "react";
import Link from "next/link";

type NavItem = {
  label: string;
  href: string;
  description: string;
};

const navItems: NavItem[] = [
  { label: "Webb Grunder", href: "/webbgrunder", description: "Verktyg, filstruktur och hur webben fungerar" },
  { label: "HTML", href: "/html", description: "Struktur, semantik och formulär" },
  { label: "CSS", href: "/css", description: "Layout, flexbox, grid och responsivitet" },
  { label: "JavaScript", href: "/javascript", description: "Språkgrunder, DOM och events" },
  { label: "Networking", href: "/networking", description: "HTTP, statuskoder och CORS" },
  { label: "APIer", href: "/apier", description: "Fetch, async/await och externa API:er" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-[#232F3E] px-8 py-10 mb-10 overflow-hidden z-50">
      <div className="absolute -top-12 -right-12 w-48 h-26 rounded-full bg-[#FF9900] opacity-10" />
      <div className="absolute -bottom-8 left-[40%] w-36 h-26 rounded-full bg-[#1A73C8] opacity-10" />

      <div className="flex justify-between items-center relative px-36">
        <Link href="/" className="relative">
          <span className="inline-block bg-[#FF9900] text-[#232F3E] text-[11px] font-bold tracking-widest uppercase px-3 py-1 rounded mb-4">
            Webbutveckling · Nivå 1
          </span>
        </Link>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Öppna meny"
          aria-expanded={open}
          className="w-9 h-9 flex flex-col justify-center items-center gap-1.5 rounded-lg border border-white/20 hover:bg-white/10 transition-colors flex-shrink-0"
        >
          <span
            className={`block w-4 h-px bg-white rounded-full transition-transform duration-300 ${
              open ? "translate-y-1.5 rotate-45" : ""
            }`}
          />
          <span
            className={`block w-4 h-px bg-white rounded-full transition-opacity duration-200 ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-4 h-px bg-white rounded-full transition-transform duration-300 ${
              open ? "-translate-y-1.5 -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[1px]"
        />
      )}

      <aside
        className={`fixed top-0 right-0 z-50 h-full w-80 bg-[#1B2531] border-l border-white/10 shadow-xl transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="px-6 py-8">
          <span className="text-[11px] font-semibold tracking-wide text-[#a0aec0] uppercase">
            Kursmoduler
          </span>
        </div>

        <ol className="px-3 pb-6 flex flex-col gap-1">
          {navItems.map(({ label, href, description }, i) => (
            <li key={href}>
              <Link
                href={href}
                onClick={() => setOpen(false)}
                className="group flex items-start gap-4 rounded-lg px-3 py-3 hover:bg-white/5 transition-colors"
              >
                <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border border-white/20 text-[11px] text-[#a0aec0] group-hover:border-[#FF9900] group-hover:text-[#FF9900] transition-colors">
                  {i + 1}
                </span>
                <span className="flex flex-col">
                  <span className="text-sm font-medium text-white group-hover:text-[#FF9900] transition-colors">
                    {label}
                  </span>
                  <span className="text-xs text-[#a0aec0] leading-snug">
                    {description}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </aside>
    </nav>
  );
}