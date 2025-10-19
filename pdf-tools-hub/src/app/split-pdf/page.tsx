"use client";
import { useState } from "react";
import { Dropzone } from "@/components/ui/Dropzone";
import { ToolShell } from "@/components/ui/ToolShell";
import { Progress } from "@/components/ui/Progress";
import { splitPdfByRanges } from "@/lib/pdf";
import { downloadBytes } from "@/lib/download";

export default function Page() {
  const [progress, setProgress] = useState<number>(0);
  const [busy, setBusy] = useState<boolean>(false);
  const [ranges, setRanges] = useState<string>("1-1");

  async function handle(files: File[]) {
    if (!files?.length) return;
    setBusy(true);
    setProgress(10);
    try {
      const outputs = await splitPdfByRanges(files[0], parseRanges(ranges));
      outputs.forEach((bytes, idx) => downloadBytes(bytes, `split-${idx + 1}.pdf`));
      setProgress(100);
    } finally {
      setBusy(false);
      setTimeout(() => setProgress(0), 600);
    }
  }

  return (
    <ToolShell title="Split PDF" subtitle="Extract specific pages or ranges.">
      <div className="glass-card p-4">
        <label className="text-sm text-white/80">Ranges (e.g. 1-2,4,6-9)</label>
        <input
          value={ranges}
          onChange={(e) => setRanges(e.target.value)}
          className="mt-2 w-full bg-transparent border border-white/15 rounded px-3 py-2 outline-none focus:border-white/30"
          placeholder="1-2,4,6-9"
        />
      </div>
      <Dropzone accept={{ "application/pdf": [".pdf"] }} multiple={false} onFiles={handle} title="Drop a PDF" />
      {busy ? <Progress value={progress} /> : null}
    </ToolShell>
  );
}

function parseRanges(input: string): Array<[number, number]> {
  const parts = input.split(/\s*,\s*/).filter(Boolean);
  const ranges: Array<[number, number]> = [];
  for (const p of parts) {
    if (p.includes("-")) {
      const [a, b] = p.split("-").map((x) => parseInt(x, 10) - 1);
      if (Number.isFinite(a) && Number.isFinite(b) && a <= b) ranges.push([a, b]);
    } else {
      const i = parseInt(p, 10) - 1;
      if (Number.isFinite(i)) ranges.push([i, i]);
    }
  }
  return ranges;
}
