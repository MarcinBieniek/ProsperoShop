import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ReactSlider from 'react-slider';
import { categories } from "../../public/temp_data";
import ShopProductCard from '../components/ShopProductCard';
import { MdKeyboardArrowRight } from "react-icons/md";
import { setShouldScroll } from '../redux/scroll/scrollSlice';

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
  const [activeProducers, setActiveProducers] = useState([]); // Changed to array for multiple producers
  const [expandedCategory, setExpandedCategory] = useState(category || null);

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [priceRange, setPriceRange] = useState([0, 0]);

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

    const prices = filteredByCategory.map((product) => product.price);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    setMinPrice(min);
    setMaxPrice(max);
    setPriceRange([min, max]);
  }, [items, category, subcategory]);

  useEffect(() => {
    const producerFilteredProducts = categoryFilteredProducts.filter((product) =>
      activeProducers.length === 0 || activeProducers.includes(product.producer)
    );

    const priceFilteredProducts = producerFilteredProducts.filter((product) =>
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    setFilteredProducts(priceFilteredProducts);
  }, [activeProducers, categoryFilteredProducts, priceRange]);

  useEffect(() => {
    const updatedProducers = categoryFilteredProducts
      .filter((product) => product.price >= priceRange[0] && product.price <= priceRange[1])
      .map((product) => product.producer);

    const uniqueProducersInRange = [...new Set(updatedProducers)];
    setAvailableProducers(uniqueProducersInRange);

    if (!uniqueProducersInRange.some((producer) => activeProducers.includes(producer))) {
      setActiveProducers([]);
    }
  }, [priceRange, categoryFilteredProducts]);

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

  const handlePriceInputChange = (index, value) => {
    const newValue = [...priceRange];
    newValue[index] = Number(value);
    setPriceRange(newValue);
  };

  const toggleProducer = (producer) => {
    setActiveProducers((prev) => {
      if (prev.includes(producer)) {
        return prev.filter((p) => p !== producer); // Remove producer if already selected
      } else {
        return [...prev, producer]; // Add producer if not selected
      }
    });
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

          <div className='producers mt-10 mb-7 pb-2 px-5 border-b-[1px] border-gray-200'>
            <p className='font-bold mb-5'>Producent</p>
            <div className='mb-5'>
              {availableProducers.length > 0 && (
                <div className='flex items-center'>
                  <input
                    type="checkbox"
                    id="wszyscy-producenci"
                    className="form-checkbox h-4 w-4 text-orange-600 accent-orange-600"
                    checked={activeProducers.length === 0}
                    onChange={() => {
                      if (activeProducers.length === 0) {
                        setActiveProducers(availableProducers);
                      } else {
                        setActiveProducers([]);
                      }
                    }}
                  />
                  <label htmlFor="wszyscy-producenci" className="ml-2 text-gray-700">
                    Wszyscy producenci
                  </label>
                </div>
              )}
              {availableProducers.map((producer) => (
                <div key={producer} className='flex items-center'>
                  <input
                    type="checkbox"
                    id={`producer-${producer}`}
                    className="form-checkbox h-4 w-4 text-orange-600 accent-orange-600"
                    checked={activeProducers.includes(producer)}
                    onChange={() => toggleProducer(producer)}
                  />
                  <label htmlFor={`producer-${producer}`} className="ml-2 text-gray-700">
                    {producer}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className='px-5'>
            <p className='font-bold mb-5 text-gray-700'>Przedział cenowy</p>

            <ReactSlider
              className="relative w-full h-[6px] mt-[10px] cursor-pointer"
              thumbClassName="custom-thumb"
              trackClassName="custom-track"
              min={minPrice}
              max={maxPrice}
              value={priceRange}
              onChange={(value) => setPriceRange(value)}
              renderThumb={(props, state) => (
                <div {...props} className="bg-orange-600 absolute top-[-7px] text-white p-1 rounded-full h-5 w-5" />
              )}
              ariaLabel={['Minimum price', 'Maximum price']}
              ariaValuetext={(state) => `Price: ${state.valueNow}`}
            />

            <div className='flex justify-between mt-4 text-sm text-gray-600'>
              <span>Od {priceRange[0]} zł</span>
              <span>Do {priceRange[1]} zł</span>
            </div>

            <div className='flex justify-between items-center mt-4'>
              <input
                type="number"
                className="border p-2 rounded-md w-[45%]"
                value={priceRange[0]}
                min={minPrice}
                max={priceRange[1]}
                onChange={(e) => handlePriceInputChange(0, e.target.value)}
              />
              <span className='mx-2 text-gray-700'>-</span>
              <input
                type="number"
                className="border p-2 rounded-md w-[45%]"
                value={priceRange[1]}
                min={priceRange[0]}
                max={maxPrice}
                onChange={(e) => handlePriceInputChange(1, e.target.value)}
              />
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
