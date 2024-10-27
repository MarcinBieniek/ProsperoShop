import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { removeFromCart, getTotals } from "../redux/cart/cartSlice";
import ButtonGray from '../common/ButtonGray';
import ButtonOrange from '../common/ButtonOrange';

import { PiUserCircleLight } from "react-icons/pi";
import { IoHelpCircleOutline, IoHeartOutline } from "react-icons/io5";
import { SlBasket } from "react-icons/sl";
import { CiSearch } from "react-icons/ci";
import { IoListCircleOutline } from "react-icons/io5";
import { TbTruckReturn } from "react-icons/tb";
import { PiGarageLight } from "react-icons/pi";
import { FaGears } from "react-icons/fa6";
import { CiDeliveryTruck } from "react-icons/ci";
import { GoTools } from "react-icons/go";
import { RiCustomerService2Line } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";

import { RiProductHuntLine } from "react-icons/ri";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { LuLayoutPanelLeft } from "react-icons/lu";

import {
  signOutUserStart,
  signOutUserFailure,
  signOutUserSuccess }
  from '../redux/user/userSlice';

const HeaderMenuTop = () => {

  const { currentUser } = useSelector(state => state.user);
  const { cartTotalQuantity } = useSelector(state => state.cart);
  const { cartItems } = useSelector(state => state.cart);
  const cart = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotals())
  }, [cart, dispatch])

  const [isMenuUserOpen, setIsMenuUserOpen] = useState(false);
  const [isMenuHelpOpen, setIsMenuHelpOpen] = useState(false);
  const [isMenuCartOpen, setIsMenuCartOpen] = useState(false);

  const userMenuItems = [
    { to: '/profil', icon: <PiUserCircleLight className='text-xl mr-2' />, label: 'Mój profil' },
    { to: '/profil', icon: <IoListCircleOutline className='text-xl mr-2' />, label: 'Zamówienia' },
    { to: '/profil', icon: <IoHeartOutline className='text-xl mr-2' />, label: 'Ulubione produkty' },
    { to: '/profil', icon: <TbTruckReturn className='text-xl mr-2' />, label: 'Reklamacje i zwroty' }
  ];

  const adminMenuItems = [
    { to: '/admin/dashboard', icon: <LuLayoutPanelLeft className='text-xl mr-2' />, label: 'Panel admina' },
    { to: '/admin/users', icon: <PiUserCircleLight className='text-xl mr-2' />, label: 'Użytkownicy' },
    { to: '/admin/products', icon: <RiProductHuntLine className='text-xl mr-2' />, label: 'Produkty' },
    { to: '/admin/orders', icon: <IoListCircleOutline className='text-xl mr-2' />, label: 'Zamówienia' },
    { to: '/admin/orders', icon: <TbTruckReturn className='text-xl mr-2' />, label: 'Zwroty i reklamacje' }
  ];

  const helpMenuItems = [
    { to: '/profil', icon: <PiGarageLight className='text-xl mr-2' />, label: 'Nasza firma' },
    { to: '/profil', icon: <FaGears className='text-xl mr-2' />, label: 'Ile trwa produkcja?' },
    { to: '/profil', icon: <CiDeliveryTruck className='text-xl mr-2' />, label: 'Dostawa' },
    { to: '/profil', icon: <GoTools className='text-xl mr-2' />, label: 'Gwarancja i reklamacje' },
    { to: '/profil', icon: <RiCustomerService2Line className='text-xl mr-2' />, label: 'Szybki kontakt' },
  ];

  const contactItems = [
    { href: 'mailto:kontakt@bramyslask.pl', label: 'kontakt@bramyslask.pl' },
    { href: 'tel:+48123456789', label: '+48 123 456 789' },
  ];

  const handleRemoveFromCart = (cartItem) => {
    dispatch(removeFromCart(cartItem))
  };

  const handleCloseCart = () => {
    setIsMenuCartOpen(false)
  }

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart())
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message))
        return;
      }
      dispatch(signOutUserSuccess(data));
    } catch (error) {
      dispatch(signOutUserFailure(error.message))
    }
  }

  return (
    <div className='flex h-16 my-2 items-center justify-between'>
      <div className='flex'>
        <Link to='/' className='cursor-pointer'>
          <p className='text-3xl font-bold mr-16'>logo.</p>
        </Link>
        <div className="relative w-[500px]">
          <input
            type="text"
            className="w-full pl-4 pr-3 py-2 border-2 border-orange-600 rounded-3xl focus:outline-none"
            placeholder="Szukaj..."
          />
          <span className="absolute inset-y-0 right-[4px] flex items-center p-2 my-1 bg-orange-600 text-2xl rounded-3xl cursor-pointer hover:bg-gray-800 transition-smooth">
            <CiSearch className="text-white" />
          </span>
        </div>
      </div>

      <div className='login flex items-center'>
        <div className='relative'>
          <div
            onMouseEnter={() => setIsMenuUserOpen(true)}
            onMouseLeave={() => setIsMenuUserOpen(false)}
          >
            <Link
              to={currentUser ? (currentUser.status === 'admin' ? '/admin' : '/profil') : '/login'}
              className={`flex items-center cursor-pointer p-2 rounded-md transition-smooth ${isMenuUserOpen ? 'bg-gray-100' : 'hover:bg-gray-100'}`}
            >
              {currentUser ? (
                <button className='flex items-center'>
                  <div className='mr-3 text-sm'>
                    <p className='flex justify-end font-bold'>Witaj,</p>
                    <p>{currentUser.username}</p>
                  </div>
                  <img
                    src={currentUser?.avatar}
                    alt='Profile image'
                    className='rounded-full h-7 w-7 object-cover'
                    referrerPolicy="no-referrer"
                  />
                </button>
              ) : (
                <>
                  <p className='mr-3'>zaloguj się</p>
                  <PiUserCircleLight className='text-3xl'/>
                </>
              )}
            </Link>

            {currentUser?.status === 'user' && isMenuUserOpen && (
              <div
                className='absolute right-0 mt-0 w-64 bg-white border border-gray-200 rounded-md shadow-lg'
                onMouseEnter={() => setIsMenuUserOpen(true)}
                onMouseLeave={() => setIsMenuUserOpen(false)}
              >
                {userMenuItems.map((item, index) => (
                  <Link
                    key={index}
                    to={item.to}
                    className='flex text-black hover:bg-gray-100 items-center rounded'
                  >
                    <div className='flex text-black hover:bg-gray-100 items-center rounded p-3'>
                      {item.icon}
                      <p className='ml-1'>{item.label}</p>
                    </div>
                  </Link>
                ))}

                <button
                  onClick={handleSignOut}
                  className='flex text-black hover:bg-gray-100 items-center rounded p-3 w-full'
                >
                  <RiLogoutCircleRLine className='text-xl mr-2' />
                  <p className='ml-1'>Wyloguj</p>
                </button>
              </div>
            )}

            {currentUser?.status === 'admin' && isMenuUserOpen && (
              <div
                className='absolute right-0 mt-0 w-64 bg-white border border-gray-200 rounded-md shadow-lg'
                onMouseEnter={() => setIsMenuUserOpen(true)}
                onMouseLeave={() => setIsMenuUserOpen(false)}
              >
                {adminMenuItems.map((item, index) => (
                  <Link
                    key={index}
                    to={item.to}
                    className='flex text-black hover:bg-gray-100 items-center rounded'
                  >
                    <div className='flex text-black hover:bg-gray-100 items-center rounded p-3'>
                      {item.icon}
                      <p className='ml-1'>{item.label}</p>
                    </div>
                  </Link>
                ))}

                <button
                  onClick={handleSignOut}
                  className='flex text-black hover:bg-gray-100 items-center rounded p-3 w-full'
                >
                  <RiLogoutCircleRLine className='text-xl mr-2' />
                  <p className='ml-1'>Wyloguj</p>
                </button>
              </div>
            )}
          </div>
        </div>

        <div className='relative z-10'>
          <div
            onMouseEnter={() => setIsMenuHelpOpen(true)}
            onMouseLeave={() => setIsMenuHelpOpen(false)}
          >
            <Link
              to='/pomoc'
              className={`flex items-center cursor-pointer p-3 ml-4 rounded-md transition-smooth ${isMenuHelpOpen ? 'bg-gray-100' : 'hover:bg-gray-100'}`}
            >
              <IoHelpCircleOutline className='text-3xl'/>
            </Link>
          </div>
          {isMenuHelpOpen && (
            <div
              onMouseEnter={() => setIsMenuHelpOpen(true)}
              onMouseLeave={() => setIsMenuHelpOpen(false)}
              className='absolute right-0 w-64 bg-white border border-gray-200 rounded-md shadow-lg'
            >
              {helpMenuItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.to}
                  className='flex text-black hover:bg-gray-100 items-center rounded'
                >
                  <div className='flex text-black hover:bg-gray-100 items-center rounded p-3'>
                    {item.icon}
                    <p className='ml-1'>{item.label}</p>
                  </div>
                </Link>
              ))}

              {contactItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className='flex px-2 py-2 ml-7 text-black items-center hover:underline transition-smooth'
                >
                  {item.label}
                </a>
              ))}
            </div>
          )}
        </div>

        <Link to='/ulubione' className='relative ml-4 cursor-pointer hover:bg-gray-100 p-2 px-3 rounded-md transition-smooth'>
          <IoHeartOutline className='text-3xl'/>
          <div className='absolute bg-orange-600 h-4 w-4 top-2 right-2 rounded flex justify-center items-center'>
            <p className='text-[12px] text-white'>1</p>
          </div>
        </Link>

        <div className='relative text-gray-700'>
          <div
            onMouseEnter={() => setIsMenuCartOpen(true)}
            onMouseLeave={() => setIsMenuCartOpen(false)}
          >
            <Link
              to='/koszyk'
              className={`flex items-center cursor-pointer p-3 ml-4 rounded-md transition-smooth ${isMenuCartOpen ? 'bg-gray-100' : 'hover:bg-gray-100'}`}
            >
              <SlBasket className='text-2xl'/>
              {cartTotalQuantity > 0 && (
                <div className='absolute right-1 top-2 bg-orange-600 h-4 w-4 rounded flex items-center justify-center'>
                  <p className='text-xs text-white font-medium'>{cartTotalQuantity}</p>
                </div>
              )}
            </Link>
          </div>
          {isMenuCartOpen && (
            <div
              onMouseEnter={() => setIsMenuCartOpen(true)}
              onMouseLeave={() => setIsMenuCartOpen(false)}
              className='absolute z-10 right-0 p-4 w-[350px] bg-white border border-gray-200 rounded-md shadow-lg'
            >
              <div className='flex justify-between items-center py-3 border-b-[1px] border-gray-300 font-bold'>
                <h1 className='text-gray-700'>Mój koszyk</h1>
                <IoMdClose
                  className='cursor-pointer hover:bg-gray-100 p-1 text-2xl transition-smooth rounded'
                  onClick={handleCloseCart}
                />
              </div>

              {!cartTotalQuantity ?

              (
                <div className='py-10 flex justify-center items-center'>
                  <p>Twój koszyk jest pusty</p>
                </div>
              )

              :

              (
                <div>

                  {cartItems.map((item, index) => (

                    <div
                      key={index}
                      className='p-4 flex border-b-[1px] border-gray-300'
                    >
                      <img
                        src={item.imageUrls}
                        className='h-20 w-20 object-cover'
                      />
                      <div className='flex flex-col justify-between pl-5 w-full'>
                        <Link to='/' className='font-bold text-orange-600 hover:text-black transition-smooth'>{item.name}</Link>
                        <p>Ilość: {item.cartQuantity}</p>
                        <div className='flex justify-between'>
                          <p>Cena: {item.regularPrice} zł</p>
                          <button
                            onClick={() => handleRemoveFromCart(item)}
                            className='font-bold text-orange-600 hover:text-black transition-smooth'
                          >Usuń</button>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className='flex justify-between py-5 border-b-[1px] border-gray-300'>
                    <p className='text-xl text-gray-700'>Suma:</p>
                    <p className='text-gray-700 font-bold text-xl'>{cart.cartTotalAmount}  zł</p>
                  </div>

                  <div className='flex justify-between pt-5 pb-1'>
                    <ButtonGray text='Zobacz' link="/koszyk" />
                    <ButtonOrange text='Zamów' />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default HeaderMenuTop
