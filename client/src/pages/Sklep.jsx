import { productsData } from "../../public/temp_data";
import { useState } from 'react';
import MainShopDropdownFilters from '../components/MainShopDropdownFilters';
import { Link } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { SlBasket } from "react-icons/sl";

const Sklep = () => {
  const [sortOption, setSortOption] = useState('Wybierz opcję');
  const [activeCategory, setActiveCategory] = useState('Wszystkie produkty');
  const [activeMainCategory, setActiveMainCategory] = useState(null);
  const [expandedCategory, setExpandedCategory] = useState(null);

  const handleSortOptionSelect = (option) => {
    setSortOption(option);
  };

  const categories = [
    {
      name: 'Wszystkie produkty'
    },
    {
      name: 'Automatyka',
      subcategories: ['Bramy garażowe', 'Bramy przesuwne', 'Bramy przemysłowe', 'Szyny do napędów'],
    },
    {
      name: 'Akcesoria',
      subcategories: ['Fotokomórki']
    }
  ];

  const filteredProducts = productsData
    .filter(product => {
      if (activeCategory === 'Wszystkie produkty') return true;
      return product.category === activeCategory;
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

  const toggleCategory = (categoryName) => {
    if (categoryName === 'Wszystkie produkty' || !categories.find(cat => cat.name === categoryName).subcategories) {
      setActiveCategory(categoryName);
      setActiveMainCategory(null);
      setExpandedCategory(null);
    } else {
      setExpandedCategory(expandedCategory === categoryName ? null : categoryName);
      setActiveMainCategory(categoryName);
    }
  };

  const setActiveSubcategory = (subcategoryName) => {
    setActiveCategory(subcategoryName);
  };

  return (
    <div className='container'>
      <div className='pt-5 pb-9 flex items-center text-gray-800'>
        <p>Strona główna</p>
        <MdKeyboardArrowRight className='px-1 text-3xl' />
        <p>Sklep</p>
      </div>

      <div className='flex'>
        <div className='w-[300px]'>

          <div className="w-64 h-full text-gray-800">
            <ul className="border-[2px] rounded-xl">
              <h1 className="border-b-[2px] border-gray-200 p-5 text-xl text-gray-700">Kategorie</h1>
              {categories.map((category, index) => (
                <li key={category.name} className="flex flex-col items-center">
                  <button
                    className={`flex items-center justify-between w-[80%] text-left py-2 ${index !== categories.length - 1 ? 'border-b-[2px] border-gray-200' : ''} ${activeCategory === category.name ? 'font-bold' : ''}`}
                    onClick={() => toggleCategory(category.name)}
                    onMouseEnter={(e) => e.target.classList.add('font-bold')}
                    onMouseLeave={(e) => {
                      if (activeCategory !== category.name) {
                        e.target.classList.remove('font-bold');
                      }
                    }}
                  >
                    {category.name}
                    {category.subcategories && <MdKeyboardArrowRight className={`transition-transform duration-300 ${expandedCategory === category.name ? 'rotate-90' : ''}`} />}
                  </button>
                  {expandedCategory === category.name && category.subcategories && (
                    <ul className="w-full">
                      {category.subcategories.map((subcategory) => (
                        <li
                          key={subcategory}
                          className={`py-1 pl-10 text-left w-full cursor-pointer ${activeCategory === subcategory ? 'font-bold' : ''}`}
                          onClick={() => setActiveSubcategory(subcategory)}
                          onMouseEnter={(e) => e.target.classList.add('font-bold')}
                          onMouseLeave={(e) => {
                            if (activeCategory !== subcategory) {
                              e.target.classList.remove('font-bold');
                            }
                          }}
                        >
                          {subcategory}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>

        </div>
        <div className='w-full pl-10'>
          <h1 className="text-3xl text-gray-700">
            {activeMainCategory ? `${activeMainCategory} / ${activeCategory}` : activeCategory}
          </h1>
          <div className='bg-gray-100 my-5 rounded-xl'>
            <div className='p-2 pr-4 flex justify-between items-center'>
              <BsFillGrid3X3GapFill className='text-xl ml-2' />
              <MainShopDropdownFilters onOptionSelect={handleSortOptionSelect} />
            </div>
          </div>
          <div className='grid grid-cols-4 gap-4 text-gray-800 py-2'>
            {filteredProducts.map((product, index) => (
              <div key={index} className='basket-container border shadow-md border-gray-200 hover:shadow-xl transition-smooth rounded-lg p-2'>
                <p className='text-sm pb-2'>{product.producer}</p>
                <Link to='/' className='font-bold text-sky-400 hover:text-yellow-300 transition-smooth'>
                  <p className='pb-3'>{product.name}</p>
                </Link>
                <Link className='relative'>
                  <img
                    className='object-fit w-full rounded h-[200px]'
                    src='https://www.skandoor.co.uk/wp-content/uploads/2023/01/9e449b54-bc56-43fd-9cc3-c075b6bb83c7-1500x1125.jpg'
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
                  <div className='basket-icon cursor-pointer transition-smooth text-sm bg-gray-200 rounded-full w-10 h-10 text-white flex items-center justify-center'>
                    <SlBasket className='text-2xl' />
                  </div>
                </div>
                <p className='text-sm py-2'>{product.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sklep;
