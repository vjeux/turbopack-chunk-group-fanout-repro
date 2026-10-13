"use client";
import { lazy, Suspense, useState } from "react";

const Leaf0 = lazy(() => import("../lazy/leaf498"));
const Leaf1 = lazy(() => import("../lazy/leaf499"));
const Leaf2 = lazy(() => import("../lazy/leaf500"));

export default function Shared166() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div data-shared="166">
      <button onClick={() => setOpen((o) => (o === null ? 0 : (o + 1) % 3))}>shared 166</button>
      <Suspense fallback={null}>
        {open === 0 ? <Leaf0 /> : null}
        {open === 1 ? <Leaf1 /> : null}
        {open === 2 ? <Leaf2 /> : null}
      </Suspense>
    </div>
  );
}
