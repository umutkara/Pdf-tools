"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { UploadCloud, Wand2, Scissors, Files, FileText, Images, FileCheck2 } from "lucide-react";
import { Dropzone } from "@/components/ui/Dropzone";
import { useToast } from "@/components/ui/Toast";
import { Progress } from "@/components/ui/Progress";

function ToolsGrid() {
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
}

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "selected" | "processing" | "done" | "error">("idle");
  const [progress, setProgress] = useState<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  function formatBytes(bytes: number): string {
    if (!Number.isFinite(bytes)) return "";
    const units = ["B", "KB", "MB", "GB", "TB"] as const;
    const i = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
    const value = bytes / Math.pow(1024, i);
    return `${value.toFixed(value >= 100 ? 0 : value >= 10 ? 1 : 2)} ${units[i]}`;
  }

  const { show } = useToast();

  function onFiles(files: File[]): void {
    const f = files?.[0];
    if (!f) {
      setSelectedFile(null);
      setStatus("idle");
      setProgress(0);
      return;
    }
    if (f.type !== "application/pdf") {
      setSelectedFile(null);
      setStatus("error");
      setProgress(0);
      show("Please select a valid PDF file", "error");
      return;
    }
    setSelectedFile(f);
    setStatus("selected");
    setProgress(0);
    show("PDF file selected", "success");
  }

  function startFakeProcess(): void {
    if (!selectedFile || status === "processing") return;
    setStatus("processing");
    setProgress(0);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setProgress((p) => {
        const next = Math.min(100, p + Math.max(1, Math.round(8 + Math.random() * 12)));
        if (next >= 100) {
          if (timerRef.current) clearInterval(timerRef.current);
          setStatus("done");
          setTimeout(() => setStatus("selected"), 900);
        }
        return next;
      });
    }, 150);
  }

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return (
    <main className="min-h-[calc(100dvh-0px)] px-6 sm:px-8 md:px-12 py-16">
      <section className="max-w-6xl mx-auto text-center space-y-6">
        <p className="text-[12px] tracking-widest uppercase text-white/70">Smart PDF Toolkit</p>
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-semibold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70">
          Upload and Manage Your PDFs
        </h1>
        <p className="text-white/70 text-lg sm:text-xl max-w-2xl mx-auto">
          A clean, fast, and privacy‑friendly PDF toolbox. Upload a PDF to get started.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link href="/merge-pdf" className="btn-primary inline-flex items-center gap-2"><Files className="w-4 h-4"/> Merge PDFs</Link>
          <Link href="/split-pdf" className="btn-ghost inline-flex items-center gap-2"><Scissors className="w-4 h-4"/> Split PDFs</Link>
          <Link href="/compress-pdf" className="btn-ghost inline-flex items-center gap-2"><Wand2 className="w-4 h-4"/> Compress PDFs</Link>
          <Link href="/pdf-to-word" className="btn-ghost inline-flex items-center gap-2"><FileText className="w-4 h-4"/> Convert to Word</Link>
          <Link href="/convert-to-jpg" className="btn-ghost inline-flex items-center gap-2"><Images className="w-4 h-4"/> Convert to JPG</Link>
        </div>
      </section>

      {/* Upload Card */}
      <section className="max-w-3xl mx-auto mt-12">
        <div className="glass-card neon-hover p-6 sm:p-8">
          <div className="flex flex-col items-center text-center gap-4">
            <div className="text-2xl font-semibold">Upload PDF</div>
            <p className="text-white/70 max-w-prose">Select a PDF file to preview its details and simulate processing with a smooth progress indicator.</p>

            <div className="w-full flex flex-col items-center gap-4">
              <Dropzone
                accept={{ "application/pdf": [".pdf"] }}
                multiple={false}
                title="Drag & Drop your PDF"
                subtitle="or click to browse"
                onFiles={onFiles}
              />

              {status === "error" ? (
                <p className="text-red-300 text-sm">Please select a valid PDF file.</p>
              ) : null}

              {selectedFile ? (
                <div className="w-full text-left mt-2 p-4 rounded-lg border border-white/10 bg-white/5">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div className="space-y-1">
                      <div className="font-medium break-all">{selectedFile.name}</div>
                      <div className="text-white/60 text-sm">{formatBytes(selectedFile.size)}</div>
                    </div>
                    <div className="text-sm">
                      <span className={`px-2 py-1 rounded-full border ${status === "processing" ? "border-white/25 text-white/80" : status === "done" ? "border-green-400/40 text-green-300" : "border-white/15 text-white/70"}`}>
                        {status === "selected" && "Ready"}
                        {status === "processing" && "Processing..."}
                        {status === "done" && "Completed"}
                      </span>
                    </div>
                  </div>

                  {status !== "processing" ? (
                    <div className="mt-4 flex gap-3">
                      <button
                        onClick={startFakeProcess}
                        className="btn-primary inline-flex items-center gap-2"
                        disabled={!selectedFile}
                      >
                        <FileCheck2 className="w-4 h-4"/> Process PDF
                      </button>
                      <button
                        onClick={() => { setSelectedFile(null); setStatus("idle"); setProgress(0); }}
                        className="btn-ghost"
                      >
                        Clear
                      </button>
                    </div>
                  ) : null}

                  {status === "processing" ? (
                    <div className="mt-4 space-y-2">
                      <Progress value={progress} />
                      <div className="text-right text-sm text-white/70">{progress}%</div>
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <ToolsGrid />
    </main>
  );
}
