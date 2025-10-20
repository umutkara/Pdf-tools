"use client";
import { useState } from "react";
import { ToolShell } from "@/components/ui/ToolShell";
import { Progress } from "@/components/ui/Progress";
import { downloadBytes } from "@/lib/download";
import { imagesToPdf } from "@/lib/convert";

export default function Page() {
  const [progress, setProgress] = useState<number>(0);
  const [busy, setBusy] = useState<boolean>(false);

  async function handle(files: File[]) {
    if (!files?.length) return;
    setBusy(true);
    setProgress(10);
    try {
      // Placeholder: pack images into a PDF for now.
      const bytes = await imagesToPdf(files);
      setProgress(90);
      downloadBytes(bytes, "images.pdf");
      setProgress(100);
    } finally {
      setBusy(false);
      setTimeout(() => setProgress(0), 600);
    }
  }

  return (
    <ToolShell title="Convert to JPG" subtitle="Upload images to pack into a single PDF (placeholder)">
      <div className="grid gap-2 text-white/70">
        <p>Upload JPG/PNG files to bundle them into a PDF.</p>
        <label className="btn-primary inline-flex w-max cursor-pointer">
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => handle(Array.from(e.target.files || []))}
          />
          Select Images
        </label>
      </div>
      {busy ? <Progress value={progress} /> : null}
    </ToolShell>
  );
}
