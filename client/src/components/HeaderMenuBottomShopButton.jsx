import { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoIosArrowDown } from 'react-icons/io';
import { categories } from '../../public/temp_data';

import { MdKeyboardArrowRight } from "react-icons/md";

const slugify = (text) => {
  const map = {
    ą: 'a',
    ć: 'c',
    ę: 'e',
    ł: 'l',
    ń: 'n',
    ó: 'o',
    ś: 's',
    ź: 'z',
    ż: 'z',
  };

  return text
    .toLowerCase()
    .replace(/[ąćęłńóśźż]/g, (match) => map[match])
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
};

const HeaderMenuBottomShopButton = () => {
  const [isMenuShopOpen, setIsMenuShopOpen] = useState(false);

  const filteredCategories = categories.filter(
    category => category.name !== 'Wszystkie produkty' && category.name !== 'Bramy'
  );

  return (
    <div
      className={`relative flex items-center mr-8 p-2 cursor-pointer rounded-md transition-smooth ${isMenuShopOpen ? 'bg-gray-100' : 'hover:bg-gray-100'}`}
      onMouseEnter={() => setIsMenuShopOpen(true)}
      onMouseLeave={() => setIsMenuShopOpen(false)}
    >
      <Link to='/sklep' className='flex items-center'>
        <p className='font-bold'>Sklep online</p>
        <IoIosArrowDown className='ml-2' />
      </Link>
      {isMenuShopOpen && (
        <div
          onMouseEnter={() => setIsMenuShopOpen(true)}
          onMouseLeave={() => setIsMenuShopOpen(false)}
          className='absolute top-11 left-[-1px] p-6 bg-white rounded-md shadow-lg flex w-auto border-[1px] border-gray-200 transition-smooth'
        >
          <div className='flex'>
            <Link to='/wycena' className='relative flex-grow font-bold pb-2 hover:text-orange-600 whitespace-nowrap'>
              <p className='mr-[100px] flex-grow font-bold pb-2 whitespace-nowrap transition-smooth'>Bramy garażowe</p>
              <div className='w-[80%] rounded-md hover:shadow-lg transition-smooth'>
                <img src='wycen-brame-banner.jpg' alt='banner' className='rounded-md' />
              </div>
              <button className='absolute bottom-10 left-9 bg-orange-600 text-white p-2 px-6 rounded-lg hover:bg-black'>Wyceń</button>
            </Link>

            {filteredCategories.map((category, index) => (
              <div key={index} className='mr-8 flex-grow'>
                <p className='font-bold pb-2 hover:text-orange-600 whitespace-nowrap transition-smooth'>{category.name}</p>
                {category.subcategories && (
                  <div>
                    {category.subcategories.map((subcategory, subIndex) => (
                      <Link
                        to={`/sklep/${slugify(category.name)}/${slugify(subcategory)}`}
                        key={subIndex}
                        className='flex items-center pb-2'
                      >
                        <MdKeyboardArrowRight />
                        <p className='hover:text-orange-600 whitespace-nowrap transition-all duration-300 transform hover:translate-x-1'>{subcategory}</p>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HeaderMenuBottomShopButton;
