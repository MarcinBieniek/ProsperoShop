import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { PiUserCircleLight } from "react-icons/pi";
import { IoListCircleOutline } from "react-icons/io5";
import { TbTruckReturn } from "react-icons/tb";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { IoHeartOutline } from "react-icons/io5";

import {
  signOutUserStart,
  signOutUserFailure,
  signOutUserSuccess }
  from '../redux/user/userSlice';

const UserLayout = () => {

  const dispatch = useDispatch();

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
    <div className='container my-10'>
      <div className='flex'>

        <div className='w-1/4 p-3 sticky top-5 h-max'>
          <div className='bg-sky-600 rounded p-5 text-white'>
            <p className='text-lg font-bold mb-5'>Panel użytkownika</p>

            <Link to='/user/profil'
              className='flex items-center mb-5 hover:text-gray-800 cursor-pointer transition-smooth'
            >
              <PiUserCircleLight className='text-2xl mr-3' />
              <p className='font-bold'>Profil</p>
            </Link>

            <Link to='/user/zamowienia'
              className='flex items-center mb-5 hover:text-gray-800 cursor-pointer transition-smooth'
            >
              <IoListCircleOutline className='text-2xl mr-3' />
              <p className='font-bold'>Zamówienia</p>
            </Link>

            <Link to='/user/ulubione'
              className='flex items-center mb-5 hover:text-gray-800 cursor-pointer transition-smooth'
            >
              <IoHeartOutline className='text-2xl mr-3' />
              <p className='font-bold'>Ulubione produkty</p>
            </Link>

            <Link to='/user/reklamacje'
              className='flex items-center mb-5 hover:text-gray-800 cursor-pointer transition-smooth'
            >
              <TbTruckReturn className='text-2xl mr-3' />
              <p className='font-bold'>Zwroty i reklamacje</p>
            </Link>

            <div
              onClick={handleSignOut}
              className='flex items-center hover:text-gray-800 cursor-pointer transition-smooth'>
              <RiLogoutCircleRLine className='text-2xl mr-3' />
              <p className='font-bold'>Wyloguj</p>
            </div>

          </div>
        </div>

        <div className='w-3/4 p-3'>
          <Outlet />
        </div>

      </div>
    </div>
  );
};

export default UserLayout;
