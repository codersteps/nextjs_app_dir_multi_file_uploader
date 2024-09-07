import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1 className="text-2xl font-bold">
        Codersteps project for Building a File Uploader with Next.js App Router
      </h1>
      <div>
        <Link
          className="text-sm font-medium text-blue-500 hover:underline"
          href="/uploader"
        >
          Go to the Uploader page
        </Link>
      </div>
    </div>
  );
}
