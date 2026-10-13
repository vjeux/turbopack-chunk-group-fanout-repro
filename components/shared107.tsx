"use client";
import { lazy, Suspense, useState } from "react";

const Leaf0 = lazy(() => import("../lazy/leaf321"));
const Leaf1 = lazy(() => import("../lazy/leaf322"));
const Leaf2 = lazy(() => import("../lazy/leaf323"));

export default function Shared107() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div data-shared="107">
      <button onClick={() => setOpen((o) => (o === null ? 0 : (o + 1) % 3))}>shared 107</button>
      <Suspense fallback={null}>
        {open === 0 ? <Leaf0 /> : null}
        {open === 1 ? <Leaf1 /> : null}
        {open === 2 ? <Leaf2 /> : null}
      </Suspense>
    </div>
  );
}
