"use client";
import { useState } from "react";
import { Dropzone } from "@/components/ui/Dropzone";
import { ToolShell } from "@/components/ui/ToolShell";
import { Progress } from "@/components/ui/Progress";
import { mergePdfs } from "@/lib/pdf";
import { downloadBytes } from "@/lib/download";

export default function Page() {
  const [progress, setProgress] = useState<number>(0);
  const [busy, setBusy] = useState<boolean>(false);

  async function handle(files: File[]) {
    if (!files?.length) return;
    setBusy(true);
    setProgress(10);
    try {
      const bytes = await mergePdfs(files);
      setProgress(90);
      downloadBytes(bytes, "merged.pdf");
      setProgress(100);
    } finally {
      setBusy(false);
      setTimeout(() => setProgress(0), 600);
    }
  }

  return (
    <ToolShell title="Merge PDFs" subtitle="Combine multiple PDF files locally in your browser.">
      <Dropzone
        accept={{ "application/pdf": [".pdf"] }}
        multiple
        onFiles={handle}
        title="Drag & Drop PDFs"
        subtitle="Files stay on your device"
      />
      {busy ? <Progress value={progress} /> : null}
    </ToolShell>
  );
}
