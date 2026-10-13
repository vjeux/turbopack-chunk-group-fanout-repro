//! Generate a synthetic Next.js App Router application with the shape that makes Turbopack's
//! chunking fan out: many routes whose client graphs reach a large set of shared client
//! components, each of which lazily imports leaf client components (`import()`), optionally
//! with nested dynamic imports between leaves. With nested async chunking (the default in
//! `next build`) Turbopack computes one async chunk group per (dynamic import × parent chunk
//! group), so the number of chunk groups is routes × reachable dynamic imports.
//!
//! Usage: tpgen --out <dir> [--routes 300] [--shared 200] [--lazy 600] [--leaf-lines 30] [--nest 2]
//!
//! Layout written under `<dir>`:
//!   package.json, next.config.ts, tsconfig.json, .gitignore, README.md,
//!   app/layout.tsx, app/page.tsx,
//!   app/r<i>/page.tsx          server component rendering a window of the shared components,
//!   components/shared<j>.tsx   "use client"; lazily imports a few leaves,
//!   lazy/leaf<k>.tsx           a client component of `--leaf-lines` hook lines, with `--nest`
//!                              nested `import()`s of other leaves.

use std::{fs, path::PathBuf};

use anyhow::{Context, Result};

struct Opts {
    out: PathBuf,
    routes: usize,
    shared: usize,
    lazy: usize,
    leaf_lines: usize,
    nest: usize,
}

fn parse() -> Result<Opts> {
    let mut out = None;
    let mut routes = 300usize;
    let mut shared = 200usize;
    let mut lazy = 600usize;
    let mut leaf_lines = 30usize;
    let mut nest = 2usize;
    let args: Vec<String> = std::env::args().skip(1).collect();
    let mut i = 0;
    while i < args.len() {
        let next = |i: usize| -> Result<&String> { args.get(i + 1).context("missing value") };
        match args[i].as_str() {
            "--out" => out = Some(PathBuf::from(next(i)?)),
            "--routes" => routes = next(i)?.parse()?,
            "--shared" => shared = next(i)?.parse()?,
            "--lazy" => lazy = next(i)?.parse()?,
            "--leaf-lines" => leaf_lines = next(i)?.parse()?,
            "--nest" => nest = next(i)?.parse()?,
            other => anyhow::bail!("unknown flag {other}"),
        }
        i += 2;
    }
    Ok(Opts {
        out: out.context("--out is required")?,
        routes,
        shared,
        lazy,
        leaf_lines,
        nest,
    })
}

fn write(path: PathBuf, content: String) -> Result<()> {
    if let Some(parent) = path.parent() {
        fs::create_dir_all(parent)?;
    }
    fs::write(&path, content).with_context(|| format!("writing {}", path.display()))
}

fn main() -> Result<()> {
    let o = parse()?;
    let root = &o.out;
    fs::create_dir_all(root)?;

    write(
        root.join("package.json"),
        r#"{
  "name": "turbopack-chunk-group-fanout-repro",
  "private": true,
  "scripts": {
    "build": "next build"
  },
  "dependencies": {
    "next": "canary",
    "react": "^19.2.0",
    "react-dom": "^19.2.0"
  },
  "devDependencies": {
    "@types/node": "^24",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "typescript": "^5.9"
  }
}
"#
        .to_string(),
    )?;
    write(
        root.join(".gitignore"),
        "node_modules\n.next\n.next-profiles\nnext-env.d.ts\n*.tsbuildinfo\n".to_string(),
    )?;
    write(
        root.join("next.config.ts"),
        r#"import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: { ignoreBuildErrors: true },
  experimental: {
    // FS_CACHE=0 builds with the filesystem cache off, for comparison.
    turbopackFileSystemCacheForBuild: process.env.FS_CACHE !== "0",
  },
};

