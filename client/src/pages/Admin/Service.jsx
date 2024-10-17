import { useState } from 'react';

const Service = () => {

  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className='bg-gray-100 rounded p-5'>

      <div className='flex justify-between items-center border-b-[1px] pb-5'>
        <p className='text-lg font-bold'>Zwroty i reklamacje</p>
        <div className='flex'>
          <div className="bg-white rounded-lg shadow-md w-46 mr-4">
            <input
              type="text"
              placeholder="Szukaj..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:border-gray-400 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <div className='mt-5'>
        <div className='bg-white border-[1px] rounded-lg p-2'>
          Tabela
        </div>
      </div>

    </div>
  )
}

export default Service
