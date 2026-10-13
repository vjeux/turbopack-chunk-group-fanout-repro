"use client";
import { lazy, Suspense, useState } from "react";

const Leaf0 = lazy(() => import("../lazy/leaf165"));
const Leaf1 = lazy(() => import("../lazy/leaf166"));
const Leaf2 = lazy(() => import("../lazy/leaf167"));

export default function Shared55() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div data-shared="55">
      <button onClick={() => setOpen((o) => (o === null ? 0 : (o + 1) % 3))}>shared 55</button>
      <Suspense fallback={null}>
        {open === 0 ? <Leaf0 /> : null}
        {open === 1 ? <Leaf1 /> : null}
        {open === 2 ? <Leaf2 /> : null}
      </Suspense>
    </div>
  );
}
