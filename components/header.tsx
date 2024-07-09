import Link from "next/link";

export default function Header() {
  return (
    <header className="flex justify-center py-5 border-b border-gray-1">
      <Link href="/" className="font-semibold text-xl">
        <span>Gadget</span>
        <span className="text-purple">HAVEN</span>
      </Link>
    </header>
  );
}
