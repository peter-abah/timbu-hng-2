"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="w-full lg:w-[1072px] mx-auto stack gap-8 lg:my-[55px] justify-center items-center p-6 md:p-12 bg-white lg:rounded-3xl min-h-[400px]">
      <h1 className="text-[2rem] font-semibold">Something went wrong</h1>
      <button onClick={() => reset()} className="underline text-xl hover:no-underline">
        Try again
      </button>
    </main>
  );
}
