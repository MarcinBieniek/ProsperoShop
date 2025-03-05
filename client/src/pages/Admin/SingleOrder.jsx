import React from 'react'
import { useLocation } from "react-router-dom";

const SingleOrder = () => {

  const location = useLocation();
  const order = location.state;

  console.log('order', order)

  return (
    <div className='bg-gray-100 rounded p-5'>

      <div className='flex justify-between items-center border-b-[1px] pb-5'>
        <p className='text-lg font-bold'>Zamówienie #{order._id.slice(-6)}</p>
        <p className='text-lg font-bold'> {order.user.username}</p>
      </div>

      <div className='mt-5'>
        <div className='bg-white border-[1px] rounded-lg p-4'>
          <div className='flex justify-between border-b-[1px] border-gray-300 mb-5 pb-5' >
            <div>
              <p className='font-bold mb-2'>Adres dostawy</p>
              <p>{order.address.clientData.name}</p>
              {order.address.clientData.apartmentNumber ? (
                <p>{order.address.clientData.street} {order.address.clientData.buildingNumber}/{order.address.clientData.apartmentNumber}</p>
              ) : (
                <p>{order.address.clientData.street} {order.address.clientData.buildingNumber}</p>
              )}
              <p>{order.address.clientData.postalCode} {order.address.clientData.city}</p>
              <p>Tel: {order.address.clientData.phoneNumber}</p>
            </div>
            <div>
              <p className='font-bold mb-2'>Dane do faktury</p>

              {order.address.companyData ? (
              <>
                <p>{order.address.companyData.companyName}</p>
                {order.address.companyData.companyApartmentNumber ? (
                  <p>{order.address.companyData.companyStreet} {order.address.companyData.companyBuildingNumber}/{order.address.companyData.companyApartmentNumber}</p>
                ) : (
                  <p>{order.address.companyData.companyStreet} {order.address.companyData.companyBuildingNumber}</p>
                )}
                <p>{order.address.companyData.companyPostalCode} {order.address.companyData.companyCity}</p>
                <p>NIP: {order.address.companyData.nip}</p>
                <p>Tel: {order.address.companyData.companyPhoneNumber}</p>
              </>
              ) : (
              <>
                <p>{order.address.clientData.name}</p>
                {order.address.clientData.apartmentNumber ? (
                  <p>{order.address.clientData.street} {order.address.clientData.buildingNumber}/{order.address.clientData.apartmentNumber}</p>
                ) : (
                  <p>{order.address.clientData.street} {order.address.clientData.buildingNumber}</p>
                )}
                <p>{order.address.clientData.postalCode} {order.address.clientData.city}</p>
                <p>Tel: {order.address.clientData.phoneNumber}</p>
              </>
              )}
            </div>
            <div>
              <p className='font-bold mb-2'>Dostawa</p>
              <div className='flex items-center'>
                <img src={order.deliveryMethod.icon} className='h-10 w-10 mr-2' />
                <p>{order.deliveryMethod.name}</p>
              </div>
              <p>Cena: {order.deliveryMethod.price} zł</p>
              <p>Czas realizacji: {order.deliveryMethod.time}</p>
            </div>
            <div>
              <p className='font-bold mb-2'>Płatność</p>
              <img src={order.paymentMethod.icon} className='h-10 mr-2 object-cover' />
              <p>{order.paymentMethod.name}</p>
            </div>
          </div>
          asd
        </div>
      </div>
    </div>
  )
}

export default SingleOrder
