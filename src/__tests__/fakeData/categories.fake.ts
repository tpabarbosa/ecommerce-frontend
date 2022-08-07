import { ICategoriesFromAPI, ICategory } from '../../models/categories';

export const categoriesList: ICategory[] = [
  {
    id: 'c809aa2a-e5d6-458f-b725-0aa9fed3a9de',
    name: 'Historical',
    slug: 'historical',
  },
  {
    id: '70ad80c5-ee80-4260-9cb5-712eaa1cb826',
    name: 'Women',
    slug: 'women',
  },
  {
    id: 'f62ff823-c50e-4691-8a1f-17b9b1ba8697',
    name: 'National Teams',
    slug: 'national-teams',
  },
  {
    id: '24101feb-5f3b-44be-98d3-1d7aed81fb1f',
    name: 'Clubs',
    slug: 'clubs',
  },
  {
    id: 'c865ddc2-8dc4-45e6-9705-21390e77d16f',
    name: 'Authentic',
    slug: 'authentic',
  },
  {
    id: '47c1fe56-0267-4425-8153-b381b8eddd99',
    name: 'Replica',
    slug: 'replica',
  },
  {
    id: '34586146-fada-442c-bee3-c9d683da0c50',
    name: 'Long Sleeve',
    slug: 'long-sleeve',
  },
];

export const categoriesFromAPI: ICategoriesFromAPI = {
  message: 'Categories successfully retrieved',
  data: categoriesList,
  status: 'success',
};