export default nextConfig;
"#
        .to_string(),
    )?;
    write(
        root.join("tsconfig.json"),
        r#"{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
"#
        .to_string(),
    )?;
    write(
        root.join("app/layout.tsx"),
        r#"export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
"#
        .to_string(),
    )?;
    write(
        root.join("app/page.tsx"),
        format!(
            "export default function Home() {{\n  return <main>{} routes, {} shared client components, {} lazy leaves, nest {}</main>;\n}}\n",
            o.routes, o.shared, o.lazy, o.nest
        ),
    )?;

    // Leaves: client components of `leaf_lines` hook lines each, only ever reached through a
    // dynamic import, each lazily importing `nest` other leaves.
    for k in 0..o.lazy {
        let mut body = String::new();
        body.push_str(
            "\"use client\";\nimport { lazy, Suspense, useEffect, useMemo, useState } from \"react\";\n\n",
        );
        for d in 0..o.nest {
            let target = (k * 7 + d * 131 + 1) % o.lazy;
            body.push_str(&format!(
                "const Nested{d} = lazy(() => import(\"../lazy/leaf{target}\"));\n"
            ));
        }
        body.push_str(&format!(
            "export default function Leaf{k}({{ seed = {k} }}: {{ seed?: number }}) {{\n  const [n, setN] = useState(seed);\n  useEffect(() => {{\n    const t = setTimeout(() => setN((v) => v + 1), 1000);\n    return () => clearTimeout(t);\n  }}, []);\n"
        ));
        for line in 0..o.leaf_lines {
            body.push_str(&format!(
                "  const v{line} = useMemo(() => (n * {line} + {k}) % 97, [n]);\n"
            ));
        }
        body.push_str("  return (\n    <section data-leaf={seed}>\n");
        for line in 0..o.leaf_lines {
            body.push_str(&format!("      <span>{{v{line}}}</span>\n"));
        }
        for d in 0..o.nest {
            body.push_str(&format!(
                "      <Suspense fallback={{null}}>{{n % {m} === {d} ? <Nested{d} /> : null}}</Suspense>\n",
                m = o.nest + 1
            ));
        }
        body.push_str("    </section>\n  );\n}\n");
        write(root.join(format!("lazy/leaf{k}.tsx")), body)?;
    }

    // Shared client components: each lazily imports a few leaves, so every route that renders it
    // reaches those dynamic imports. Leaves are spread over the shared components.
    let per_shared = o.lazy.div_ceil(o.shared);
    for j in 0..o.shared {
        let mut body = String::new();
        body.push_str("\"use client\";\nimport { lazy, Suspense, useState } from \"react\";\n\n");
        let leaves: Vec<usize> = (0..per_shared)
            .map(|x| (j * per_shared + x) % o.lazy)
            .collect();
        for (idx, k) in leaves.iter().enumerate() {
            body.push_str(&format!(
                "const Leaf{idx} = lazy(() => import(\"../lazy/leaf{k}\"));\n"
            ));
        }
        body.push_str(&format!(
            "\nexport default function Shared{j}() {{\n  const [open, setOpen] = useState<number | null>(null);\n  return (\n    <div data-shared=\"{j}\">\n      <button onClick={{() => setOpen((o) => (o === null ? 0 : (o + 1) % {n}))}}>shared {j}</button>\n      <Suspense fallback={{null}}>\n",
            n = leaves.len()
        ));
        for idx in 0..leaves.len() {
            body.push_str(&format!("        {{open === {idx} ? <Leaf{idx} /> : null}}\n"));
        }
        body.push_str("      </Suspense>\n    </div>\n  );\n}\n");
        write(root.join(format!("components/shared{j}.tsx")), body)?;
    }

    // Routes: server components rendering a window of the shared components. Route `i` renders
    // shared components `i .. i + shared/2` (wrapping), so every route has a distinct set of
    // client modules in its page chunks (a distinct availability for its async chunk groups)
    // while the sets overlap heavily, like an application with many screens built from one
    // component library.
    let window = (o.shared / 2).max(1);
    for i in 0..o.routes {
        let mut body = String::new();
        let mut names = Vec::new();
        for k in 0..window {
            let j = (i + k) % o.shared;
            body.push_str(&format!(
                "import Shared{j} from \"../../components/shared{j}\";\n"
            ));
            names.push(format!("<Shared{j} />"));
        }
        body.push_str(&format!(
            "\nexport const dynamic = \"force-dynamic\";\n\nexport default function Route{i}() {{\n  return (\n    <main data-route=\"{i}\">\n"
        ));
        for n in &names {
            body.push_str(&format!("      {n}\n"));
        }
        body.push_str("    </main>\n  );\n}\n");
        write(root.join(format!("app/r{i}/page.tsx")), body)?;
    }

    println!(
        "wrote {} routes, {} shared components, {} leaves (nest {}) under {}",
        o.routes,
        o.shared,
        o.lazy,
        o.nest,
        root.display()
    );
    Ok(())
}
