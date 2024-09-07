import { FileUploader } from "@/components";

export default function Page() {
  return (
    <div className="space-y-3">
      <h1 className="text-xl font-bold">File Uploader Form</h1>
      <FileUploader apiUrl="/api/upload" />
    </div>
  );
}
