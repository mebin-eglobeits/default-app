export interface CategoriesInterface {
  id: number;
  parent_id: number;
  name: string;
  displayName: string;
  is_active?: boolean;
  position?: number;
  level: number;
  product_count?: number;
  children_data?: CategoriesInterface[];
}
