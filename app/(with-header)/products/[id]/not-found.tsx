import Link from "next/link";

export default function NotFound() {
  return (
    <main className="w-full lg:w-[1072px] mx-auto stack gap-8 lg:my-[55px] justify-center items-center p-6 md:p-12 bg-white lg:rounded-3xl min-h-[400px]">
      <h1 className="text-[2rem] font-semibold">Product not found</h1>
      <Link href="/" className="underline text-xl hover:no-underline">
        Back to home
      </Link>
    </main>
  );
}
