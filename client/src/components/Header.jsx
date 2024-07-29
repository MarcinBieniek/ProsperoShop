import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';

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

const Header = () => {
  const { currentUser } = useSelector(state => state.user);
  const { cartTotalQuantity } = useSelector(state => state.cart);

  const [isMenuUserOpen, setIsMenuUserOpen] = useState(false);
  const [isMenuHelpOpen, setIsMenuHelpOpen] = useState(false);

  const userMenuItems = [
    { to: '/profil', icon: <PiUserCircleLight className='text-xl mr-2' />, label: 'Mój profil' },
    { to: '/profil', icon: <IoListCircleOutline className='text-xl mr-2' />, label: 'Zamówienia' },
    { to: '/profil', icon: <IoHeartOutline className='text-xl mr-2' />, label: 'Ulubione produkty' },
    { to: '/profil', icon: <TbTruckReturn className='text-xl mr-2' />, label: 'Reklamacje i zwroty' },
    { to: '/profil', icon: <PiUserCircleLight className='text-xl mr-2' />, label: 'Wyloguj' },
  ];

  const helpMenuItems = [
    { to: '/profil', icon: <PiGarageLight className='text-xl mr-2' />, label: 'Nasza firma' },
    { to: '/profil', icon: <FaGears className='text-xl mr-2' />, label: 'Ile trwa produkcja?' },
    { to: '/profil', icon: <CiDeliveryTruck className='text-xl mr-2' />, label: 'Jak przebiega dostawa?' },
    { to: '/profil', icon: <GoTools className='text-xl mr-2' />, label: 'Gwarancja i reklamacje' },
    { to: '/profil', icon: <RiCustomerService2Line className='text-xl mr-2' />, label: 'Szybki kontakt' },
  ];

  const contactItems = [
    { href: 'mailto:kontakt@bramyslask.pl', label: 'kontakt@bramyslask.pl' },
    { href: 'tel:+48123456789', label: '+48 123 456 789' },
  ];

  return (
    <header className='bg-white'>
      <div className='bg-orange-600 h-8 flex justify-center items-center text-white text-sm'>
        PROMOCJA - 20% NA WSZYSTKIE BRAMY GARAŻOWE
      </div>

      <div className='container text-black h-72'>
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
              <span className="absolute inset-y-0 right-[4px] flex items-center p-2 my-1 bg-orange-600 text-2xl rounded-3xl cursor-pointer">
                <CiSearch className="text-white" />
              </span>
            </div>
          </div>

          <div className='flex items-center'>
            <div className='relative'>
              <div
                onMouseEnter={() => setIsMenuUserOpen(true)}
                onMouseLeave={() => setIsMenuUserOpen(false)}
              >
                <Link
                  to='/profil'
                  className={`flex items-center cursor-pointer p-2 rounded-md transition-smooth ${isMenuUserOpen ? 'bg-gray-100' : 'hover:bg-gray-100'}`}
                >
                  {currentUser ? (
                    <button className='flex items-center'>
                      <div className='mr-3 text-sm'>
                        <p className='flex justify-end text-gray-600'>Witaj,</p>
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

                {currentUser && isMenuUserOpen && (
                  <div
                    className='absolute right-0 mt-0 w-48 bg-white border border-gray-200 rounded-md shadow-lg'
                    onMouseEnter={() => setIsMenuUserOpen(true)}
                    onMouseLeave={() => setIsMenuUserOpen(false)}
                  >
                    {userMenuItems.map((item, index) => (
                      <Link
                        key={index}
                        to={item.to}
                        className='flex px-2 py-2 text-black hover:bg-gray-100 items-center'
                      >
                        {item.icon}
                        <p className='text-sm'>{item.label}</p>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className='relative'>
              <div
                onMouseEnter={() => setIsMenuHelpOpen(true)}
                onMouseLeave={() => setIsMenuHelpOpen(false)}
              >
                <Link
                  to='/pomoc'
                  className={`flex items-center cursor-pointer p-2 py-3 ml-4 rounded-md transition-smooth ${isMenuHelpOpen ? 'bg-gray-100' : 'hover:bg-gray-100'}`}
                >
                  <IoHelpCircleOutline className='text-3xl'/>
                </Link>
              </div>
              {isMenuHelpOpen && (
                <div
                  onMouseEnter={() => setIsMenuHelpOpen(true)}
                  onMouseLeave={() => setIsMenuHelpOpen(false)}
                  className='absolute right-0 mt-0 w-48 bg-white border border-gray-200 rounded-md shadow-lg'
                >
                  {helpMenuItems.map((item, index) => (
                    <Link
                      key={index}
                      to={item.to}
                      className='flex px-2 py-2 text-black hover:bg-gray-100 items-center'
                    >
                      {item.icon}
                      <p className='text-sm'>{item.label}</p>
                    </Link>
                  ))}

                  {contactItems.map((item, index) => (
                    <a
                      key={index}
                      href={item.href}
                      className='flex px-2 py-2 ml-7 text-black items-center text-sm hover:underline transition-smooth'
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              )}
            </div>

            <Link to='/ulubione' className='relative ml-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md transition-smooth'>
              <IoHeartOutline className='text-3xl'/>
              <div className='absolute bg-orange-600 h-4 w-4 top-2 right-2 rounded flex justify-center items-center'>
                <p className='text-[12px] text-white'>1</p>
              </div>
            </Link>



            <Link to='/koszyk' className='relative ml-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md transition-smooth'>
              <SlBasket className='text-2xl'/>
              <div className='absolute bg-orange-600 h-4 w-4 top-1 right-1 rounded flex justify-center items-center'>
                <p className='text-[12px] text-white'>{cartTotalQuantity}</p>
              </div>
            </Link>
          </div>
        </div>

        <div className='bg-orange-600'>
          Menu
        </div>
      </div>
    </header>
  );
}

export default Header;
