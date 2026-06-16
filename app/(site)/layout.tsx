import "lenis/dist/lenis.css";
import { SmoothScroll } from "@/components/smooth-scroll";
import { Grain } from "@/components/grain";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SmoothScroll>
      <Grain />
      {children}
    </SmoothScroll>
  );
}
