export type Product = {
  id: string;
  name: string;
  description?: string;
  category: undefined; // TODO: Remove if you can't add category
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
