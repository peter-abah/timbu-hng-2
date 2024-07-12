import Link from "next/link";

type Props = {
  page: number;
  isPrevPage: boolean;
  isNextPage: boolean;
};
// TODO: Improve styling (maybe)
export default function Pagination({ page, isNextPage, isPrevPage }: Props) {
  const prevLink = isPrevPage ? `?page=${page - 1}` : "#";
  const nextLink = isNextPage ? `?page=${page + 1}` : "#";
  return (
    <div className="flex justify-between gap-8">
      {isPrevPage && (
        <Link
          href={prevLink}
          className="mr-auto underline text-sm hover:no-underline font-semibold"
        >
          Prev
        </Link>
      )}
      {isNextPage && (
        <Link
          href={nextLink}
          className="ml-auto underline text-sm hover:no-underline font-semibold"
        >
          Next
        </Link>
      )}
    </div>
  );
}
