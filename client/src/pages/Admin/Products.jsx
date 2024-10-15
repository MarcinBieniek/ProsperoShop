import { useState } from 'react';

const Products = () => {

  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className='bg-gray-100 rounded p-5'>
      <div className='flex justify-between items-center border-b-[1px] pb-5'>
        <p className='text-lg font-bold'>Produkty (2)</p>
        <div className='flex'>
          <div className="bg-white rounded-lg shadow-md w-46 mr-4">
            <input
              type="text"
              placeholder="Szukaj użytkownika..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:border-gray-400 focus:border-transparent"
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
    </div>
  )
}

export default Products
