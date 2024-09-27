import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { PiUserCircleLight } from "react-icons/pi";
import { IoListCircleOutline } from "react-icons/io5";
import { RiProductHuntLine } from "react-icons/ri";
import { TbTruckReturn } from "react-icons/tb";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { LuLayoutPanelLeft } from "react-icons/lu";

import {
  signOutUserStart,
  signOutUserFailure,
  signOutUserSuccess }
  from '../../redux/user/userSlice';

const AdminLayout = () => {

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

        <div className='w-1/4 p-3'>
          <div className='bg-sky-600 rounded p-5 text-white'>
            <p className='text-lg font-bold mb-3'>Panel admina</p>

            <Link to='/admin/dashboard'
              className='flex items-center mb-3 hover:text-gray-800 cursor-pointer transition-smooth'
            >
              <LuLayoutPanelLeft className='text-2xl mr-3' />
              <p className='font-bold'>Panel główny</p>
            </Link>

            <Link to='/admin/users'
              className='flex items-center mb-3 hover:text-gray-800 cursor-pointer transition-smooth'
            >
              <PiUserCircleLight className='text-2xl mr-3' />
              <p className='font-bold'>Użytkownicy</p>
            </Link>
            <div
              className='flex items-center mb-3 hover:text-gray-800 cursor-pointer transition-smooth'
            >
              <RiProductHuntLine className='text-2xl mr-3' />
              <p className='font-bold'>Produkty</p>
            </div>
            <div
              className='flex items-center mb-3 hover:text-gray-800 cursor-pointer transition-smooth'
            >
              <IoListCircleOutline className='text-2xl mr-3' />
              <p className='font-bold'>Zamówienia</p>
            </div>
            <div
              className='flex items-center mb-3 hover:text-gray-800 cursor-pointer transition-smooth'
            >
              <TbTruckReturn className='text-2xl mr-3' />
              <p className='font-bold'>Zwroty i reklamacje</p>
            </div>

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

export default AdminLayout;
