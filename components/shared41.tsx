"use client";
import { lazy, Suspense, useState } from "react";

const Leaf0 = lazy(() => import("../lazy/leaf123"));
const Leaf1 = lazy(() => import("../lazy/leaf124"));
const Leaf2 = lazy(() => import("../lazy/leaf125"));

export default function Shared41() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div data-shared="41">
      <button onClick={() => setOpen((o) => (o === null ? 0 : (o + 1) % 3))}>shared 41</button>
      <Suspense fallback={null}>
        {open === 0 ? <Leaf0 /> : null}
        {open === 1 ? <Leaf1 /> : null}
        {open === 2 ? <Leaf2 /> : null}
      </Suspense>
    </div>
  );
}
