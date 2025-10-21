"use client";
import { useCallback } from "react";
import { UploadCloud } from "lucide-react";
import { useDropzone } from "react-dropzone";

type DropzoneProps = {
  accept?: { [mime: string]: string[] };
  multiple?: boolean;
  onFiles: (files: File[]) => void;
  title?: string;
  subtitle?: string;
  className?: string;
};

export function Dropzone({ accept, multiple = true, onFiles, title, subtitle, className }: DropzoneProps) {
  const onDrop = useCallback((accepted: File[]) => {
    onFiles(accepted);
  }, [onFiles]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept, multiple });

  return (
    <div
      {...getRootProps()}
      className={`glass-card neon-hover p-8 text-center cursor-pointer border-dashed border-2 transition-colors ${isDragActive ? "border-white/40" : "border-white/15"} ${className ?? ""}`}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center gap-3">
        <div className="p-3 rounded-full bg-white/10 border border-white/15 shadow-sm">
          <UploadCloud className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <p className="text-lg font-semibold">{title ?? "Drag & Drop files here"}</p>
          <p className="text-white/60 text-sm">{subtitle ?? "or click to select files"}</p>
        </div>
      </div>
    </div>
  );
}
