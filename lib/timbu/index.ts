import { API_ROOT_URL, DEFAULT_PARAMS } from "./constants";
import { Product, ProductData } from "./types";

type ProductsData = {
  page: number;
  size: number;
  total: number;
  previous_page: string | null;
  next_page: string | null;
  items: ProductData[];
};

const transformProduct = (product: ProductData) => {
  // harmonize type current price to number
  const result = {
    ...product,
    current_price:
      typeof product.current_price === "number" ? product.current_price : product.current_price,
  };
  return result as Product;
};

export const fetchProducts = async (extraParams: Record<string, any> = {}) => {
  const params = new URLSearchParams({ ...DEFAULT_PARAMS, ...extraParams });
  const res = await fetch(`${API_ROOT_URL}/products?${params} `);

  if (!res.ok) {
    throw Error("Error fetching products");
  }

  const data = (await res.json()) as ProductsData;
  return { ...data, items: data.items.map(transformProduct) };
};

export const fetchProduct = async (productId: string) => {
  const params = new URLSearchParams(DEFAULT_PARAMS);
  const res = await fetch(`${API_ROOT_URL}/products/${productId}?${params}`);

  if (!res.ok) {
    if (res.status === 404) return null;

    throw Error("Error fetching product");
  }

  const data = (await res.json()) as Product;

  return transformProduct(data);
};
