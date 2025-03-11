import { LuShoppingCart } from "react-icons/lu";
import { PiMoneyWavy } from "react-icons/pi";
import { RiArrowDownDoubleFill } from "react-icons/ri";
import { FaCircleArrowRight } from "react-icons/fa6";
import { FiUsers } from "react-icons/fi";

import { Link } from 'react-router-dom'
import AdminProductsList from "../../components/AdminProductsList";

const Dashboard = () => {

  return (
    <div className='bg-gray-100 rounded p-5'>

      <div className='flex justify-between items-center border-b-[1px] pb-5'>
        <p className='text-lg font-bold'>Panel admina</p>
      </div>

      <div className='mt-5'>
        <div className='bg-white border-[1px] rounded-lg p-2 grid grid-cols-3 mb-5'>
          <div className='border rounded m-2 col-span-2 p-3'>
            <p className='font-bold mb-5'>Sprzedaż</p>
            <p className='inline-block text-white mb-5 bg-orange-600 p-2 rounded'>Listopad 2024</p>
            <div className='grid grid-cols-3 gap-2 mb-3'>
              <div className='border rounded p-3'>
                <LuShoppingCart className='text-3xl mb-2' />
                <p className='text-3xl mb-2'>34</p>
                <p className='text-gray-400'>Ilość zamówień</p>
              </div>

              <div className='border rounded p-3'>
                <PiMoneyWavy className='text-3xl mb-2' />
                <p className='text-3xl mb-2'>34 765</p>
                <p className='text-gray-400'>Wartość sprzedaży </p>
              </div>

              <div className='border rounded p-3'>
                <RiArrowDownDoubleFill className='text-3xl mb-2' />
                <p className='text-3xl mb-2'>5 609</p>
                <p className='text-gray-400'>Zysk</p>
              </div>
            </div>

            <div className='flex justify-end items-center'>
              <Link to='/admin/orders' className='flex items-center text-orange-600 hover:text-gray-800 transition-smooth cursor-pointer'>
                <p className='mr-2'>Szczegóły sprzedaży</p>
                <FaCircleArrowRight />
              </Link>
            </div>
          </div>

          <div className='col-span-1 bg-green-500 m-2 rounded p-3 flex flex-col justify-between'>
            <div>
              <p className='font-bold mb-5 text-white'>Użytkownicy</p>
              <FiUsers className='bg-white rounded-full h-14 w-14 p-2 mb-5' />
              <p className='text-white text-3xl mb-3'>34</p>
              <p className='text-white '>Liczba użytkowników</p>
            </div>

            <div className='flex justify-end items-center '>
              <Link to='/admin/users' className='flex items-center text-white hover:text-gray-800 transition-smooth cursor-pointer'>
              <p className='mr-2'>Zarządzaj</p>
              <FaCircleArrowRight />
              </Link>
            </div>

          </div>
        </div>

        <div className='mb-5 bg-white border-[1px] rounded-lg p-2'>
          <div className='border rounded m-2'>
            <AdminProductsList limit={5} />
          </div>
          <div className='flex justify-end items-center'>
            <Link to='/admin/products' className='flex items-center text-orange-600 hover:text-gray-800 transition-smooth cursor-pointer p-2'>
              <p className='mr-2'>Zobacz wszystkie</p>
              <FaCircleArrowRight />
            </Link>
          </div>
        </div>

        <div className=' bg-white border-[1px] rounded-lg p-2'>
          <div className='border rounded m-2 p-3 hover:border-gray-400 transition-smooth'>
            <p className='font-bold mb-5'>Reklamacje</p>
          </div>
        </div>

      </div>

    </div>
  )
}

export default Dashboard
