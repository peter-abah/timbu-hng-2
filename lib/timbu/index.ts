import { API_ROOT_URL, DEFAULT_PARAMS } from "./constants";
import { Product } from "./types";

export const fetchProducts = async () => {
  const params = new URLSearchParams(DEFAULT_PARAMS);
  const res = await fetch(`${API_ROOT_URL}/products?${params}`);

  if (!res.ok) {
    throw Error("Error fetching products");
  }

  const data = (await res.json()) as {
    page: number;
    size: number;
    total: number;
    previous_page: string | null;
    next_page: string | null;
    items: Product[];
  };

  return data;
};
