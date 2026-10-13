"use client";
import { lazy, Suspense, useState } from "react";

const Leaf0 = lazy(() => import("../lazy/leaf0"));
const Leaf1 = lazy(() => import("../lazy/leaf1"));
const Leaf2 = lazy(() => import("../lazy/leaf2"));

export default function Shared0() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div data-shared="0">
      <button onClick={() => setOpen((o) => (o === null ? 0 : (o + 1) % 3))}>shared 0</button>
      <Suspense fallback={null}>
        {open === 0 ? <Leaf0 /> : null}
        {open === 1 ? <Leaf1 /> : null}
        {open === 2 ? <Leaf2 /> : null}
      </Suspense>
    </div>
  );
}
