export interface ICategory {
  id: string;
  name: string;
  slug: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface ICategoriesFromAPI {
  message: string;
  data: ICategory[];
  status: 'success';
}
