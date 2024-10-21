export const categories = [
  {
    name: 'Wszystkie produkty'
  },
  {
    name: 'Bramy',
    subcategories: ['Bramy segmentowe', 'Bramy rozwierne', 'Bramy uchylne', 'Bramy roletowe', 'Bramy przemysłowe']
  },
  {
    name: 'Automatyka',
    subcategories: ['Bramy garażowe', 'Szyny do napędów', 'Siłowniki przemysłowe', 'Bramy przesuwne', 'Bramy 2-skrzydłowe'],
  },
  {
    name: 'Akcesoria',
    subcategories: ['Piloty', 'Fotokomórki', 'Baterie', 'Radioodbiorniki']
  },
  {
    name: 'Ogrodzenia',
    subcategories: ['Panelowe']
  }
]

export const categoriesData = [
  {
    automatyka: [
      {
        id: 1,
        title: "Wszystkie kategorie",
        slug: "wszystkie-kategorie",
      },
      {
        id: 2,
        title: "Siłowniki do bramy przesuwnej",
        slug: "silowniki-do-bramy-przesuwnej",
      },
      {
        id: 3,
        title: "Siłowniki do bramy garazowej",
        slug: "silowniki-do-bramy-garazowej",
      },
      {
        id: 4,
        title: "Fotokomórki",
        slug: "fotokomorki",
      }
    ],

    producenci: [
      {
        id: 1,
        title: 'Wszyscy producenci',
        slug: 'wszyscy-producenci',
      },
      {
        id: 2,
        title: 'BFT',
        slug: 'BFT',
      },
      {
        id: 3,
        title: 'Somfy',
        slug: 'somfy',
      },
      {
        id: 4,
        title: 'ARC',
        slug: 'arc',
      },
    ]
  }
];

export const productsData = [
  {
    name: "BFT Deimos AC A800 MAG KIT",
    category: "Bramy przesuwne",
    producer: "BFT",
    description: "Najlepszy napęd do bramy przesuwnej",
    regularPrice: 1799,
    imageUrls: '',
    delivery: 2,
    promotion: false,
    sale: false,
    stars: 5,
    reviews: 123,
    amount: 3,
  },
  {
    name: "Hato Slide 10",
    category: "Bramy przesuwne",
    producer: "Hato",
    description: "Najlepszy napęd do bramy przesuwnej",
    regularPrice: 1350,
    discountedPrice: 1250,
    imageUrls: '',
    delivery: 5,
    promotion: false,
    sale: false,
    stars: 3,
    reviews: 12,
    amount: 4,
  },
  {
    name: "NAVI 600",
    category: "Bramy przesuwne",
    producer: "Navi",
    description: "Najlepszy napęd do bramy przesuwnej",
    regularPrice: 911,
    imageUrls: '',
    delivery: 5,
    promotion: false,
    sale: false,
    stars: 5,
    reviews: 14,
    amount: 1,
  },
  {
    name: "BFT Boticelli",
    category: "Bramy garażowe",
    producer: "BFT",
    description: "Najlepszy napęd do bramy garazowej",
    regularPrice: 950,
    imageUrls: '',
    delivery: 3,
    promotion: false,
    sale: false,
    stars: 5,
    reviews: 26,
    amount: 6,
  },
  {
    name: "ARC 600N",
    category: "Bramy garażowe",
    producer: "ARC",
    description: "Najlepszy napęd do bramy garazowej",
    regularPrice: 500,
    discountedPrice: 450,
    imageUrls: '',
    delivery: 1,
    promotion: false,
    sale: false,
    stars: 5,
    reviews: 14,
    amount: 1,
  },
  {
    name: "Moto 600 RTS",
    category: "Bramy garażowe",
    producer: "Somfy",
    description: "Najlepszy napęd do bramy garazowej",
    regularPrice: 1100,
    imageUrls: '',
    delivery: 3,
    promotion: false,
    sale: false,
    stars: 1,
    reviews: 35,
    amount: 4,
  },
  {
    name: "BFT AKTA A30",
    category: "Fotokomórki",
    producer: "BFT",
    description: "Fotokomórki najlepszej klasy",
    regularPrice: 100,
    discountedPrice: 90,
    imageUrls: '',
    delivery: 1,
    promotion: false,
    sale: false,
    stars: 5,
    reviews: 31,
    amount: 10,
  },
  {
    name: "CAME DIR 10",
    category: "Fotokomorki",
    producer: "Came",
    description: "Fotokomórki najlepszej klasy",
    regularPrice: 120,
    imageUrls: '',
    delivery: 3,
    promotion: false,
    sale: false,
    stars: 5,
    reviews: 45,
    amount: 20,
  },
  {
    name: "NICE BF",
    category: "Fotokomorki",
    producer: "Nice",
    description: "Fotokomórki najlepszej klasy",
    regularPrice: 100,
    discountedPrice: 90,
    imageUrls: '',
    delivery: 1,
    promotion: false,
    sale: false,
    stars: 5,
    reviews: 31,
    amount: 10,
  },
];