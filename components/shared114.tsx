"use client";
import { lazy, Suspense, useState } from "react";

const Leaf0 = lazy(() => import("../lazy/leaf342"));
const Leaf1 = lazy(() => import("../lazy/leaf343"));
const Leaf2 = lazy(() => import("../lazy/leaf344"));

export default function Shared114() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div data-shared="114">
      <button onClick={() => setOpen((o) => (o === null ? 0 : (o + 1) % 3))}>shared 114</button>
      <Suspense fallback={null}>
        {open === 0 ? <Leaf0 /> : null}
        {open === 1 ? <Leaf1 /> : null}
        {open === 2 ? <Leaf2 /> : null}
      </Suspense>
    </div>
  );
}
