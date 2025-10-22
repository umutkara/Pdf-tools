"use client";
import { useState } from "react";
import { Dropzone } from "@/components/ui/Dropzone";
import { ToolShell } from "@/components/ui/ToolShell";
import { Progress } from "@/components/ui/Progress";
import { wordToPdfPlaceholder } from "@/lib/convert";
import { useToast } from "@/components/ui/Toast";
import { downloadBytes } from "@/lib/download";

export default function Page() {
  const [progress, setProgress] = useState<number>(0);
  const [busy, setBusy] = useState<boolean>(false);
  const { show } = useToast();

  async function handle(files: File[]) {
    if (!files?.length) return;
    setBusy(true);
    setProgress(10);
    try {
      const bytes = await wordToPdfPlaceholder();
      setProgress(90);
      downloadBytes(bytes, "converted.pdf");
      setProgress(100);
      show("Converted DOCX to PDF (placeholder)", "success");
    } finally {
      setBusy(false);
      setTimeout(() => setProgress(0), 600);
    }
  }

  return (
    <ToolShell title="Word → PDF" subtitle="Client-side placeholder rendering.">
      <Dropzone accept={{ "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"] }} multiple={false} onFiles={handle} title="Drop a DOCX" />
      {busy ? <Progress value={progress} /> : null}
    </ToolShell>
  );
}
