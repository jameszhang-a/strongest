import Link from "next/link";

export default function Navbar() {
  return (
    <div className="sticky top-0 flex w-full flex-row justify-center ">
      <nav className="flex flex-row items-center gap-3">
        <Link
          href="/"
          className="text-[#f2f2f2] hover:text-[#f2f2f2] hover:underline"
        >
          Vote
        </Link>
        <Link
          href="/results"
          className="text-[#f2f2f2] hover:text-[#f2f2f2] hover:underline"
        >
          Results
        </Link>
      </nav>
    </div>
  );
}
