"use client";
import { lazy, Suspense, useState } from "react";

const Leaf0 = lazy(() => import("../lazy/leaf357"));
const Leaf1 = lazy(() => import("../lazy/leaf358"));
const Leaf2 = lazy(() => import("../lazy/leaf359"));

export default function Shared119() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div data-shared="119">
      <button onClick={() => setOpen((o) => (o === null ? 0 : (o + 1) % 3))}>shared 119</button>
      <Suspense fallback={null}>
        {open === 0 ? <Leaf0 /> : null}
        {open === 1 ? <Leaf1 /> : null}
        {open === 2 ? <Leaf2 /> : null}
      </Suspense>
    </div>
  );
}
