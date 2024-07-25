import { categoriesData, productsData } from "../../public/temp_data";
import { useState } from 'react';
import MainShopDropdownFilters from './MainShopDropdownFilters';

const MainShop = () => {
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
    <div className=''>
      <div className='container'>
        <div className='py-5 bg-indigo-400 flex justify-center'>
          <input
            type="text"
            placeholder='Wpisz nazwę produktu'
            className='bg-gray-200 h-10 w-64'
            value={searchTerm}
            onChange={handleSearchChange}
          />
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
    </div>
  )
}

export default MainShop;
