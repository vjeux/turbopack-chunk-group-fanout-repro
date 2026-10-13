"use client";
import { lazy, Suspense, useState } from "react";

const Leaf0 = lazy(() => import("../lazy/leaf6"));
const Leaf1 = lazy(() => import("../lazy/leaf7"));
const Leaf2 = lazy(() => import("../lazy/leaf8"));

export default function Shared2() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div data-shared="2">
      <button onClick={() => setOpen((o) => (o === null ? 0 : (o + 1) % 3))}>shared 2</button>
      <Suspense fallback={null}>
        {open === 0 ? <Leaf0 /> : null}
        {open === 1 ? <Leaf1 /> : null}
        {open === 2 ? <Leaf2 /> : null}
      </Suspense>
    </div>
  );
}
