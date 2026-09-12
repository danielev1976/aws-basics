import { ReactNode } from "react";
import Link from "next/link";

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
    <div className="min-h-screen bg-[#141B24]">
      <article className="max-w-3xl mx-auto px-6 pt-32 pb-20">
        <p className="text-xs uppercase tracking-wide text-[#a0aec0] mb-2">
          {moduleTitle}
        </p>
        <h1 className="text-2xl font-bold text-white mb-8">{lessonTitle}</h1>

        <div className="max-w-none text-[#cbd5e1] leading-relaxed [&_p]:mb-4 [&_h2]:text-white [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:mt-10 [&_h2]:mb-3 [&_code]:bg-white/10 [&_code]:rounded [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-[13px] [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-4 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-4 [&_li]:mb-1.5">
          {children}
        </div>

        <nav className="flex justify-between mt-12 pt-6 border-t border-white/10 text-sm">
          {prevHref ? (
            <Link href={prevHref} className="text-[#a0aec0] hover:text-[#FF9900] transition-colors">
              &larr; Föregående
            </Link>
          ) : (
            <span />
          )}
          {nextHref ? (
            <Link href={nextHref} className="text-[#FF9900] hover:text-[#e88a00] transition-colors font-medium">
              Nästa &rarr;
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </article>
    </div>
  );
}