"use client";
import { lazy, Suspense, useState } from "react";

const Leaf0 = lazy(() => import("../lazy/leaf555"));
const Leaf1 = lazy(() => import("../lazy/leaf556"));
const Leaf2 = lazy(() => import("../lazy/leaf557"));

export default function Shared185() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div data-shared="185">
      <button onClick={() => setOpen((o) => (o === null ? 0 : (o + 1) % 3))}>shared 185</button>
      <Suspense fallback={null}>
        {open === 0 ? <Leaf0 /> : null}
        {open === 1 ? <Leaf1 /> : null}
        {open === 2 ? <Leaf2 /> : null}
      </Suspense>
    </div>
  );
}
