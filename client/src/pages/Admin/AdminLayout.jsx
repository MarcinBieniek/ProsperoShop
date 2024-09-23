import React from 'react';
import { Outlet, Link } from 'react-router-dom';

import { PiUserCircleLight } from "react-icons/pi";
import { IoListCircleOutline } from "react-icons/io5";
import { IoHeartOutline } from "react-icons/io5";
import { TbTruckReturn } from "react-icons/tb";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { LuLayoutPanelLeft } from "react-icons/lu";

const AdminLayout = () => {

  return (
    <div className='container my-10'>
      <div className='flex'>

        <div className='w-1/4 p-3'>
          <div className='bg-sky-600 rounded p-5 text-white'>
            <p className='text-lg font-bold mb-3'>Panel admina</p>

            <Link to='/admin/panel-glowny'
              className='flex items-center mb-3 hover:text-gray-800 cursor-pointer transition-smooth'
            >
              <LuLayoutPanelLeft className='text-2xl mr-3' />
              <p className='font-bold'>Panel główny</p>
            </Link>

            <Link to='/admin/uzytkownicy'
              className='flex items-center mb-3 hover:text-gray-800 cursor-pointer transition-smooth'
            >
              <PiUserCircleLight className='text-2xl mr-3' />
              <p className='font-bold'>Użytkownicy</p>
            </Link>

            <div
              className='flex items-center mb-3 hover:text-gray-800 cursor-pointer transition-smooth'
            >
              <IoListCircleOutline className='text-2xl mr-3' />
              <p className='font-bold'>Zamówienia</p>
            </div>
            <div
              className='flex items-center mb-3 hover:text-gray-800 cursor-pointer transition-smooth'
            >
              <IoHeartOutline className='text-2xl mr-3' />
              <p className='font-bold'>Produkty</p>
            </div>
            <div
              className='flex items-center mb-3 hover:text-gray-800 cursor-pointer transition-smooth'
            >
              <TbTruckReturn className='text-2xl mr-3' />
              <p className='font-bold'>Zwroty i reklamacje</p>
            </div>
            <div className='flex items-center hover:text-gray-800 cursor-pointer transition-smooth'>
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
