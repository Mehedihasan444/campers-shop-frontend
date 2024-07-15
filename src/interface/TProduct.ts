export interface TProduct {
  name: string;
  price: number;
  quantity: number;
  description: string;
  category: string;
  image: string[];
  rating: number;
  _id: string;
  inStock: boolean;
  isFeatured: boolean;
  isBestseller: boolean;
  brand: string;
  isPopular: boolean;
  isSoldOut: boolean;
  isDiscounted: boolean;
  isOutofstock: boolean;
  isComingSoon: boolean;
  createdAt: string;
  updatedAt: string;
}
