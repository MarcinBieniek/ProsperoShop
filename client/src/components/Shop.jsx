import { FaHeart } from "react-icons/fa";
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from "../redux/cart/cartSlice";

const Store = () => {

  const dispatch = useDispatch();

  const value = useSelector((state) => state.products.items);
  const status = useSelector((state) => state.products.status);

  console.log(value)
  console.log('status is', status)

  if (status === "pending") {
    return <div>Loading...</div>;
  }

  if (status === "rejected") {
    return <div>Failed to load products. Please try again later.</div>;
  }

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  }

  return (
    <div className='bg-blue-500 p-10'>
      <p className='py-5'>Sklep</p>
      <div className='grid grid-cols-4 gap-2'>
        {value.map((product, index) =>
          <div key={product.id} className='bg-yellow-500 p-5 rounded'>

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
                src={product.imageUrls}
              />
              <div >
                <p className='text-xl py-1'>{product.name}</p>
                <p className='text-sm py-1'>{product.description}</p>
                <p className='text-lg py-1'>Cena: {product.regularPrice} zł brutto</p>
                <p className='text-sm py-1'>Realizacja: 2-3 dni robocze</p>
                <div className='flex justify-between py-1 items-center'>
                  <button
                    className='bg-red-500 p-2 rounded'
                    onClick={() => handleAddToCart(product)}
                  >
                    Dodaj do koszyka
                  </button>
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
