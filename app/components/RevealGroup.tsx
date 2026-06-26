"use client";

import { Children, useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Presentational-only animation wrapper for beat 3 (Прогон). Its server-rendered
 * children (the three ArtifactSections) reveal one-by-one with a staggered
 * fade + upward slide when the group scrolls into view.
 *
 * Progressive enhancement, by construction:
 *   - SSR / no-JS  → `armed` stays false → no inline styles → content is fully
 *                    visible in the raw HTML (no opacity:0 anywhere).
 *   - reduced-motion → effect skips arming → content shown instantly, no motion.
 *   - JS on, motion ok → effect arms (instant hidden state, no transition while
 *                    off-screen), then an IntersectionObserver fires once and
 *                    transitions each item in with `index * STEP` delay.
 */

const DURATION_MS = 600;
const STEP_MS = 120;
const SHIFT_PX = 12;

export default function RevealGroup({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [armed, setArmed] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    // Respect reduced-motion: never arm — items stay statically visible.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    setArmed(true);

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true);
          observer.disconnect(); // run once — no replay on scroll back
        }
      },
      { threshold: 0, rootMargin: "0px 0px -15% 0px" },
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  const items = Children.toArray(children);

  return (
    <div ref={rootRef} className={className}>
      {items.map((child, i) => {
        let style: React.CSSProperties | undefined;
        if (!armed) {
          // SSR / no-JS / reduced-motion: no styles → naturally visible.
          style = undefined;
        } else if (!shown) {
          // Armed but not yet revealed: hide instantly (no transition).
          style = { opacity: 0, transform: `translateY(${SHIFT_PX}px)` };
        } else {
          // Reveal with staggered transition.
          style = {
            opacity: 1,
            transform: "none",
            transition: `opacity ${DURATION_MS}ms ease, transform ${DURATION_MS}ms ease`,
            transitionDelay: `${i * STEP_MS}ms`,
          };
        }
        return (
          <div key={i} style={style}>
            {child}
          </div>
        );
      })}
    </div>
  );
}
