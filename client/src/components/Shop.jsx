import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { categories } from "../../public/temp_data";
import ShopProductCard from '../components/ShopProductCard';
import { MdKeyboardArrowRight } from "react-icons/md";
import { setShouldScroll } from '../redux/scroll/scrollSlice';

// Utils for formatting
const formatCategoryName = (name) => name.toLowerCase().replace(/\s+/g, '-');
const formatSubcategoryName = (name) => name.toLowerCase().replace(/\s+/g, '-');
const formatDisplayName = (name) => {
  const parts = name.split('-');
  return parts[0].charAt(0).toUpperCase() + parts[0].slice(1) + ' ' + parts.slice(1).join(' ').toLowerCase();
};

const Shop = () => {
  const { items } = useSelector((state) => state.products);
  const { category, subcategory } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [categoryFilteredProducts, setCategoryFilteredProducts] = useState(items);
  const [filteredProducts, setFilteredProducts] = useState(items);
  const [availableProducers, setAvailableProducers] = useState([]);
  const [activeProducer, setActiveProducer] = useState('Wszyscy producenci');
  const [expandedCategory, setExpandedCategory] = useState(category || null);

  const displayCategory = category ? formatDisplayName(category) : 'Wszystkie produkty';
  const displaySubcategory = subcategory ? formatDisplayName(subcategory) : null;

  useEffect(() => {
    if (category) {
      dispatch(setShouldScroll(false));
    }
    return () => {
      dispatch(setShouldScroll(true));
    };
  }, [category, dispatch]);

  useEffect(() => {
    // Filter products by category and subcategory
    const filteredByCategory = items.filter((product) => {
      if (!category || category === 'wszystkie-produkty') return true;
      if (subcategory) {
        return product.category.toLowerCase() === category && product.subcategory.toLowerCase().replace(/\s+/g, '-') === subcategory;
      }
      return product.category.toLowerCase() === category;
    });

    setCategoryFilteredProducts(filteredByCategory);

    const producers = filteredByCategory.map((product) => product.producer);
    const uniqueProducers = [...new Set(producers)];
    setAvailableProducers(uniqueProducers);

    setActiveProducer(uniqueProducers.length === 1 ? uniqueProducers[0] : 'Wszyscy producenci');
  }, [items, category, subcategory]);

  useEffect(() => {
    // Filter products by producer based on categoryFilteredProducts
    const producerFilteredProducts = categoryFilteredProducts.filter((product) =>
      activeProducer === 'Wszyscy producenci' || product.producer === activeProducer
    );
    setFilteredProducts(producerFilteredProducts);
  }, [activeProducer, categoryFilteredProducts]);

  const handleCategoryClick = (categoryName) => {
    const formattedCategoryName = formatCategoryName(categoryName);
    if (formattedCategoryName === 'wszystkie-produkty') {
      navigate(`/sklep/wszystkie-produkty`);
      setExpandedCategory(false);
    } else {
      navigate(`/sklep/${formattedCategoryName}`);
      setExpandedCategory((prevCategory) => (prevCategory === categoryName ? null : categoryName));
    }
  };

  const handleSubcategoryClick = (categoryName, subcategoryName) => {
    navigate(`/sklep/${formatCategoryName(categoryName)}/${formatSubcategoryName(subcategoryName)}`);
  };

  return (
    <div className='container'>
      <div className='breadcrumbs pt-5 pb-9 flex items-center text-gray-800'>
        <Link to="/" className="hover:text-orange-600">Strona główna</Link>
        <MdKeyboardArrowRight className='px-1 text-3xl' />
        <Link to="/sklep" className={`hover:text-orange-600 ${!category ? 'text-orange-600' : ''}`}>Sklep</Link>
        {category && (
          <>
            <MdKeyboardArrowRight className='px-1 text-3xl' />
            <Link to={`/sklep/${formatCategoryName(category)}`} className={`hover:text-orange-600 ${formatCategoryName(category) === category && !subcategory ? 'text-orange-600' : ''}`}>
              {displayCategory}
            </Link>
            {subcategory && (
              <>
                <MdKeyboardArrowRight className='px-1 text-3xl' />
                <Link to={`/sklep/${formatCategoryName(category)}/${formatSubcategoryName(subcategory)}`} className="hover:text-orange-600 text-orange-600">
                  {displaySubcategory}
                </Link>
              </>
            )}
          </>
        )}
      </div>

      <div className='flex'>
        <div className='w-[300px]'>
          <ul className="border-[2px] rounded-xl">
            <h1 className="border-b-[2px] border-gray-200 p-5 text-xl text-gray-700">Kategorie</h1>
            <div className='py-5'>
              {categories.map((categoryItem) => (
                <li key={categoryItem.name} className="flex flex-col items-center">
                  <button
                    className={`flex items-center justify-between w-[80%] text-left py-2 transition-smooth ${
                      formatCategoryName(categoryItem.name) === category ? 'font-bold' : ''
                    }`}
                    onClick={() => handleCategoryClick(categoryItem.name)}
                  >
                    {categoryItem.name}
                    {categoryItem.subcategories && <MdKeyboardArrowRight />}
                  </button>
                  {expandedCategory === categoryItem.name && categoryItem.subcategories && (
                    <ul className="w-full transition-smooth">
                      {categoryItem.subcategories.map((subcategoryItem) => (
                        <li
                          key={subcategoryItem}
                          className={`py-1 pl-10 text-left w-full cursor-pointer transition-smooth ${
                            formatSubcategoryName(subcategoryItem) === subcategory ? 'font-bold text-orange-600' : ''
                          }`}
                          onClick={() => handleSubcategoryClick(categoryItem.name, subcategoryItem)}
                        >
                          {subcategoryItem}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </div>
          </ul>

          <div className='producers mt-10 mb-7 pb-2 border-b-[1px] border-gray-200'>
            <p className='font-bold mb-5'>Producent</p>
            <div className='mb-5'>
              {availableProducers.length > 1 && (
                <div className='flex items-center'>
                  <input
                    type="radio"
                    id="wszyscy-producenci"
                    className="form-radio h-4 w-4 text-orange-600"
                    checked={activeProducer === 'Wszyscy producenci'}
                    onChange={() => setActiveProducer('Wszyscy producenci')}
                  />
                  <label htmlFor="wszyscy-producenci" className="ml-2 text-gray-700">
                    Wszyscy producenci
                  </label>
                </div>
              )}
              {availableProducers.map((producer, index) => (
                <div key={index} className='flex items-center'>
                  <input
                    type="radio"
                    id={`producer-${producer}`}
                    className="form-radio h-4 w-4 text-orange-600"
                    checked={activeProducer === producer}
                    onChange={() => setActiveProducer(producer)}
                  />
                  <label htmlFor={`producer-${producer}`} className="ml-2 text-gray-700">
                    {producer}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className='w-full pl-10'>
          <h1 className="text-3xl text-gray-700 mb-5">
            {displaySubcategory ? `${displayCategory} / ${displaySubcategory}` : displayCategory}
          </h1>
          <div className='grid grid-cols-4 gap-4 text-gray-800 py-2'>
            {filteredProducts.map((product) => (
              <ShopProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
