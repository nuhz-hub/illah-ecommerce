export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  image_url: string | null;
  category: string | null;
  stock: number;
  seller_id: string;
  created_at: string;
  updated_at: string;
};