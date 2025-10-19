import { PDFDocument } from "pdf-lib";

export async function mergePdfs(files: File[]): Promise<Uint8Array> {
  const merged = await PDFDocument.create();
  for (const file of files) {
    const bytes = new Uint8Array(await file.arrayBuffer());
    const src = await PDFDocument.load(bytes);
    const copiedPages = await merged.copyPages(src, src.getPageIndices());
    copiedPages.forEach((p) => merged.addPage(p));
  }
  return await merged.save();
}

export async function splitPdfByRanges(file: File, ranges: Array<[number, number]>): Promise<Uint8Array[]> {
  const bytes = new Uint8Array(await file.arrayBuffer());
  const src = await PDFDocument.load(bytes);
  const outputs: Uint8Array[] = [];
  for (const [start, end] of ranges) {
    const doc = await PDFDocument.create();
    const indices = Array.from({ length: end - start + 1 }, (_, i) => start + i);
    const copied = await doc.copyPages(src, indices);
    copied.forEach((p) => doc.addPage(p));
    outputs.push(await doc.save());
  }
  return outputs;
}

export async function compressPdf(file: File): Promise<Uint8Array> {
  // pdf-lib doesn't have true compression; we can resave which may shrink slightly.
  const bytes = new Uint8Array(await file.arrayBuffer());
  const doc = await PDFDocument.load(bytes);
  return await doc.save({ useObjectStreams: true });
}

export async function addPassword(file: File, password: string): Promise<Uint8Array> {
  // pdf-lib currently does not support encryption out of the box; placeholder re-save
  const bytes = new Uint8Array(await file.arrayBuffer());
  const doc = await PDFDocument.load(bytes);
  // Note: Proper password protection typically requires qpdf or pdfkit encryption; placeholder only
  return await doc.save();
}

export async function removePassword(file: File): Promise<Uint8Array> {
  // Without decryption ability in browser, this is non-trivial; placeholder re-save if already openable
  const bytes = new Uint8Array(await file.arrayBuffer());
  const doc = await PDFDocument.load(bytes);
  return await doc.save();
}
