"use client";
import { useState } from "react";
import { Dropzone } from "@/components/ui/Dropzone";
import { ToolShell } from "@/components/ui/ToolShell";
import { Progress } from "@/components/ui/Progress";
import { removePassword } from "@/lib/pdf";
import { downloadBytes } from "@/lib/download";

export default function Page() {
  const [progress, setProgress] = useState<number>(0);
  const [busy, setBusy] = useState<boolean>(false);

  async function handle(files: File[]) {
    if (!files?.length) return;
    setBusy(true);
    setProgress(10);
    try {
      const bytes = await removePassword(files[0]);
      setProgress(90);
      downloadBytes(bytes, "unprotected.pdf");
      setProgress(100);
    } finally {
      setBusy(false);
      setTimeout(() => setProgress(0), 600);
    }
  }

  return (
    <ToolShell title="Remove Password" subtitle="Remove password from openable documents (placeholder).">
      <Dropzone accept={{ "application/pdf": [".pdf"] }} multiple={false} onFiles={handle} title="Drop a PDF" />
      {busy ? <Progress value={progress} /> : null}
    </ToolShell>
  );
}
