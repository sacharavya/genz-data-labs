"use client";

import Link from "next/link";
import { useLenis } from "lenis/react";
import { SITE } from "@/lib/site";

const Logo = (
  // eslint-disable-next-line @next/next/no-img-element
  <img
    src="/logo.svg"
    alt="genz technologies"
    className="h-[34px] w-auto"
    width={971}
    height={580}
  />
);

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
    <header className="fixed inset-x-0 top-0 z-[100] isolate [mix-blend-mode:difference] will-change-transform">
      <div className="wrap flex items-center justify-between py-6">
        {variant === "home" ? (
          <a
            href="#top"
            aria-label="genz technologies, home"
            onClick={(e) => {
              if (lenis) {
                e.preventDefault();
                scrollTo(0);
              }
            }}
            className="inline-flex items-center"
          >
            {Logo}
          </a>
        ) : (
          <Link
            href="/"
            aria-label="genz technologies, home"
            className="inline-flex items-center"
          >
            {Logo}
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
