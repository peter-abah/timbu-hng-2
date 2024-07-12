export type Product = {
  id: string;
  name: string;
  description?: string;
  categories: { name: string }[];
  photos: Array<{
    url: string;
    position: string;
  }>;
  current_price: [
    {
      NGN: [number];
    }
  ];
  available_quantity: number;
};
