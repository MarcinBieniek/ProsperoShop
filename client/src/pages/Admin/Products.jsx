import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { GoPlusCircle } from "react-icons/go";

const Products = () => {

  const { items } = useSelector((state) => state.products);

  const [searchQuery, setSearchQuery] = useState('');

  // wip quill

  return (
    <div className='bg-gray-100 rounded p-5'>
      <div className='flex justify-between items-center border-b-[1px] pb-5'>
        <p className='text-lg font-bold'>Produkty ({items.length})</p>
        <div className='flex'>
          <div className="bg-white rounded-lg shadow-md w-46 mr-4">
            <input
              type="text"
              placeholder="Szukaj produktu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:border-gray-400 focus:border-transparent"
            />
          </div>
          <Link
            to='/admin/products/add-product'
            className='bg-orange-600 text-white rounded-lg p-2 hover:bg-gray-800 transition-smooth flex items-center'>
            <GoPlusCircle className='mr-2 text-xl' />
            <p>Dodaj produkt</p>
          </Link>
        </div>
      </div>

      <div className='mt-5'>
        <div className='bg-white border-[1px] rounded-lg p-4'>
          <table className='min-w-full'>
            <thead>
              <tr className='border-b-[1px] border-gray-300 uppercase text-sm'>
                <th className='py-5'>Nazwa</th>
                <th className='py-5 px-2'>Kod</th>
                <th className='py-5 px-2'>Kategoria</th>
                <th className='py-5 px-2'>Cena</th>
                <th className='py-5 px-2'>Przecena</th>
                <th className='py-5 px-2'>Edycja</th>
              </tr>
            </thead>
            <tbody>
              {items.map(product => (
                <tr key={product.id} className='border-b-[1px] border-bg-100 hover:bg-gray-100'>
                  <td className='py-5 px-2 flex items-center'>
                    <img src={product.imageUrls[0]} alt={product.name} className='w-10 h-10 mr-2' />
                    {product.name}
                  </td>
                  <td className='py-5 px-2'>{product.productCode}</td>

                  {product.category === 'Bramy' &&
                    <td className='py-5 px-2  text-center'>
                      <p className='bg-orange-600 text-white py-1 rounded'>{product.category}</p>
                    </td>
                  }

                  {product.category === 'Automatyka' &&
                    <td className='py-5 px-2  text-center'>
                      <p className='bg-blue-500 text-white py-1 rounded'>{product.category}</p>
                    </td>
                  }

                  {product.category === 'Akcesoria' &&
                    <td className='py-5 px-2  text-center'>
                      <p className='bg-purple-600 text-white py-1 rounded'>{product.category}</p>
                    </td>
                  }

                  {product.category === 'Ogrodzenia' &&
                    <td className='py-5 px-2  text-center'>
                      <p className='bg-yellow-400 text-white py-1 rounded'>{product.category}</p>
                    </td>
                  }

                  <td className='py-5 px-2'>{product.price}</td>
                  {product.discountedPrice ?
                    <td className='py-5 px-2 text-center'>{product.discountedPrice}</td>
                    :
                    <td className='py-5 px-2 text-center'> - </td>
                  }
                  <td className='py-5 px-2 text-center'>
                    <button className='bg-green-500 hover:bg-green-600 text-white rounded px-2 py-1 cursor-pointer'>Edytuj</button>
                    <button className='bg-red-500 hover:bg-red-600 text-white rounded px-2 py-1 ml-2 cursor-pointer'>Anuluj</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Products;
