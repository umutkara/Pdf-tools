"use client";
import { ReactNode } from "react";

export function ToolShell({ title, subtitle, children }: { title: string; subtitle?: string; children: ReactNode }) {
  return (
    <div className="min-h-[calc(100dvh-0px)] px-6 sm:px-8 md:px-12 py-14">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl sm:text-4xl font-semibold">{title}</h1>
          {subtitle ? <p className="text-white/70">{subtitle}</p> : null}
        </div>
        <div className="grid gap-4">
          {children}
        </div>
      </div>
    </div>
  );
}
