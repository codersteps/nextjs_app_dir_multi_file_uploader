"use client";

import Image from "next/image";
import { ChangeEvent, useState } from "react";

export function FileUploader({ apiUrl }: { apiUrl: string }) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  async function uploadSelectedFiles() {
    if (apiUrl.trim().length === 0) {
      console.warn("Please provide a valid apiUrl.");
      return [];
    }

    if (selectedFiles.length === 0) {
      return [];
    }

    const formData = new FormData();

    for (const file of selectedFiles) {
      formData.append("files", file);
    }

    try {
      const res = await fetch(apiUrl, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        console.error("something went wrong, check your console.");
        return [];
      }

      const data: { uploadedFiles: string[] } = await res.json();
      return data.uploadedFiles;
    } catch (error) {
      console.error("something went wrong, check your server/client console.");
    }

    return [];
  }

  async function onChange(e: ChangeEvent<HTMLInputElement>) {
    const { files } = e.target;

    if (!files || files.length === 0) {
      console.warn("files list is empty");
      return;
    }

    setSelectedFiles(Array.from(files));
  }

  async function onUpload() {
    setUploadedFiles(await uploadSelectedFiles());
    console.log("All files were uploaded successfully.");

    setSelectedFiles([]);
  }

  function onClear() {
    setSelectedFiles([]);
    setUploadedFiles([]);
  }

  if (selectedFiles.length === 0 && uploadedFiles.length === 0) {
    return (
      <label className="border border-dashed border-[#666666] hover:border-black rounded bg-gray-100 hover:bg-gray-200 text-[#666666] hover:text-black transition-colors duration-300 h-48 flex items-center justify-center">
        <span className="text-sm font-medium">Select an Image</span>
        <input
          className="h-0 w-0"
          type="file"
          accept="image/*"
          multiple
          onChange={onChange}
        />
      </label>
    );
  }

  if (selectedFiles.length > 0 || uploadedFiles.length > 0) {
    return (
      <div className="border border-dashed border-gray-700 hover:border-black rounded">
        <div className="grid grid-cols-2 gap-3 p-3">
          {selectedFiles.map((selectedFile, idx) => (
            <div key={idx}>
              <Image
                src={URL.createObjectURL(selectedFile)}
                alt={selectedFile.name}
                width={500}
                height={500}
                quality={100}
                className="object-cover w-full h-auto"
              />
            </div>
          ))}

          {uploadedFiles.map((uploadedFile, idx) => (
            <div key={idx}>
              <Image
                src={uploadedFile}
                alt="An uploaded file"
                width={500}
                height={500}
                quality={100}
                className="object-cover w-full h-auto"
              />
            </div>
          ))}
        </div>
        <div className="flex items-center justify-end gap-x-3 border-t border-dashed p-3 border-gray-700">
          <button
            type="button"
            onClick={onClear}
            className="bg-zinc-300 hover:bg-zinc-200 transition-colors duration-300 px-3 h-10 rounded"
          >
            Clear
          </button>
          {uploadedFiles.length === 0 && (
            <button
              type="button"
              onClick={onUpload}
              className="bg-sky-500 hover:bg-sky-600 transition-colors duration-300 text-white px-3 h-10 rounded"
            >
              Upload
            </button>
          )}
        </div>
      </div>
    );
  }

  return null;
}
