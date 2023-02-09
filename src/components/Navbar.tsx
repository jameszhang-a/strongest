import Link from "next/link";

export default function Navbar() {
  return (
    <div className="top-0 flex w-full flex-row justify-center ">
      <nav className="flex flex-row rounded-lg  p-2 dark:bg-zinc-800 md:mt-3 md:flex-row md:space-x-8 md:text-sm md:font-medium">
        <Link
          href="/"
          className="block rounded py-2 pl-3 pr-4 text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-white"
        >
          Vote
        </Link>
        <Link
          href="/results"
          className="block rounded py-2 pl-3 pr-4 text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-white"
        >
          Results
        </Link>
      </nav>
    </div>
  );
}
