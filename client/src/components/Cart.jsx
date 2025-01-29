import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { slugify } from "../utils/slugify";

import { FaLongArrowAltLeft } from "react-icons/fa";
import { PiEmptyLight } from "react-icons/pi";
import { HiPlusSm, HiMinusSm } from "react-icons/hi";
import { SlBasket } from "react-icons/sl";
import { FaAddressCard } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";
import { MdCancel } from "react-icons/md";
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
      <h2 className='font-medium text-3xl text-center py-6 pb-10'>Twój koszyk</h2>

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
          <div className='flex justify-center mt-2 mb-16 '>
            <div className='bg-orange-600 flex flex-col justify-center items-center rounded-lg p-2 w-[110px]'>
              <SlBasket className='text-orange-600 bg-white rounded-lg text-4xl p-2' />
              <p className='text-white mt-2 text-sm'>Podsumowanie</p>
            </div>
            <div className='h-[5px] w-[40px] bg-gray-300 rounded-lg self-center mx-5'></div>
            <div className='bg-gray-300 flex flex-col justify-center items-center rounded-lg p-2 w-[110px]'>
              <FaAddressCard className='text-gray-300 bg-white rounded-lg text-4xl p-2' />
              <p className='text-white mt-2 text-sm'>Dane</p>
            </div>
            <div className='h-[5px] w-[40px] bg-gray-300 rounded-lg self-center mx-5'></div>
            <div className='bg-gray-300 flex flex-col justify-center items-center rounded-lg p-2 w-[110px]'>
              <IoIosSend className='text-gray-300 bg-white rounded-lg text-4xl p-2' />
              <p className='text-white mt-2 text-sm'>Finalizacja</p>
            </div>
          </div>
          <div className='flex gap-10'>
            <div className='w-2/3'>
              <div className='flex'>
                <div className='bg-gray-300 rounded-lg p-2 flex justify-center mb-5 mr-2'>
                  <p className='text-white'>Koszyk</p>
                </div>
                <div className='bg-sky-400 rounded-lg p-2 flex justify-center mb-5 mr-2'>
                  <p className='text-white'>Ilość produktów: {cart.cartItems.length}</p>
                </div>
                <div
                  className='bg-red-600 rounded-lg p-2 flex justify-center mb-5 hover:bg-red-500 cursor-pointer transition-smooth items-center'
                  onClick={() => handleClearCart()}
                >
                  <MdCancel className='mr-1 text-white' />
                  <p className='text-white'>Wyczyść koszyk</p>
                </div>
              </div>
              <div className='text-sm uppercase grid grid-cols-6 gap-4 pb-4'>
                <h3 className="col-span-3">Produkt</h3>
                <h3 className="col-span-1">Cena</h3>
                <h3 className="col-span-1 flex justify-center">Ilość</h3>
                <h3 className="col-span-1 flex justify-end">Suma</h3>
              </div>
              <div className='items'>
                {cart.cartItems?.map(cartItem => (
                  <div className='text-sm grid grid-cols-6 gap-4 items-center border-t-[2px] border-gray-300 py-5' key={cartItem._id}>

                    <div className="col-span-3 flex">
                      <img className="w-[100px] h-[100px] mr-4 object-cover rounded-lg" src={cartItem.imageUrls} alt={cartItem.name} />
                      <div>
                        <Link to={`/sklep/${slugify(cartItem.category)}/${slugify(cartItem.subcategory)}/${slugify(cartItem.name)}/${cartItem._id}`}>
                          <h3 className="text-lg font-bold text-sky-400 hover:text-yellow-300 transition-smooth cursor-pointer">{cartItem.name}</h3>
                        </Link>
                        <h3 className="py-2">{cartItem.shortDescription}</h3>

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

                    <div className='flex flex-col items-center'>
                      <div className="border-[1px] rounded-full flex justify-between items-center px-4 py-2 mt-4">
                        <HiMinusSm
                          className={`bg-gray-200 cursor-pointer rounded-full text-xl ${
                            quantity === 1 ? "opacity-50 cursor-not-allowed" : ""
                          }`}
                          onClick = {() => handleDecreaseCart(cartItem)}
                        />
                        <p className='px-3'>{cartItem.cartQuantity}</p>
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
                      <button
                        className="bg-red-600 p-2 mt-2 rounded-lg pointer hover:bg-red-500 text-white transition-smooth"
                        onClick={() => handleRemoveFromCart(cartItem)}
                      >Usuń</button>
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

                <div className='checkout w-[270px] max-w-full'>


                  <Link to="/sklep" className='flex items-center hover:text-orange-600 transition-all duration-300 transform hover:-translate-x-1'>
                    <FaLongArrowAltLeft className="mr-2"/>
                    <span>Kontynuuj zakupy</span>
                  </Link>
                </div>
              </div>
            </div>

            <div className='w-1/3'>
              <div className='flex '>
                <div className='bg-gray-300 rounded-lg p-2 flex justify-center mb-5'>
                  <p className='text-white'>Podsumowanie zamówienia</p>
                </div>
              </div>
              <div className='flex'>
                <p className='mr-2'>Suma całkowita: </p>
                <p>{cart.cartTotalAmount} zł</p>
              </div>
              <div className='flex'>
                <p className='mr-2'>Koszt dostawy: </p>
                <p>{cart.cartTotalAmount} zł</p>
              </div>
              <div className='flex'>
                <p className='mr-2'>Suma całkowita: </p>
                <p>{cart.cartTotalAmount} zł</p>
              </div>
              <div className='flex'>
                <p className='mr-2'>Do zapłaty: </p>
                <p>{cart.cartTotalAmount} zł</p>
              </div>
              <button className="py-2 my-2 bg-orange-600 w-full rounded text-white hover:bg-gray-800">Zamów</button>
            </div>
          </div>
        </div>
      )}
    </div>


  )
}

export default Cart
