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

const deliveryOptions = [
  { id: 1, name: "Kurier DHL", time: "1-2 dni", price: 15, icon: '/logo/kurier-dhl.png' },
  { id: 2, name: "Kurier DPD", time: "2-3 dni", price: 12, icon: '/logo/kurier-dpd.png' },
  { id: 3, name: "Paczkomat InPost", time: "2-4 dni", price: 10, icon: '/logo/kurier-inpost.png' },
  { id: 4, name: "Odbiór osobisty", time: "1-2 dni", price: 0}
]

const paymentOptions = [
  { id: 1, name: "Przelewy 24", icon: '/logo/przelewy-24.png' },
  { id: 2, name: "Przelew tradycyjny" }
]

const Cart = () => {

  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [selectedCourier, setSelectedCourier] = useState(deliveryOptions[0]);
  const [selectedPayment, setSelectedPayment] = useState(paymentOptions[0]);
  const maxQuantity = 10;

  console.log('cart is', cart)
  console.log('selected courier', selectedCourier)

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
                <div className='bg-sky-400 rounded-lg p-2 flex justify-center mb-5 mr-2'>
                  <p className='text-white'>Koszyk</p>
                </div>
                <div className='bg-gray-300 rounded-lg p-2 flex justify-center mb-5 mr-2'>
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

              <div className='flex'>
                <div className='bg-sky-400 rounded-lg p-2 flex justify-center mb-5 mr-2'>
                  <p className='text-white'>Wybierz sposób dostawy</p>
                </div>
              </div>
              <div className="flex flex-col gap-4 mb-5">
                {deliveryOptions.map((option) => (
                  <label
                    key={option.id}
                    className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer ${
                      selectedCourier.id === option.id ? "border-orange-600" : "border-gray-300"
                    }`}
                  >
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="delivery"
                        value={option.id}
                        checked={selectedCourier.id === option.id}
                        onChange={() => setSelectedCourier(option)}
                        className="hidden"
                      />
                      <div className="w-5 h-5 border-2 border-orange-600 rounded-full flex items-center justify-center mr-3">
                        {selectedCourier.id === option.id && <div className="w-3 h-3 bg-orange-600 rounded-full"></div>}
                      </div>
                      {option.icon && (
                        <img src={option.icon} alt={option.name} className="w-8 h-8 mr-3 bg-white" />
                      )}
                      <p className="font-semibold">{option.name}</p>
                    </div>
                    <p className="text-sm text-gray-600 min-w-[100px]">Czas: {option.time}</p>
                    <p className="text-sm text-gray-600">Koszt: {option.price} zł</p>
                  </label>
                ))}
              </div>

              <div className='flex'>
                <div className='bg-sky-400 rounded-lg p-2 flex justify-center mb-5 mr-2'>
                  <p className='text-white'>Wybierz sposób płatności</p>
                </div>
              </div>
              <div className="flex flex-col gap-4 mb-5">
                {paymentOptions.map((option) => (
                  <label
                    key={option.id}
                    className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer ${
                      selectedPayment.id === option.id ? "border-orange-600" : "border-gray-300"
                    }`}
                  >
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="delivery"
                        value={option.id}
                        checked={selectedPayment.id === option.id}
                        onChange={() => setSelectedPayment(option)}
                        className="hidden"
                      />
                      <div className="w-5 h-5 border-2 border-orange-600 rounded-full flex items-center justify-center mr-3">
                        {selectedPayment.id === option.id && <div className="w-3 h-3 bg-orange-600 rounded-full"></div>}
                      </div>
                      {option.icon && (
                        <img src={option.icon} alt={option.name} className="h-6 mr-3 bg-white" />
                      )}
                      <p className="font-semibold">{option.name}</p>
                    </div>

                  </label>
                ))}
              </div>

            </div>

            <div className='w-1/3 relative'>
              <div className='sticky top-5'>
                <div className='bg-sky-400 rounded-lg p-2 flex justify-center mb-7'>
                  <p className='text-white'>Podsumowanie zamówienia</p>
                </div>

                <div className='flex mb-2 w-[50%] justify-between'>
                  <p className='mr-2'>Suma całkowita: </p>
                  <p>{cart.cartTotalAmount} zł</p>
                </div>

                <div className='mb-2'>
                  <div className='flex w-[50%] justify-between mb-2'>
                    <p className='mr-2'>Koszt dostawy: </p>
                    <p>{selectedCourier.price} zł</p>
                  </div>
                  <div className='flex items-center mb-2'>
                    <p>Dostawa:</p>
                    <p className='ml-2'>{selectedCourier.name}</p>
                  </div>
                  <div className='flex items-center'>
                    <p>Sposób płatności:</p>
                    <p className='ml-2'>{selectedPayment.name}</p>
                  </div>
                </div>

                <div className='flex mb-5'>
                  <p className='mr-2 text-2xl'>Do zapłaty: </p>
                  <p className='text-2xl'>{cart.cartTotalAmount + selectedCourier.price} zł</p>
                </div>
                <button className="py-2 my-2 bg-orange-600 w-full rounded-lg text-white hover:bg-gray-800 transition-smooth">Dalej</button>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>


  )
}

export default Cart
