import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { PiUserCircleLight } from "react-icons/pi";
import { IoListCircleOutline } from "react-icons/io5";
import { IoHeartOutline } from "react-icons/io5";
import { TbTruckReturn } from "react-icons/tb";
import { RiLogoutCircleRLine } from "react-icons/ri";

const Admin = () => {
  const { currentUser } = useSelector((state) => state.user);

  const [activeTab, setActiveTab] = useState('users');
  const [orders, setOrders] = useState([
    { id: 1, name: 'Zamówienie 1', date: '2024-09-15', price: '100 zł', approved: 'Tak', status: 'W trakcie' },
    { id: 2, name: 'Zamówienie 2', date: '2024-09-14', price: '150 zł', approved: 'Nie', status: 'Anulowane' },
    { id: 3, name: 'Zamówienie 3', date: '2024-09-14', price: '200 zł', approved: 'Tak', status: 'Gotowe' }
  ]);

  const getStatusClass = (status) => {
    switch (status) {
      case 'Anulowane':
        return 'bg-red-600 text-white';
      case 'W trakcie':
        return 'bg-yellow-400 text-white';
      case 'Gotowe':
        return 'bg-green-500 text-white';
      default:
        return '';
    }
  };

  return (
    <div className='container my-10'>
      <div className='flex'>

        <div className='w-1/4 p-3'>
          <div className='bg-sky-600 rounded p-5 text-white'>
            <p className='text-lg font-bold mb-3'>Panel admina</p>

            <div
              className={`flex items-center mb-3 hover:text-gray-800 cursor-pointer transition-smooth ${activeTab === 'users' ? 'text-gray-800' : ''}`}
              onClick={() => setActiveTab('users')}
            >
              <PiUserCircleLight className='text-2xl mr-3' />
              <p className='font-bold'>Użytkownicy</p>
            </div>

            <div
              className={`flex items-center mb-3 hover:text-gray-800 cursor-pointer transition-smooth ${activeTab === 'orders' ? 'text-gray-800' : ''}`}
              onClick={() => setActiveTab('orders')}
            >
              <IoListCircleOutline className='text-2xl mr-3' />
              <p className='font-bold'>Zamówienia</p>
            </div>
            <div
              className={`flex items-center mb-3 hover:text-gray-800 cursor-pointer transition-smooth ${activeTab === 'products' ? 'text-gray-800' : ''}`}
              onClick={() => setActiveTab('products')}
            >
              <IoHeartOutline className='text-2xl mr-3' />
              <p className='font-bold'>Produkty</p>
            </div>
            <div
              className={`flex items-center mb-3 hover:text-gray-800 cursor-pointer transition-smooth ${activeTab === 'returns' ? 'text-gray-800' : ''}`}
              onClick={() => setActiveTab('returns')}
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
          <div className='bg-gray-100 rounded p-5'>

            {activeTab === 'users' && (
              <div className=''>
                <p className='text-lg font-bold'>Użytkownicy</p>
              </div>
            )}

            {activeTab === 'orders' && (
              <div>
                <p className='text-lg font-bold'>Zamówienia</p>
              </div>
            )}

            {activeTab === 'products' && (
              <p className='text-lg font-bold'>Produkty</p>
            )}

            {activeTab === 'returns' && (
              <p className='text-lg font-bold'>Zwroty i reklamacje</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Admin;
