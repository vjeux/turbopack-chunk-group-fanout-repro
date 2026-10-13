"use client";
import { lazy, Suspense, useEffect, useMemo, useState } from "react";

const Nested0 = lazy(() => import("../lazy/leaf119"));
const Nested1 = lazy(() => import("../lazy/leaf250"));
export default function Leaf274({ seed = 274 }: { seed?: number }) {
  const [n, setN] = useState(seed);
  useEffect(() => {
    const t = setTimeout(() => setN((v) => v + 1), 1000);
    return () => clearTimeout(t);
  }, []);
  const v0 = useMemo(() => (n * 0 + 274) % 97, [n]);
  const v1 = useMemo(() => (n * 1 + 274) % 97, [n]);
  const v2 = useMemo(() => (n * 2 + 274) % 97, [n]);
  const v3 = useMemo(() => (n * 3 + 274) % 97, [n]);
  const v4 = useMemo(() => (n * 4 + 274) % 97, [n]);
  const v5 = useMemo(() => (n * 5 + 274) % 97, [n]);
  const v6 = useMemo(() => (n * 6 + 274) % 97, [n]);
  const v7 = useMemo(() => (n * 7 + 274) % 97, [n]);
  const v8 = useMemo(() => (n * 8 + 274) % 97, [n]);
  const v9 = useMemo(() => (n * 9 + 274) % 97, [n]);
  const v10 = useMemo(() => (n * 10 + 274) % 97, [n]);
  const v11 = useMemo(() => (n * 11 + 274) % 97, [n]);
  const v12 = useMemo(() => (n * 12 + 274) % 97, [n]);
  const v13 = useMemo(() => (n * 13 + 274) % 97, [n]);
  const v14 = useMemo(() => (n * 14 + 274) % 97, [n]);
  const v15 = useMemo(() => (n * 15 + 274) % 97, [n]);
  const v16 = useMemo(() => (n * 16 + 274) % 97, [n]);
  const v17 = useMemo(() => (n * 17 + 274) % 97, [n]);
  const v18 = useMemo(() => (n * 18 + 274) % 97, [n]);
  const v19 = useMemo(() => (n * 19 + 274) % 97, [n]);
  const v20 = useMemo(() => (n * 20 + 274) % 97, [n]);
  const v21 = useMemo(() => (n * 21 + 274) % 97, [n]);
  const v22 = useMemo(() => (n * 22 + 274) % 97, [n]);
  const v23 = useMemo(() => (n * 23 + 274) % 97, [n]);
  const v24 = useMemo(() => (n * 24 + 274) % 97, [n]);
  const v25 = useMemo(() => (n * 25 + 274) % 97, [n]);
  const v26 = useMemo(() => (n * 26 + 274) % 97, [n]);
  const v27 = useMemo(() => (n * 27 + 274) % 97, [n]);
  const v28 = useMemo(() => (n * 28 + 274) % 97, [n]);
  const v29 = useMemo(() => (n * 29 + 274) % 97, [n]);
  return (
    <section data-leaf={seed}>
      <span>{v0}</span>
      <span>{v1}</span>
      <span>{v2}</span>
      <span>{v3}</span>
      <span>{v4}</span>
      <span>{v5}</span>
      <span>{v6}</span>
      <span>{v7}</span>
      <span>{v8}</span>
      <span>{v9}</span>
      <span>{v10}</span>
      <span>{v11}</span>
      <span>{v12}</span>
      <span>{v13}</span>
      <span>{v14}</span>
      <span>{v15}</span>
      <span>{v16}</span>
      <span>{v17}</span>
      <span>{v18}</span>
      <span>{v19}</span>
      <span>{v20}</span>
      <span>{v21}</span>
      <span>{v22}</span>
      <span>{v23}</span>
      <span>{v24}</span>
      <span>{v25}</span>
      <span>{v26}</span>
      <span>{v27}</span>
      <span>{v28}</span>
      <span>{v29}</span>
      <Suspense fallback={null}>{n % 3 === 0 ? <Nested0 /> : null}</Suspense>
      <Suspense fallback={null}>{n % 3 === 1 ? <Nested1 /> : null}</Suspense>
    </section>
  );
}
