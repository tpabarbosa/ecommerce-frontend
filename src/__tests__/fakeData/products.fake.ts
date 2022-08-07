import { IProduct, IProductDetails, ISize } from '../../models';

export const productsList: IProduct[] = [
  {
    id: '052066df-c901-4aa9-91a8-c325ee4bc4a0',
    name: 'Camisa Cruzeiro Centenário I 21/22- Torcedor Masculina - Azul',
    slug: 'camisa-cruzeiro-centenario-i-2122-torcedor-masculina-azul',
    price: 129.9,
    photos: [
      {
        description: null,
        url: 'https://d3ugyf2ht6aenh.cloudfront.net/stores/001/548/427/products/nqq-7747-008_zoom11-e3c7f5c1d1aa0823c716196141230132-480-0.jpg',
      },
    ],
    sizes: ['L', 'M', 'S'],
  },
  {
    id: '857f213c-5c28-40d2-8c6d-52956b7dca7d',
    name: 'Camisa Flamengo Consciência Negra 21/22 - Torcedor Masculina - Adidas - Preta - EXCELÊNCIA NEGRA',
    slug: 'camisa-flamengo-consciencia-negra-2122-torcedor-masculina-adidas-preta-excelencia-negra',
    price: 189,
    photos: [
      {
        description: null,
        url: 'https://d3ugyf2ht6aenh.cloudfront.net/stores/001/548/427/products/camisa_excelencia_negra_flamengo_preto_ga0760_01_laydown1-90ada953e76c5c001016375938515662-480-0.jpg',
      },
    ],
    sale: {
      campaing: 'Black Friday nov/22',
      campaing_label: 'Black Friday',
      discount: 50,
      badge:
        'assets/images/badges/y2020-09-12-02_generated-removebg-preview.png',
      start_date: new Date('2022-08-01T00:00:00.000Z'),
      end_date: new Date('2022-11-01T00:00:00.000Z'),
    },
    sizes: ['XL', 'XXL'],
  },
];

export const productDetails: IProductDetails = {
  id: '052066df-c901-4aa9-91a8-c325ee4bc4a0',
  name: 'Camisa Cruzeiro Centenário I 21/22- Torcedor Masculina - Azul',
  slug: 'camisa-cruzeiro-centenario-i-2122-torcedor-masculina-azul',
  price: 129.9,
  description: 'Camisa comemorativa',
  photos: [
    {
      id: '9a4d02bc-8714-4bf1-bf13-321218d5eaa9',
      description: null,
      url: 'https://d3ugyf2ht6aenh.cloudfront.net/stores/001/548/427/products/nqq-7747-008_zoom11-e3c7f5c1d1aa0823c716196141230132-480-0.jpg',
      created_at: new Date('2022-08-01T19:27:55.469Z'),
      updated_at: new Date('2022-08-01T19:27:55.469Z'),
    },
  ],
  categories: [
    {
      id: '24101feb-5f3b-44be-98d3-1d7aed81fb1f',
      name: 'Clubs',
      slug: 'clubs',
      created_at: new Date('2022-08-01T20:46:15.286Z'),
      updated_at: new Date('2022-08-01T20:46:15.286Z'),
    },
    {
      id: 'c865ddc2-8dc4-45e6-9705-21390e77d16f',
      name: 'Authentic',
      slug: 'authentic',
      created_at: new Date('2022-08-01T20:47:16.251Z'),
      updated_at: new Date('2022-08-01T20:47:16.251Z'),
    },
  ],
  sizes: [
    {
      id: 'eff749c6-4dd1-4b94-bc91-de721eadf33b',
      name: 'S',
      created_at: new Date('2022-08-01T20:21:51.638Z'),
      updated_at: new Date('2022-08-01T20:21:51.638Z'),
    },
    {
      id: 'e949c6af-3731-4502-a319-6b0be154bbc2',
      name: 'M',
      created_at: new Date('2022-08-01T20:22:04.000Z'),
      updated_at: new Date('2022-08-01T20:22:04.000Z'),
    },
    {
      id: '7b849c1f-41f4-4186-867a-758c2f10969d',
      name: 'L',
      created_at: new Date('2022-08-01T20:22:08.034Z'),
      updated_at: new Date('2022-08-01T20:22:08.034Z'),
    },
  ] as ISize[],
  created_at: new Date('2022-08-01T19:27:55.469Z'),
  updated_at: new Date('2022-08-01T19:27:55.469Z'),
};
