import Link from "next/link";
import { twMerge } from "tailwind-merge";

type Props = {
  page: number;
  isPrevPage: boolean;
  isNextPage: boolean;
  total: number;
  size: number;
};

export default function Pagination({ page, isNextPage, isPrevPage, total, size }: Props) {
  const prevLink = isPrevPage ? `?page=${page - 1}` : "#";
  const nextLink = isNextPage ? `?page=${page + 1}` : "#";
  const pagesNo = Math.floor(total / size) + (total % size ? 1 : 0);

  return (
    <nav aria-label="Page navigation" className="flex justify-center">
      <ul className="inline-flex rounded-lg overflow-hidden border border-gray-300">
        {isPrevPage && (
          <li>
            <Link
              href={prevLink}
              className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border-r border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 "
            >
              Previous
            </Link>
          </li>
        )}
        {Array.from({ length: pagesNo }, (x, i) => i + 1).map((n) => (
          <li key={n}>
            <Link
              href={page === n ? "#" : `?page=${n}`}
              className={twMerge(
                "flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border-r border-gray-300 hover:bg-gray-100 hover:text-gray-700 ",
                page === n && "bg-purple-3 text-white hover:bg-purple-3/90 hover:text-white"
              )}
            >
              {n}
            </Link>
          </li>
        ))}
        {isNextPage && (
          <li>
            <Link
              href={nextLink}
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 "
            >
              Next
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
