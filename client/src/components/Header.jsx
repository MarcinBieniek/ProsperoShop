import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';

import { PiUserCircleLight } from "react-icons/pi";
import { IoHelpCircleOutline } from "react-icons/io5";
import { IoHeartOutline } from "react-icons/io5";
import { SlBasket } from "react-icons/sl";



import { CiSearch } from "react-icons/ci";

import { BsTelephone } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { HiOutlineWrenchScrewdriver } from "react-icons/hi2";
import { PiGarage } from "react-icons/pi";
import { LuPackage } from "react-icons/lu";
import { TiDeleteOutline } from "react-icons/ti";

const Header = () => {

  const { currentUser } = useSelector(state => state.user);
  const  { cartTotalQuantity } = useSelector(state => state.cart)

  const [isCart, setIsCart] = useState(false);
  const [isCartHovered, setIsCartHovered] = useState(false);

  console.log('cart', cartTotalQuantity)

  return (

    <header className='bg-white'>

      <div className='bg-orange-600 h-8 flex justify-center items-center text-white text-sm'>PROMOCJA - 20% NA WSZYSTKIE BRAMY GARAŻOWE</div>

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
            <Link to='/profil' className='flex items-center cursor-pointer hover:bg-gray-100 p-2 rounded-md transition-smooth'>
              {currentUser ?
              (
                <>
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
                </>
              )
                :
              (
                <>
                  <p className='mr-3'>zaloguj się</p>
                  <PiUserCircleLight className='text-3xl'/>
                </>
              )}
            </Link>

            <Link to='/pomoc' className='ml-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md transition-smooth'>
              <IoHelpCircleOutline className='text-3xl'/>
            </Link>

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

  )
}

export default Header