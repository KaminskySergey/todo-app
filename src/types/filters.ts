export interface IFilters {
  filters: {
    category: IItemWithCount[];
    brand: IItemWithCount[];
    subcategory: ISubcategoryWithCount[];
  };
  price: {
    minPrice: number;
    maxPrice: number;
  };
}

export interface IItemWithCount {
  id: number;
  name: string;
  count: number; 
}

export interface ISubcategoryWithCount {
  name: string;
  count: number; 
}
