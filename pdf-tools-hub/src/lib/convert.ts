import { PDFDocument, StandardFonts } from "pdf-lib";
import JSZip from "jszip";

export async function imagesToPdf(files: File[]): Promise<Uint8Array> {
  const pdf = await PDFDocument.create();
  for (const file of files) {
    const bytes = new Uint8Array(await file.arrayBuffer());
    const mime = file.type || "image/jpeg";
    let img;
    if (mime.includes("png")) {
      img = await pdf.embedPng(bytes);
    } else {
      img = await pdf.embedJpg(bytes);
    }
    const page = pdf.addPage([img.width, img.height]);
    page.drawImage(img, { x: 0, y: 0, width: img.width, height: img.height });
  }
  return await pdf.save();
}

export async function pdfToImagesZip(_file: File): Promise<Uint8Array> {
  // Placeholder: true rasterization in-browser requires pdf.js rendering to canvas then zipping
  const zip = new JSZip();
  zip.file("readme.txt", "Rasterization requires pdf.js and canvas; not implemented here.");
  return await zip.generateAsync({ type: "uint8array" });
}

export async function pdfToWordPlaceholder(): Promise<Uint8Array> {
  const zip = new JSZip();
  zip.file("readme.txt", "PDF → Word is non-trivial client-side. Consider server or Wasm.");
  return await zip.generateAsync({ type: "uint8array" });
}

export async function wordToPdfPlaceholder(): Promise<Uint8Array> {
  const pdf = await PDFDocument.create();
  const page = pdf.addPage([612, 792]);
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  page.drawText("DOCX → PDF conversion placeholder.", { x: 50, y: 740, size: 18, font });
  return await pdf.save();
}
