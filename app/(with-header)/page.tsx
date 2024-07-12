import CartButton from "@/components/cart-button";
import ProductCard from "@/components/product-card";
import { fetchProducts } from "@/lib/timbu";

export default async function Home() {
  const { page, previous_page, next_page, items: products } = await fetchProducts();
  // const productsByCategory = groupBy(products, (p) => p.category);
  // const categories = Object.keys(productsByCategory);

  return (
    <main className="w-full lg:w-[1072px] mx-auto md:my-[55px] flex flex-col gap-8 pl-6 md:px-6">
      <header className="md:flex justify-between hidden">
        <h1 className="text-[2rem] font-semibold">Product Listing</h1>
        <CartButton />
      </header>

      <section className="stack gap-12 md:gap-8 py-4 md:py-0">
        {/* {categories.map((category) => (
          <div key={category} className="flex flex-col gap-4">
            <h2 className="text-gray-4 md:text-xl font-semibold">{category}</h2> */}
        <ul className="overflow-x-auto shrink grow-0 gap-4 md:gap-8 grid grid-cols-[repeat(auto-fill,_minmax(232px,_1fr))]">
          {products.map((product, i) => (
            <ProductCard key={product.name} product={product} />
          ))}
        </ul>
        {/* </div>
        ))} */}
      </section>
    </main>
  );
}
