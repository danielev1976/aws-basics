'use client';

import { useState } from 'react';
import Link from 'next/link';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Vecka 1 - Molngrunder', href: '/molngrunder' },
  { label: 'Vecka 2 - IAM', href: '/iam' },
  { label: 'Vecka 3 - Lambda', href: '/lambda' },
  { label: 'Vecka 4 - DynamoDB', href: '/dynamodb' },
  { label: 'Vecka 5 - Frontend S3', href: '/frontend-s3' },
  { label: 'Vecka 6 - Spring Boot', href: '/spring-boot' },
  { label: 'Vecka 7 - CI/CD', href: '/ci-cd' },
  { label: 'Vecka 8 - Examination', href: '/examination' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
  <nav className="fixed top-0 left-0 right-0 z-50 h-20 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm border-b border-neutral-200 dark:border-neutral-800">
  <div className="max-w-6xl mx-auto px-6 h-full flex items-center justify-between">
    
    {/* LEFT */}
    <div className="flex flex-col items-start gap-1 min-w-0">
          <span className="bg-[#FF9900] text-[#232F3E] text-s font-bold tracking-widest uppercase  rounded whitespace-nowrap">
            AWS · Lektionsmaterial
          </span>

          <p className="text-2xl font-semibold text-neutral-800 dark:text-neutral-200 truncate max-w-45 sm:max-w-xs">
            Molntjänster
          </p>
        </div>

        {/* RIGHT: Menu button */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
          className="w-9 h-9 flex flex-col justify-center items-center gap-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors flex-shrink-0"
        >
          <span
            className={`block w-4 h-px bg-neutral-900 dark:bg-neutral-100 rounded-full transition-transform duration-300 ${
              open ? 'translate-y-1.5 rotate-45' : ''
            }`}
          />
          <span
            className={`block w-4 h-px bg-neutral-900 dark:bg-neutral-100 rounded-full transition-opacity duration-200 ${
              open ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block w-4 h-px bg-neutral-900 dark:bg-neutral-100 rounded-full transition-transform duration-300 ${
              open ? '-translate-y-1.5 -rotate-45' : ''
            }`}
          />
        </button>
          </div>
      </nav>

      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[1px]"
        />
      )}

      {/* Drawer */}
      <aside
        className={`fixed top-14 right-0 z-50 h-[calc(100vh-3.5rem)] w-64 bg-white dark:bg-neutral-900 border-l border-neutral-200 dark:border-neutral-800 shadow-sm transition-transform duration-300 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <ul className="py-3">
          {navItems.map(({ label, href }) => (
            <li key={href}>
              <Link
                href={href}
                onClick={() => setOpen(false)}
                className="block px-5 py-2.5 text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors truncate"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
}