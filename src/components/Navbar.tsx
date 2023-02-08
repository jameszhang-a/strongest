import Link from "next/link";

export default function Navbar() {
  return (
    <div className="absolute top-0 flex w-full flex-row justify-center">
      <nav className="flex flex-row items-center gap-3 ">
        <Link href="/">Vote</Link>
        <Link href="/results">Results</Link>
      </nav>
    </div>
  );
}
