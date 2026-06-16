import { CountUp } from "@/components/count-up";

/**
 * Renders a count-up when the value is an integer (e.g. "80", "100", "0"),
 * otherwise the raw string as-is (e.g. "Daily", "__"). Units/prefixes are
 * rendered separately by the caller so the lime accent stays in markup.
 */
export function AnimatedNumber({ value }: { value?: string }) {
  if (!value) return null;
  const n = Number(value);
  if (value.trim() !== "" && Number.isInteger(n)) {
    return <CountUp to={n} />;
  }
  return <span>{value}</span>;
}
