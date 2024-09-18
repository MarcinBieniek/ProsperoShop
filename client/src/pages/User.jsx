import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { PiUserCircleLight } from "react-icons/pi";
import { IoListCircleOutline } from "react-icons/io5";
import { IoHeartOutline } from "react-icons/io5";
import { TbTruckReturn } from "react-icons/tb";
import { RiLogoutCircleRLine } from "react-icons/ri";

const App = () => {
  const { currentUser } = useSelector((state) => state.user);

  const [activeTab, setActiveTab] = useState('editProfile');
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
            <p className='text-lg font-bold mb-3 cursor-pointer hover:text-gray-800 transition-smooth'>Panel klienta</p>
            <div
              className={`flex items-center mb-3 hover:text-gray-800 cursor-pointer transition-smooth ${activeTab === 'editProfile' ? 'text-gray-800' : ''}`}
              onClick={() => setActiveTab('editProfile')}
            >
              <PiUserCircleLight className='text-2xl mr-3' />
              <p className='font-bold'>Edytuj dane</p>
            </div>
            <div
              className={`flex items-center mb-3 hover:text-gray-800 cursor-pointer transition-smooth ${activeTab === 'orders' ? 'text-gray-800' : ''}`}
              onClick={() => setActiveTab('orders')}
            >
              <IoListCircleOutline className='text-2xl mr-3' />
              <p className='font-bold'>Zamówienia</p>
            </div>
            <div
              className={`flex items-center mb-3 hover:text-gray-800 cursor-pointer transition-smooth ${activeTab === 'favorites' ? 'text-gray-800' : ''}`}
              onClick={() => setActiveTab('favorites')}
            >
              <IoHeartOutline className='text-2xl mr-3' />
              <p className='font-bold'>Ulubione produkty</p>
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
            <p className='text-lg font-bold mb-5'>Panel klienta</p>

            {activeTab === 'editProfile' && (
              <div className='flex mb-5'>
                <div className='bg-white border-[1px] border-gray-200 p-5 rounded flex w-full
                '>
                  <div className='w-1/3 flex flex-col items-center py-5 border-r-[1px] border-gray-200'>
                    <img
                      src={currentUser.avatar}
                      alt='profile'
                      className='rounded-full h-24 w-24 object-cover cursor-pointer mb-5'
                    />
                    <p>{currentUser.username}</p>
                  </div>
                  <div className='w-2/3 px-5'>
                    <p className='mb-3'>
                      <span className='font-bold'>Adres email: </span>
                      {currentUser.email}
                    </p>
                    <p className='mb-3'>
                      <span className='font-bold'>Nr tel: </span>
                      123456789
                    </p>
                    <p className='mb-3'>
                      <span className='font-bold'>Adres dostawy: </span>
                      Ul. Mickiewicza 8, 12-345 Bytom
                    </p>
                    <p className='mb-3'>
                      <span className='font-bold'>Dane do faktury: </span>
                      Ul. Mickiewicza 8, 12-345 Bytom, NIP 123456789
                    </p>
                    <p className='mb-3'>
                      <span className='font-bold'>Data dołączenia: </span>
                      01/02/34
                    </p>
                    <div className='flex justify-end mt-5'>
                      <button className='bg-orange-600 text-white px-3 py-2 rounded-3xl hover:bg-gray-800 transition-smooth'>Edytuj dane</button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <>
                <p className='text-lg font-bold mb-5'>Ostatnie zamówienia</p>
                <div className='bg-white border-[1px] border-gray-200 rounded overflow-x-auto mb-5'>
                  <table className='min-w-full divide-y divide-gray-200'>
                    <thead>
                      <tr>
                        <th className='px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider'>Id</th>
                        <th className='px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider'>Data</th>
                        <th className='px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider'>Cena</th>
                        <th className='px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider'>Zatwierdzone</th>
                        <th className='px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider'>Status</th>
                        <th className='px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider'>Data wysyłki</th>
                        <th className='px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider'>Akcja</th>
                      </tr>
                    </thead>
                    <tbody className='bg-white divide-y divide-gray-200'>
                      {orders.map((order) => (
                        <tr key={order.id} className='hover:bg-gray-100'>
                          <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{order.id}</td>
                          <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{order.date}</td>
                          <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{order.price}</td>
                          <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{order.approved}</td>
                          <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                            <p className={`text-center rounded-2xl ${getStatusClass(order.status)}`}>{order.status}</p>
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>-</td>
                          <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                            <button className='text-orange-600 hover:text-gray-800 transition-smooth'>
                              Szczegóły
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}

            {activeTab === 'favorites' && (
              <p>Ulubione produkty</p>
            )}
            {activeTab === 'returns' && (
              <p>Zwroty i reklamacje</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
