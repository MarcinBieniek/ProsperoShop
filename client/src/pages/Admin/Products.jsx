import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Modal from '../../common/Modal';
import {
  deleteProductStart,
  deleteProductSuccess,
  deleteProductFailure
} from '../../redux/products/productsSlice';

import { GoPlusCircle } from "react-icons/go";

const Products = () => {

  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const { items } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const filteredProducts = items.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.subcategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.producer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.subcategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.shortDescription.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteProduct = async () => {
    try {
      dispatch(deleteProductStart());
      const res = await fetch(`/api/product/delete/${selectedProduct._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();

      if (data.success === false) {
        dispatch(deleteProductFailure(data.message));
        return;
      }
      dispatch(deleteProductSuccess(selectedProduct._id));
      setShowModal(false);
    } catch (error) {
      dispatch(deleteProductFailure(error.message));
    }
  };

  const openModal = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  return (
    <div className='bg-gray-100 rounded p-5'>

      {showModal && (
        <Modal
          message="Czy na pewno chcesz usunąć produkt?"
          username={selectedProduct.name}
          onConfirm={handleDeleteProduct}
          onCancel={() => setShowModal(false)}
        />
      )}

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
              {filteredProducts.map(product => (
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
                    <Link
                      className='bg-green-500 hover:bg-green-600 text-white rounded px-2 py-1 cursor-pointer'
                      to={`/admin/products/edit-product/${product._id}`} state={product}
                    >
                      Edytuj
                    </Link>
                    <button
                      onClick={() => openModal(product)}
                      className='bg-red-500 hover:bg-red-600 text-white rounded px-2 py-1 ml-2 cursor-pointer'
                    >Usuń</button>
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
