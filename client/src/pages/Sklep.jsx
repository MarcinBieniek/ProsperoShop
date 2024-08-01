import { categoriesData, productsData } from "../../public/temp_data";
import { useState } from 'react';
import MainShopDropdownFilters from '../components/MainShopDropdownFilters';
import ShopSidebarMenu from "../components/ShopSidebarMenu";
import { Link } from "react-router-dom";

import { MdKeyboardArrowRight } from "react-icons/md";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { SlBasket } from "react-icons/sl";
import { FaHeart } from "react-icons/fa";

const Sklep = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedProducer, setSelectedProducer] = useState('wszyscy-producenci');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('Wybierz opcję');

  const handleCategoryClick = (id) => {
    setSelectedCategory(id);
    setSelectedProducer('wszyscy-producenci');
    setSearchTerm('');
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleProducerClick = (id) => {
    const producerSlug = categoriesData[0].producenci.find(prod => prod.id === id)?.slug;
    if (producerSlug === 'wszyscy-producenci') {
      setSelectedProducer('wszyscy-producenci');
    } else {
      setSelectedProducer(producerSlug);
    }
  };

  const handleSortOptionSelect = (option) => {
    setSortOption(option);
  };

  const selectedCategorySlug = selectedCategory
    ? categoriesData[0].automatyka.find(cat => cat.id === selectedCategory)?.slug
    : 'wszystkie-kategorie';

  const filteredProducts = productsData
    .filter((product) => {
      const matchesSearchTerm =
        product.name.toLowerCase().includes(searchTerm) ||
        product.producer.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm);
      const matchesCategory =
        selectedCategorySlug === 'wszystkie-kategorie' ||
        product.category === selectedCategorySlug;
      const matchesProducer =
        selectedProducer === 'wszyscy-producenci' ||
        product.producer === selectedProducer ||
        product.producer.toLowerCase().includes(selectedProducer) ||
        product.description.toLowerCase().includes(selectedProducer);
      return matchesSearchTerm && matchesCategory && matchesProducer;
    })
    .sort((a, b) => {
      switch (sortOption) {
        case 'Najdroższe produkty':
          return b.regularPrice - a.regularPrice;
        case 'Najtańsze produkty':
          return a.regularPrice - b.regularPrice;
        case 'Nazwa A-Z':
          return a.name.localeCompare(b.name);
        case 'Nazwa Z-A':
          return b.name.localeCompare(a.name);
        case 'Najniższa ocena':
          return a.stars - b.stars;
        case 'Najwyższa ocena':
          return b.stars - a.stars;
        default:
          return 0;
      }
    });

  return (
    <div className='container'>
      <div className='py-10 flex items-center text-gray-800'>
        <p>Strona główna</p>
        <MdKeyboardArrowRight className='px-1 text-3xl' />
        <p>Sklep</p>
      </div>

      <div className='flex'>
        <div className='w-[300px]'>
          <ShopSidebarMenu />
        </div>
        <div className='w-full pl-10'>
          <h1 className="text-3xl text-gray-700">Wszystkie produkty</h1>
          <div className='bg-gray-100 my-5 rounded-xl'>
            <div className='p-2 pr-4 flex justify-between items-center'>
              <BsFillGrid3X3GapFill className='text-xl ml-2' />
              <MainShopDropdownFilters />
            </div>
          </div>
          <div className='grid grid-cols-4 gap-4 text-gray-800 py-5'>

            <div className='basket-container border border-gray-100 hover:border-gray-200 transition-smooth rounded-lg p-2'>
              <p className='text-sm pb-2'>Nazwa producenta</p>
              <Link to='/' className='font-bold text-sky-400 hover:text-yellow-300 transition-smooth'>
                <p className='pb-3'>Nazwa produktu</p>
              </Link>
              <Link className='relative'>
                <img
                  className='object-cover h-60 w-full rounded'
                  src='https://www.skandoor.co.uk/wp-content/uploads/2023/01/9e449b54-bc56-43fd-9cc3-c075b6bb83c7-1500x1125.jpg'
                />
                <div className='absolute top-2 left-2 bg-green-500 p-1 text-white rounded'>Przecena</div>
                <FaHeart className='absolute top-3 right-2 text-2xl text-red-500 cursor-pointer'/>
              </Link>

              <div className='pt-3 flex items-center justify-between'>
                <div className='flex items-center'>
                  <p className='text-red-600 text-2xl mr-5'>100 zł</p>
                  <p className='text-sm line-through'>120 zł</p>
                </div>
                <div className='basket-icon cursor-pointer transition-smooth text-sm bg-gray-200 rounded-full w-10 h-10 text-white flex items-center justify-center'>
                  <SlBasket className='text-2xl' />
                </div>
              </div>
              <p className='text-sm py-2'>Skrócony opis produktu, który ma na celu zachęcić do zakupu.</p>
            </div>

          </div>
        </div>
      </div>

      <div className='flex py-5'>
          <div className='w-1/6 bg-red-400 p-2'>
            <div>
              <p className='py-2 font-bold'>Sklep / Automatyka</p>
              <p className='py-2 font-bold'>Kategorie</p>

              {categoriesData[0].automatyka.map((item) => (
                <p
                  key={item.id}
                  onClick={() => handleCategoryClick(item.id)}
                  className={`text-sm cursor-pointer ${selectedCategory === item.id ? 'font-bold underline' : ''} hover:font-bold hover:underline`}
                >{item.title}</p>
              ))}

              <p className='py-2 font-bold'>Producenci</p>

              {categoriesData[0].producenci.map((item) => (
                <div key={item.id} className='flex'>
                  <input
                    type='checkbox'
                    checked={selectedProducer === item.slug}
                    onChange={() => handleProducerClick(item.id)}
                  />
                  <p
                    className='text-sm cursor-pointer'
                    onClick={() => handleProducerClick(item.id)}
                  >{item.title}</p>
                </div>
              ))}
            </div>
          </div>
          <div className='w-5/6 bg-red-300 py-3 p-2'>
            <div className='flex justify-between pb-5'>
              <p>Produkty</p>
              <div>
                <MainShopDropdownFilters onOptionSelect={handleSortOptionSelect} />
              </div>
            </div>
            <div className='grid grid-cols-4 gap-2'>
              {filteredProducts.map((product, index) => (
                <div key={index} className='bg-white rounded'>
                  <p>{product.name}</p>
                  <p>{product.category}</p>
                  <p>{product.regularPrice}</p>
                </div>
              ))}
            </div>
          </div>
      </div>
    </div>

  )
}

export default Sklep;
