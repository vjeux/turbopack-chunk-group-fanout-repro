"use client";
import { lazy, Suspense, useState } from "react";

const Leaf0 = lazy(() => import("../lazy/leaf156"));
const Leaf1 = lazy(() => import("../lazy/leaf157"));
const Leaf2 = lazy(() => import("../lazy/leaf158"));

export default function Shared52() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div data-shared="52">
      <button onClick={() => setOpen((o) => (o === null ? 0 : (o + 1) % 3))}>shared 52</button>
      <Suspense fallback={null}>
        {open === 0 ? <Leaf0 /> : null}
        {open === 1 ? <Leaf1 /> : null}
        {open === 2 ? <Leaf2 /> : null}
      </Suspense>
    </div>
  );
}
