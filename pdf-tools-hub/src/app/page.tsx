"use client";
import dynamic from "next/dynamic";
import Link from "next/link";

const tools = [
  { slug: "pdf-to-word", title: "PDF → Word", subtitle: "Convert PDF to DOCX" },
  { slug: "word-to-pdf", title: "Word → PDF", subtitle: "Convert DOCX to PDF" },
  { slug: "merge-pdf", title: "Merge PDFs", subtitle: "Combine multiple PDF files" },
  { slug: "compress-pdf", title: "Compress PDF", subtitle: "Shrink file size" },
  { slug: "split-pdf", title: "Split PDF", subtitle: "Pages or ranges" },
  { slug: "protect-pdf", title: "Add Password", subtitle: "Secure your PDF" },
  { slug: "unprotect-pdf", title: "Remove Password", subtitle: "Unlock your PDF" },
  { slug: "image-to-pdf", title: "Images → PDF", subtitle: "JPG/PNG to PDF" },
];

const ToolsGrid = dynamic(() => Promise.resolve(function ToolsGrid() {
  const tools = [
    { slug: "pdf-to-word", title: "PDF → Word", subtitle: "Convert PDF to DOCX" },
    { slug: "word-to-pdf", title: "Word → PDF", subtitle: "Convert DOCX to PDF" },
    { slug: "merge-pdf", title: "Merge PDFs", subtitle: "Combine multiple PDF files" },
    { slug: "compress-pdf", title: "Compress PDF", subtitle: "Shrink file size" },
    { slug: "split-pdf", title: "Split PDF", subtitle: "Pages or ranges" },
    { slug: "protect-pdf", title: "Add Password", subtitle: "Secure your PDF" },
    { slug: "unprotect-pdf", title: "Remove Password", subtitle: "Unlock your PDF" },
    { slug: "image-to-pdf", title: "Images → PDF", subtitle: "JPG/PNG to PDF" },
  ];
  return (
    <section id="tools" className="max-w-6xl mx-auto mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {tools.map((t) => (
        <Link
          key={t.slug}
          href={`/${t.slug}`}
          className="glass-card neon-hover p-5 flex flex-col gap-2"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">{t.title}</h3>
            <span className="text-[11px] px-2 py-1 rounded-full border border-white/15 text-white/70">Client-side</span>
          </div>
          <p className="text-white/60 text-sm">{t.subtitle}</p>
        </Link>
      ))}
    </section>
  );
}), { ssr: false });

export default function Home() {
  return (
    <main className="min-h-[calc(100dvh-0px)] px-6 sm:px-8 md:px-12 py-16">
      <section className="max-w-6xl mx-auto text-center space-y-6">
        <p className="text-[12px] tracking-widest uppercase text-white/70">Smart PDF Toolkit</p>
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-semibold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70">
          PDF Tools Hub
        </h1>
        <p className="text-white/70 text-lg sm:text-xl max-w-2xl mx-auto">
          Your All-in-One Smart PDF Toolkit
        </p>
        <div className="flex items-center justify-center gap-3 pt-2">
          <Link href="#tools" className="btn-primary">Start Now</Link>
          <a href="#tools" className="btn-ghost">Explore Tools</a>
        </div>
      </section>

      <ToolsGrid />
    </main>
  );
}
