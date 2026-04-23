"use client";

import { useState } from "react";
import Link from "next/link";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Molngrunder", href: "/molngrunder" },
  { label: "IAM", href: "/iam" },
  { label: "EC2", href: "/ec2" },
  { label: "S3", href: "/s3" },
  { label: "RDS", href: "/rds" },
  {label: "Networking", href: "/networking"},
  { label: "Lambda", href: "/lambda" },
  { label: "DynamoDB", href: "/dynamodb" },
  { label: "Frontend S3", href: "/frontend-s3" },
  { label: "CI/CD", href: "/ci-cd" },
  { label: "Load Balancer", href: "/loadbalancer" },
  { label: "Lambda som proxy", href: "/lambda-proxy" },
  {label: "Security Groups", href: "/security-groups"},
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="fixed top-0 left-0 right-0 bg-[#232F3E] px-8 py-10 mb-10  overflow-hidden z-50">
      <div className="absolute -top-12 -right-12 w-48 h-36 rounded-full bg-[#FF9900] opacity-10" />
      <div className="absolute -bottom-8 left-[40%] w-36 h-36 rounded-full bg-[#1A73C8] opacity-10" />

      <div className="flex justify-between items-center relative px-36">
        <div className="relative">
          <span className="inline-block bg-[#FF9900] text-[#232F3E] text-[11px] font-bold tracking-widest uppercase px-3 py-1 rounded mb-4">
            AWS · Lektionsmaterial
          </span>
          <h1 className="text-3xl font-bold text-white mb-3">
            Introduktion till <span className="text-[#FF9900]">AWS</span>
          </h1>
          <p className="text-[#a0aec0] text-sm max-w-lg leading-relaxed">
            Välj ett område nedan för att läsa om AWS-tjänster
          </p>
        </div>

        {/* -- Hamburgermenu right side -- */}
        <div>
          {/* RIGHT: Menu button */}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="w-9 h-9 flex flex-col justify-center items-center gap-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors flex-shrink-0"
          >
            <span
              className={`block w-4 h-px bg-neutral-900 dark:bg-neutral-100 rounded-full transition-transform duration-300 ${
                open ? "translate-y-1.5 rotate-45" : ""
              }`}
            />
            <span
              className={`block w-4 h-px bg-neutral-900 dark:bg-neutral-100 rounded-full transition-opacity duration-200 ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-4 h-px bg-neutral-900 dark:bg-neutral-100 rounded-full transition-transform duration-300 ${
                open ? "-translate-y-1.5 -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

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
          open ? "translate-x-0" : "translate-x-full"
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
    </nav>
  );
}
