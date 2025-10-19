"use client";
import { useCallback } from "react";
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
      <div className="space-y-2">
        <p className="text-lg font-semibold">{title ?? "Drag & Drop files here"}</p>
        <p className="text-white/60 text-sm">{subtitle ?? "or click to select files"}</p>
      </div>
    </div>
  );
}
