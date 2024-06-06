import { FaHeart } from "react-icons/fa";

const Store = () => {

  const products = [
    {
      id: 1,
      title: 'Fotokomórki',
      image: '/fotokomorki.jpeg',
      description: 'Opis - najlepsze fotokomórki na świecie, idealne do bram segemntowych.',
      price: 145,
      delivery: '2-3 dni robocze',
      promotion: true,
      sale: false,
    },
    {
      id: 2,
      title: 'Napęd Metro',
      image: '/naped.jpg',
      description: 'Opis - najlepszy napęd na świecie, idealny do bram segemntowych.',
      price: 1000,
      delivery: '2-3 dni robocze',
      promotion: false,
      sale: false,
    },
    {
      id: 3,
      title: 'Nadajnik ',
      image: '/pilot.jpeg',
      description: 'Opis - najlepszy nadajnik na świecie, idealny do bram segemntowych.',
      price: 90,
      delivery: '2-3 dni robocze',
      promotion: false,
      sale: true,
    },

  ]

  return (
    <div className='bg-blue-500 p-10'>
      <p className='py-5'>Sklep</p>
      <div className='grid grid-cols-4 gap-2'>
        {products.map((product, index) =>
          <div className='bg-yellow-500 p-5 rounded'>

            <div className='flex flex-col relative'>
              <div className='absolute left-2 top-2'>
                {product.promotion
                  ? <p className='bg-blue-500'>Promo</p>
                  : <p></p>
                }
                {product.sale
                  ? <p className='bg-red-500'>Sale</p>
                  : <p></p>
                }
              </div>
              <img
                className='object-cover h-60 w-full'
                src={product.image}
              />
              <div >
                <p className='text-xl py-1'>{product.title}</p>
                <p className='text-sm py-1'>{product.description}</p>
                <p className='text-lg py-1'>Cena: {product.price} zł brutto</p>
                <p className='text-sm py-1'>Realizacja: 2-3 dni robocze</p>
                <div className='flex justify-between py-1 items-center'>
                  <button className='bg-red-500 p-2 rounded'>Dodaj do koszyka</button>
                  <FaHeart />
                </div>

              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  )
}

export default Store
