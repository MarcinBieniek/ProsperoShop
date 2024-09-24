import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { GoPlusCircle } from "react-icons/go";
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";

const Users = () => {

  const { allUsers } = useSelector((state) => state.user);
  console.log('users are', allUsers)

  const sortedUsers = [...allUsers].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <div className='bg-gray-100 rounded p-5'>

      <div className='flex justify-between items-center border-b-[1px] pb-5'>
        <p className='text-lg font-bold'>Użytkownicy ({allUsers.length})</p>
        <div className='flex'>
          <div class="bg-white rounded-lg shadow-md w-46 mr-4">
            <input
              type="text"
              placeholder="Szukaj..."
              class="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:border-gray-400 focus:border-transparent"
            />
          </div>
          <Link
            to='/admin/users/add-user'
            className='bg-orange-600 text-white rounded-lg p-2 hover:bg-gray-800 transition-smooth flex items-center'>
            <GoPlusCircle className='mr-2 text-xl' />
            <p>Dodaj użytkownika</p>
          </Link>
        </div>
      </div>

      <div className=' mt-5'>
        <div className='bg-white border-[1px] rounded-lg p-2 pb-0'>

          <div className='p-2 pb-0'>

            {sortedUsers.map((user, index) => (
              <div key={user._id} className='bg-white border-[1px] border-gray-200 p-5 rounded flex w-full mb-5'>
                <div className='w-1/3 flex flex-col items-center py-5 border-r-[1px] border-gray-200'>
                  <img
                    src={user.avatar || '/user-icon.png'}
                    alt='profile image'
                    className='rounded-full h-28 w-28 object-cover mb-5'
                  />
                  <p>{user.username}</p>
                  <p>Nr: {index + 1}</p>
                  <div className='flex mt-5'>
                    <CiEdit className='text-2xl border-[1px] h-10 w-10 p-2 text-green-500 cursor-pointer hover:text-green-600 transition-smooth rounded-tl-lg rounded-bl-lg' />
                    <MdDeleteForever  className='text-2xl border-[1px] border-l-white h-10 w-10 p-2 text-red-500 cursor-pointer hover:text-red-600 rounded-tr-lg rounded-br-lg transition-smooth' />
                  </div>
                </div>
                <div className='w-2/3 px-5'>
                  <p className='mb-3'>
                    <span className='font-bold'>Data dołączenia: </span>
                    {new Date(user.createdAt).toLocaleDateString()}
                  </p>
                  <p className='mb-3'>
                    <span className='font-bold'>Adres email: </span>
                    {user.email}
                  </p>
                  <p className='mb-3'>
                    <span className='font-bold'>Nr tel: </span>
                    {user.phone || 'Brak danych'}
                  </p>
                  <p className='mb-3'>
                    <span className='font-bold'>Adres dostawy: </span>
                    {user.address || 'Brak adresu'}
                  </p>
                  <p className='mb-3'>
                    <span className='font-bold'>Dane do faktury: </span>
                    {user.invoiceDetails || 'Brak danych'}
                  </p>
                  <span className='mb-3 flex'>
                    <span className='font-bold'>Zamówienia: </span>
                    <p className='text-orange-600 ml-1 cursor-pointer'>({user.orders.length})</p>
                  </span>
                  <span className='mb-3 flex'>
                    <span className='font-bold'>Zwroty i reklamacje: </span>
                    <p className='text-orange-600 ml-1 cursor-pointer'>({user.service.length})</p>
                  </span>
                  <span className='mb-3 flex'>
                    <span className='font-bold'>Status: </span>
                    <p className='ml-1'>{user.status}</p>
                  </span>
                </div>
              </div>
            ))}



          </div>

        </div>
      </div>
    </div>
  )
}

export default Users
