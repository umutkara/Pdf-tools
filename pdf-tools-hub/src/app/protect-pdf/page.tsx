"use client";
import { useState } from "react";
import { Dropzone } from "@/components/ui/Dropzone";
import { ToolShell } from "@/components/ui/ToolShell";
import { Progress } from "@/components/ui/Progress";
import { addPassword } from "@/lib/pdf";
import { downloadBytes } from "@/lib/download";

export default function Page() {
  const [progress, setProgress] = useState<number>(0);
  const [busy, setBusy] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");

  async function handle(files: File[]) {
    if (!files?.length || !password) return;
    setBusy(true);
    setProgress(10);
    try {
      const bytes = await addPassword(files[0], password);
      setProgress(90);
      downloadBytes(bytes, "protected.pdf");
      setProgress(100);
    } finally {
      setBusy(false);
      setTimeout(() => setProgress(0), 600);
    }
  }

  return (
    <ToolShell title="Add Password" subtitle="Add password protection (placeholder re-save).">
      <div className="glass-card p-4">
        <label className="text-sm text-white/80">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-2 w-full bg-transparent border border-white/15 rounded px-3 py-2 outline-none focus:border-white/30"
          placeholder="Enter password"
        />
      </div>
      <Dropzone accept={{ "application/pdf": [".pdf"] }} multiple={false} onFiles={handle} title="Drop a PDF" />
      {busy ? <Progress value={progress} /> : null}
    </ToolShell>
  );
}
