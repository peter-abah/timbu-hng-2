import CartButton from "@/components/cart-button";
import Pagination from "@/components/pagination";
import ProductCard from "@/components/product-card";
import { groupBy, titleCase } from "@/lib";
import { fetchProducts } from "@/lib/timbu";

const PAGE_SIZE = 10;

// TODO: Make category grouping styling better (maybe)
export default async function Home({ searchParams }: { searchParams: { page?: string } }) {
  const {
    page,
    previous_page,
    next_page,
    items: products,
    total,
    size,
  } = await fetchProducts({ page: searchParams.page || 1, size: PAGE_SIZE });
  const productsByCategory = groupBy(products, (p) => p.categories?.[0]?.name || "uncategorized");
  const categories = Object.keys(productsByCategory);

  return (
    <main className="w-full xl:max-w-[1120px] mx-auto md:my-[55px] flex flex-col gap-8 px-6 sm:px-12">
      <header className="md:flex justify-between hidden">
        <h1 className="text-[2rem] font-semibold">Product Listing</h1>
        <CartButton />
      </header>

      <section className="stack gap-12 md:gap-8 py-4 md:py-0">
        {categories.map((category) => (
          <div key={category} className="flex flex-col gap-4">
            <h2 className="text-gray-4 md:text-xl font-semibold">{titleCase(category)}</h2>
            <ul className="overflow-x-auto shrink grow-0 gap-8 md:gap-8 grid grid-cols-1 min-[500px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {productsByCategory[category].map((product, i) => (
                <ProductCard key={product.name} product={product} />
              ))}
            </ul>
          </div>
        ))}

        <Pagination
          isNextPage={!!next_page}
          isPrevPage={!!previous_page}
          page={page}
          total={total}
          size={size}
        />
      </section>
    </main>
  );
}
