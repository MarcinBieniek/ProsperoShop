import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { FaLongArrowAltLeft } from "react-icons/fa";
import { PiEmptyLight } from "react-icons/pi";
import { HiPlusSm, HiMinusSm } from "react-icons/hi";
import { addToCart, clearCart, decreaseCart, getTotals, removeFromCart } from "../redux/cart/cartSlice";

const Cart = () => {

  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const maxQuantity = 10;

  console.log('cart is', cart)

  useEffect(() => {
    dispatch(getTotals())
  }, [cart, dispatch])

  const handleRemoveFromCart = (cartItem) => {
    dispatch(removeFromCart(cartItem))
  };

  const handleDecreaseCart = (cartItem) => {
    dispatch(decreaseCart(cartItem))
  };

  const handleIncreaseCart = (cartItem) => {
    dispatch(addToCart(cartItem))
  };

  const handleClearCart = () => {
    dispatch(clearCart())
  };

  return (

    <div>
      <h2 className='font-medium text-3xl text-center py-6'>Koszyk</h2>
      {cart.cartItems.length === 0 ? (
        <div className='emptyCart flex flex-col items-center justify-center h-[400px]'>
          <PiEmptyLight className='text-orange-600 text-6xl mb-20' />
          <p className="text-xl mb-5">Twój koszyk jest pusty</p>
          <div className=''>
            <Link to="/sklep" className='flex items-center hover:text-orange-600 transition-all duration-300 transform hover:-translate-x-1'>
              <FaLongArrowAltLeft />
              <span className="ml-2 text-xl">Zapraszamy do zakupów</span>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <div className='text-sm uppercase grid grid-cols-6 gap-4 pb-4'>
            <h3 className="col-span-3">Produkt</h3>
            <h3 className="col-span-1">Cena</h3>
            <h3 className="col-span-1">Ilość</h3>
            <h3 className="col-span-1 flex justify-end">Suma</h3>
          </div>
          <div className='items'>
            {cart.cartItems?.map(cartItem => (
              <div className='text-sm grid grid-cols-6 gap-4 items-center border-t-[2px] border-gray-300 py-5' key={cartItem._id}>

                <div className="col-span-3 flex">
                  <img className="w-[100px] h-[100px] mr-4 object-cover" src={cartItem.imageUrls} alt={cartItem.name} />
                  <div>
                    <h3 className="uppercase text-lg">{cartItem.name}</h3>
                    <h3 className="py-2">{cartItem.shortDescription}</h3>
                    <button
                      className="bg-gray-300 p-2 mt-2 rounded pointer hover:bg-gray-200"
                      onClick={() => handleRemoveFromCart(cartItem)}
                    >Usuń produkt</button>
                  </div>
                </div>
                {cartItem.discountedPrice ? (
                  <div>
                    <div className="col-span-1 text-red-600">{cartItem.discountedPrice} zł</div>
                    <div className="col-span-1 line-through">{cartItem.price} zł</div>
                  </div>
                ) : (
                  <div className="col-span-1">{cartItem.price} zł</div>
                )}

                <div className="border-[1px] rounded-full flex justify-between items-center px-4 py-2 mt-4 w-[50%]">
                  <HiMinusSm
                    className={`bg-gray-200 cursor-pointer rounded-full text-xl ${
                      quantity === 1 ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    onClick = {() => handleDecreaseCart(cartItem)}
                  />
                  <p>{cartItem.cartQuantity}</p>
                  <HiPlusSm
                    className={`bg-gray-200 cursor-pointer rounded-full text-xl ${
                      cartItem.cartQuantity >= maxQuantity ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    onClick={() => {
                      if (cartItem.cartQuantity < maxQuantity) {
                        handleIncreaseCart(cartItem);
                      }
                    }}
                  />
                </div>

                <div className="col-span-1 flex justify-end font-bold">
                  {cartItem.discountedPrice
                    ? (cartItem.discountedPrice * cartItem.cartQuantity).toFixed(2)
                    : (cartItem.price * cartItem.cartQuantity).toFixed(2)
                  } zł
                </div>
              </div>
            ))}
          </div>

          <div className='summary flex justify-between items-start border-t-[2px] border-gray-300 py-5'>
            <button
              className='w-[130px] max-w-full h-[40px] rounded bg-gray-300 hover:bg-gray-200 pointer'
              onClick={() => handleClearCart()}
            >
              Wyczyść koszyk
            </button>
            <div className='checkout w-[270px] max-w-full'>
              <div className="flex justify-between mb-2">
                <span>Cena całkowita:</span>
                <span className='amount font-bold'> {cart.cartTotalAmount}  zł</span>
              </div>
              <button className="py-2 my-2 bg-orange-600 w-full rounded text-white hover:bg-gray-800">Zamów</button>
              <p className='mb-2'>Koszty wysyłki zostaną dodane w kolejnym kroku.</p>
              <Link to="/sklep" className='flex items-center hover:text-orange-600 transition-all duration-300 transform hover:-translate-x-1'>
                <FaLongArrowAltLeft className="mr-2"/>
                <span>Kontynuuj zakupy</span>
              </Link>
            </div>
          </div>

        </div>
      )}
    </div>


  )
}

export default Cart
