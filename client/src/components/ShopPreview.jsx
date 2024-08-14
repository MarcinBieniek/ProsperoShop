import ShopProductCard from "./ShopProductCard"

const tempProducts = [
  {
    name: "BFT Deimos AC A800 MAG KIT",
    category: "Bramy garazowe",
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
    name: "BFT Deimos AC A800 MAG KIT",
    category: "Bramy garazowe",
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
    name: "BFT Deimos AC A800 MAG KIT",
    category: "Bramy garazowe",
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
  }
]

const ShopPreview = () => {
  return (
    <div className='py-20 pb-5 text-gray-800'>
      <div className='container flex'>
        <div className='w-2/6 bg-orange-600 h-[460px] flex items-center justify-center rounded-xl'>
          Kontener na grafikę
        </div>
        <div className='w-4/6 p-5 '>
          <div className='flex justify-between border-b-[1px] border-gray-200 pb-3'>
            <button className='border-2 border-yellow-300 rounded-2xl py-1 px-3'>Bramy garażowe</button>
            <button className=' border-2 border-white hover:border-2 hover:border-yellow-300 rounded-2xl py-1 px-3 transition-smooth'>Automatyka</button>
            <button className=' border-2 border-white hover:border-2 hover:border-yellow-300 rounded-2xl py-1 px-3 transition-smooth'>Akcesoria</button>
            <button className=' border-2 border-white hover:border-2 hover:border-yellow-300 rounded-2xl py-1 px-3 transition-smooth'>Ogrodzenia</button>
            <button className=' border-2 border-white hover:border-2 hover:border-yellow-300 rounded-2xl py-1 px-3 transition-smooth'>Wyprzedaż</button>
          </div>

          <div className='grid grid-cols-3 gap-4 text-gray-800 py-5'>
            {tempProducts.map((product, index) => (
              <ShopProductCard
                key={index}
                product={product}
              />
            ))}
          </div>

        </div>
      </div>
    </div>
  )
}

export default ShopPreview;
