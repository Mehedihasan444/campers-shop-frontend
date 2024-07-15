export interface TQueries {
  searchTerm?: number;
  limit?: number;
  page?: number;
  sort?: string;
  filter?: string;
  category?: string;
  brand?: string;
  minPrice?:number, 
  maxPrice?:number
}