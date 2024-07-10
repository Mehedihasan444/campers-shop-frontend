export interface TProduct {
    name: string;
    price: number;
    quantity: number;
    description: string;
    category: string;
    image: string;
    rating: number;
    _id: string;
    inStock: boolean;
    isFeatured: boolean;
    isBestseller: boolean;
    // isNew: boolean;
    isPopular: boolean;
    isSoldOut: boolean;
    isDiscounted: {
      type: boolean;
      required: true;
      default: false;
    };
    isOutofstock: boolean;
    isComingSoon: boolean;
    createdAt: string;
    updatedAt: string
  }