"use client";
import { lazy, Suspense, useState } from "react";

const Leaf0 = lazy(() => import("../lazy/leaf495"));
const Leaf1 = lazy(() => import("../lazy/leaf496"));
const Leaf2 = lazy(() => import("../lazy/leaf497"));

export default function Shared165() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div data-shared="165">
      <button onClick={() => setOpen((o) => (o === null ? 0 : (o + 1) % 3))}>shared 165</button>
      <Suspense fallback={null}>
        {open === 0 ? <Leaf0 /> : null}
        {open === 1 ? <Leaf1 /> : null}
        {open === 2 ? <Leaf2 /> : null}
      </Suspense>
    </div>
  );
}
