import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { FaLongArrowAltLeft } from "react-icons/fa";
import { PiEmptyLight } from "react-icons/pi";
import { SlBasket } from "react-icons/sl";
import { FaAddressCard } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { getTotals } from "../redux/cart/cartSlice";
import { updateCartItems } from "../redux/order/orderSlice";
import { slugify } from "../utils/slugify";

const Podsumowanie = () => {

  const cart = useSelector((state) => state.cart);
  const order = useSelector((state) => state.order);

  const dispatch = useDispatch();

  console.log('order is', order)

  useEffect(() => {
    dispatch(getTotals())
  }, [cart, dispatch])

  useEffect(() => {
    dispatch(updateCartItems(cart.cartItems));
  }, [cart.cartItems, dispatch]);

  const handleOrderSubmit = async () => {
    console.log('Order details:', order);

    const orderWithStatus = {
      ...order,
      status: "Paid",
    };

    try {
      const response = await fetch("/api/order/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderWithStatus),
      });

      const data = await response.json();
      console.log("Order created:", data);
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  return (

    <div className='container'>
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
            <div className='h-[5px] w-[40px] bg-orange-600 rounded-lg self-center mx-5'></div>
            <div className='bg-orange-600 flex flex-col justify-center items-center rounded-lg p-2 w-[110px]'>
              <FaAddressCard className='text-orange-600 bg-white rounded-lg text-4xl p-2' />
              <p className='text-white mt-2 text-sm'>Dane</p>
            </div>
            <div className='h-[5px] w-[40px] bg-orange-600 rounded-lg self-center mx-5'></div>
            <div className='bg-orange-600 flex flex-col justify-center items-center rounded-lg p-2 w-[110px]'>
              <IoIosSend className='text-orange-600 bg-white rounded-lg text-4xl p-2' />
              <p className='text-white mt-2 text-sm'>Finalizacja</p>
            </div>
          </div>
          <div className='flex gap-10'>

            <div className='w-2/3'>
              <div className='flex'>
                <div className='bg-sky-400 rounded-lg p-2 flex justify-center mb-5 mr-2'>
                  <p className='text-white'>Wybrane produkty</p>
                </div>
                <div className='bg-gray-300 rounded-lg p-2 flex justify-center mb-5 mr-2'>
                  <p className='text-white'>Ilość produktów: {order.cartItems.length}</p>
                </div>
                <Link to='/koszyk' className='flex justify-center'>
                  <MdEdit className='text-3xl text-orange-600 mt-1' />
                </Link>
              </div>
              <div className='text-sm uppercase grid grid-cols-6 gap-4 pb-4'>
                <h3 className="col-span-3">Produkt</h3>
                <h3 className="col-span-1">Cena</h3>
                <h3 className="col-span-1 flex justify-center">Ilość</h3>
                <h3 className="col-span-1 flex justify-end">Suma</h3>
              </div>
              <div className='items mb-10'>
                {order.cartItems?.map(cartItem => (
                  <div
                    className='text-sm grid grid-cols-6 gap-4 items-center border-t-[2px] border-gray-300 py-5'
                    key={cartItem._id}
                  >
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
                      {cartItem.cartQuantity}
                    </div>

                    <div className="col-span-1 flex justify-end font-bold">
                      {cartItem.discountedPrice ?
                        <p>{cartItem.discountedPrice * cartItem.cartQuantity} zł</p>
                        :
                        <p>{cartItem.price * cartItem.cartQuantity} zł</p>
                      }

                    </div>
                  </div>
                ))}
              </div>

              <div className='flex flex-wrap justify-between'>
                <div className='w-full md:w-1/3 mb-4'>
                  <div className='flex'>
                    <div className='bg-sky-400 rounded-lg p-2 inline-block mb-5 mr-2'>
                      <p className='text-white'>Dane do wysyłki</p>
                    </div>
                    <Link to='/koszyk/dane' className='flex justify-center'>
                      <MdEdit className='text-3xl text-orange-600 mt-1' />
                    </Link>
                  </div>
                  <p>{order.address.clientData.name}</p>
                  <p>{order.address.clientData.street} {order.address.clientData.buildingNumber}</p>
                  <p>{order.address.clientData.postalCode} {order.address.clientData.city}</p>
                  <p>{order.address.clientData.country}</p>
                  <p>Tel: {order.address.clientData.phoneNumber}</p>
                </div>

                <div className='w-full md:w-1/3 mb-4'>
                  <div className='flex'>
                    <div className='bg-sky-400 rounded-lg p-2 inline-block mb-5 mr-2'>
                      <p className='text-white'>Dane do faktury</p>
                    </div>
                    <Link to='/koszyk/dane' className='flex justify-center'>
                      <MdEdit className='text-3xl text-orange-600 mt-1' />
                    </Link>
                  </div>
                  <p>{order.address.companyData.companyName}</p>
                  <p>{order.address.companyData.companyStreet} {order.address.companyData.companyBuildingNumber}</p>
                  <p>{order.address.companyData.companyPostalCode} {order.address.companyData.city}</p>
                  <p>{order.address.companyData.companyCountry}</p>
                  <p>NIP: {order.address.companyData.nip}</p>
                </div>
                <div className='w-full md:w-1/3 mb-4'>
                <div className='flex'>
                    <div className='bg-sky-400 rounded-lg p-2 inline-block mb-5 mr-2'>
                      <p className='text-white'>Płatność</p>
                    </div>
                    <Link to='/koszyk' className='flex justify-center'>
                      <MdEdit className='text-3xl text-orange-600 mt-1' />
                    </Link>
                  </div>
                  <p>Sposób płatności: {order.paymentMethod.name}</p>
                </div>
                <div className='w-full md:w-1/3 mb-4'>
                  <div className='flex'>
                    <div className='bg-sky-400 rounded-lg p-2 inline-block mb-5 mr-2'>
                      <p className='text-white'>Dostawa</p>
                    </div>
                    <Link to='/koszyk' className='flex justify-center'>
                      <MdEdit className='text-3xl text-orange-600 mt-1' />
                    </Link>
                  </div>
                  <p>Rodzaj: {order.deliveryMethod.name}</p>
                  <p>Cena: {order.deliveryMethod.price} zł</p>
                  <p>Czas realizacji: {order.deliveryMethod.time}</p>
                </div>
                <div className='w-full md:w-1/3 mb-4'>
                  <div className='flex'>
                    <div className='bg-sky-400 rounded-lg p-2 inline-block mb-5 mr-2'>
                      <p className='text-white'>Adres dostawy</p>
                    </div>
                    <Link to='/koszyk/dane' className='flex justify-center'>
                      <MdEdit className='text-3xl text-orange-600 mt-1' />
                    </Link>
                  </div>
                  <p>{order.address.deliveryAddress.name}</p>
                  <p>{order.address.deliveryAddress.street} {order.address.deliveryAddress.buildingNumber}</p>
                  <p>{order.address.deliveryAddress.postalCode} {order.address.deliveryAddress.city}</p>
                  <p>{order.address.deliveryAddress.country}</p>
                  <p>Tel: {order.address.deliveryAddress.phoneNumber}</p>
                </div>
                <div className='w-full md:w-1/3 mb-4'>
                  <div className='flex'>
                    <div className='bg-sky-400 rounded-lg p-2 inline-block mb-5 mr-2'>
                      <p className='text-white'>Uwagi do zamówienia</p>
                    </div>
                    <Link to='/koszyk/dane' className='flex justify-center'>
                      <MdEdit className='text-3xl text-orange-600 mt-1' />
                    </Link>
                  </div>
                  <p>{order.address.remarks}</p>
                </div>
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
                    <p> {order.deliveryMethod.price} zł</p>
                  </div>
                  <div className='flex items-center mb-2'>
                    <p>Dostawa:</p>
                    <p className='ml-2'>{order.deliveryMethod.name}</p>
                  </div>
                  <div className='flex items-center'>
                    <p>Sposób płatności:</p>
                    <p className='ml-2'>{order.paymentMethod.name}</p>
                  </div>
                </div>

                <div className='flex mb-5'>
                  <p className='mr-2 text-2xl'>Do zapłaty: </p>
                  <p className='text-2xl'>{order.totalPrice} zł</p>
                </div>
                <button
                  className="py-2 my-2 bg-orange-600 w-full rounded-lg text-white hover:bg-gray-800 transition-smooth"
                  onClick={handleOrderSubmit}
                >
                  Zamów
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>


  )
}

export default Podsumowanie
