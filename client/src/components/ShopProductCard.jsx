import React from 'react';
import { Link } from "react-router-dom";
import { SlBasket } from "react-icons/sl";

const ShopProductCard= ({ product, handleAddToCart }) => {
  return (
    <div className='basket-container border shadow-md border-gray-200 hover:shadow-xl transition-smooth rounded-lg p-2'>
      <p className='text-sm pb-2'>{product.producer}</p>
      <Link to='/' className='font-bold text-sky-400 hover:text-yellow-300 transition-smooth'>
        <p className='pb-3'>{product.name}</p>
      </Link>
      <Link className='relative'>
        <img
          className='object-fit w-full rounded h-[200px]'
          src='https://www.skandoor.co.uk/wp-content/uploads/2023/01/9e449b54-bc56-43fd-9cc3-c075b6bb83c7-1500x1125.jpg'
          alt={product.name}
        />
      </Link>
      <div className='pt-3 flex items-center justify-between'>
        {product.discountedPrice ? (
          <div className='flex items-center'>
            <p className='text-red-600 text-2xl mr-5'>{product.discountedPrice} zł</p>
            <p className='text-sm line-through'>{product.regularPrice} zł</p>
          </div>
        ) : (
          <div className='flex items-center'>
            <p className='text-2xl mr-5'>{product.regularPrice} zł</p>
          </div>
        )}
        <div
          className='basket-icon cursor-pointer transition-smooth text-sm bg-gray-200 rounded-full w-10 h-10 text-white flex items-center justify-center'
          onClick={() => handleAddToCart(product)}
        >
          <SlBasket className='text-2xl' />
        </div>
      </div>
      <p className='text-sm py-2'>{product.description}</p>
    </div>
  );
};

export default ShopProductCard;
