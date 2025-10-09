export interface IProduct {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  description: string;
  rating: number;
  discount: number | null;
  quantity: number | null;
  price: number;
  images: string[];
  finalPrice: number;
  brand: {
    id: number,
    name: string,
  };
  tags: string[];
  subcategory: string;
  category: {
    id: number, 
    createdAt: string, 
    updatedAt: string, 
    name: string
  };
  categoryId: number;
  brandId: number;
}

export interface IProductPage {
  currentPage: number
  results: IProduct[]
  totalPages: number
  limit: number
  totalRecords: number
}

export interface ICartState extends IProduct {
  quantity: number
}