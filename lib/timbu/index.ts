import { API_ROOT_URL, DEFAULT_PARAMS } from "./constants";
import { Product } from "./types";

type ProductsResult = {
  page: number;
  size: number;
  total: number;
  previous_page: string | null;
  next_page: string | null;
  items: Product[];
};

export const fetchProducts = async (extraParams: Record<string, any> = {}) => {
  const params = new URLSearchParams({ ...DEFAULT_PARAMS, ...extraParams });
  const res = await fetch(`${API_ROOT_URL}/products?${params} `);

  if (!res.ok) {
    throw Error("Error fetching products");
  }

  const data = (await res.json()) as ProductsResult;
  return data;
};

export const fetchProduct = async (productId: string) => {
  const params = new URLSearchParams(DEFAULT_PARAMS);
  const res = await fetch(`${API_ROOT_URL}/products/${productId}?${params}`);

  if (!res.ok) {
    throw Error("Error fetching products");
  }

  const data = (await res.json()) as Product | null;
  return data;
};
