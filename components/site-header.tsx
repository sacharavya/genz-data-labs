"use client";

import Link from "next/link";
import { useLenis } from "lenis/react";
import { SITE } from "@/lib/site";

function Spark() {
  return (
    <svg
      className="h-[13px] w-[14px]"
      viewBox="0 0 22 20"
      fill="none"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="3.2" height="11" fill="#62D5A6" />
      <rect x="8" y="6" width="3.2" height="10" fill="#62D5A6" transform="rotate(45 9.6 11)" />
      <rect x="11" y="14" width="10" height="3.2" fill="#62D5A6" />
    </svg>
  );
}

const HOME_NAV = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

export function SiteHeader({
  variant = "home",
  cityTags = SITE.cityTags,
}: {
  variant?: "home" | "case";
  cityTags?: string;
}) {
  const lenis = useLenis();

  const scrollTo = (target: string | number) => {
    if (lenis) lenis.scrollTo(target, { offset: 0 });
  };

  return (
    <header
      className="fixed inset-x-0 top-0 z-[100] isolate [mix-blend-mode:difference] will-change-transform"
    >
      <div className="wrap flex items-center justify-between py-6">
        {variant === "home" ? (
          <a
            href="#top"
            onClick={(e) => {
              if (lenis) {
                e.preventDefault();
                scrollTo(0);
              }
            }}
            className="flex items-center gap-[7px] text-[20px] font-extrabold lowercase tracking-[-0.03em] text-white"
          >
            genz
            <Spark />
          </a>
        ) : (
          <Link
            href="/"
            className="flex items-center gap-[7px] text-[20px] font-extrabold lowercase tracking-[-0.03em] text-white"
          >
            genz
            <Spark />
          </Link>
        )}

        {variant === "home" ? (
          <nav className="hidden gap-[26px] font-mono text-[12px] uppercase tracking-[0.04em] text-white min-[760px]:flex">
            {HOME_NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  if (lenis) {
                    e.preventDefault();
                    scrollTo(item.href);
                  }
                }}
                className="link-underline"
              >
                {item.label}
              </a>
            ))}
          </nav>
        ) : (
          <div className="font-mono text-[12px] uppercase tracking-[0.04em] text-white">
            <Link href="/#work" className="link-underline">
              All work
            </Link>
          </div>
        )}

        <div className="font-mono text-[12px] uppercase tracking-[0.04em] text-white">
          {cityTags}
        </div>
      </div>
    </header>
  );
}
