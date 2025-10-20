export interface Category {
  id: number;
  name: string;
}

export interface PageInfo {
  size: number;
  number: number;
  totalElements: number;
  totalPages: number;
}

export interface GetCategoriesResponse {
  content: Category[];
  page: PageInfo;
}
