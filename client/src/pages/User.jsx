import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const User = () => {
  const { currentUser } = useSelector((state) => state.user);

  console.log('current user is', currentUser)

  return (
    <div className='bg-gray-100 rounded p-5'>
      <p className='text-lg font-bold mb-5'>Twój profil</p>
      <div className='flex mb-5'>
        <div className='bg-white border-[1px] border-gray-200 p-5 rounded flex w-full'>
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
              {currentUser.telephone || 'Dodaj nr telefonu'}
            </p>
            <p className='mb-3'>
              <span className='font-bold'>Adres dostawy: </span>
              {currentUser.address ?
                `Ul. ${currentUser.address.street || ''}
                ${currentUser.address.streetNumber || ''},
                ${currentUser.address.postalCode || ''}
                ${currentUser.address.city || ''}`
                .trim()
                : 'Dodaj adres dostawy'
              }
            </p>
            <p className='mb-3'>
              <span className='font-bold'>Dane do faktury: </span>
              {currentUser.company ?
                `Ul. ${currentUser.company.street || ''}
                ${currentUser.company.streetNumber || ''},
                ${currentUser.company.postalCode || ''}
                ${currentUser.company.city || ''}`
                .trim()
                : 'Dodaj dane do faktury'
              }
            </p>
            <p className='mb-3'>
              <span className='font-bold'>Data dołączenia: </span>
              {new Date(currentUser.createdAt).toLocaleDateString("pl-PL")}
            </p>
            <div className='flex justify-end mt-5'>
              <button className='bg-orange-600 text-white px-3 py-2 rounded-3xl hover:bg-gray-800 transition-smooth'>
                Edytuj dane
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
