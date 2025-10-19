"use client";

export function Progress({ value }: { value: number }) {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
      <div className="h-full bg-gradient-to-r from-cyan-400 to-fuchsia-500" style={{ width: `${clamped}%` }} />
    </div>
  );
}
