import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { productsData, categories } from "../../public/temp_data";
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, getTotals } from "../redux/cart/cartSlice";
import PriceFilter from "../components/ShopFilterPriceRange";
import ShopFilterDropdown from '../components/ShopFilterDropdown';
import ShopSidebarMenu from '../components/ShopSidebarMenu';
import ShopFilterProducers from '../components/ShopFilterProducers';
import ShopProductCard from '../components/ShopProductCard';
import { MdKeyboardArrowRight } from "react-icons/md";
import { BsFillGrid3X3GapFill } from "react-icons/bs";

const Shop = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const [sortOption, setSortOption] = useState('Wybierz opcję');
  const [activeCategory, setActiveCategory] = useState('Wszystkie produkty');
  const [activeMainCategory, setActiveMainCategory] = useState(null);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [activeProducer, setActiveProducer] = useState('Wszyscy producenci');
  const [priceRange, setPriceRange] = useState([0, 0]);

  useEffect(() => {
    const category = queryParams.get('category');
    const subcategory = queryParams.get('subcategory');

    if (category && subcategory) {
      setActiveMainCategory(category);
      setActiveCategory(subcategory);
      setExpandedCategory(category);
    } else if (category) {
      setActiveCategory('Wszystkie produkty');
      setActiveMainCategory(category);
      setExpandedCategory(category);
    } else {
      setExpandedCategory(null);
    }
  }, [location.search]);

  const value = useSelector((state) => state.products.items);
  const status = useSelector((state) => state.products.status);

  useEffect(() => {
    if (status === "fulfilled") {
      dispatch(getTotals());
    }
  }, [status, dispatch]);

  if (status === "pending") {
    return <div className='flex w-full h-[400px] justify-center items-center'>Loading...</div>;
  }

  if (status === "rejected") {
    return <div className='flex w-full h-[400px] justify-center items-center'>Nie można załadować produktów. Spróbuj ponownie, później.</div>;
  }

  const minPrice = Math.min(...productsData.map(product => product.regularPrice));
  const maxPrice = Math.max(...productsData.map(product => product.regularPrice));

  useEffect(() => {
    setPriceRange([minPrice, maxPrice]);
  }, [minPrice, maxPrice]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    dispatch(getTotals());
  };

  const handleSortOptionSelect = (option) => {
    setSortOption(option);
  };

  const toggleCategory = (categoryName) => {
    if (categoryName === 'Wszystkie produkty' || !categories.find(cat => cat.name === categoryName).subcategories) {
      setActiveCategory(categoryName);
      setActiveMainCategory(null);
      setExpandedCategory(null);
    } else {
      setExpandedCategory(expandedCategory === categoryName ? null : categoryName);
      setActiveMainCategory(categoryName);
    }
    setActiveProducer('Wszyscy producenci');
  };

  const setActiveSubcategory = (subcategoryName) => {
    setActiveCategory(subcategoryName);
    setActiveProducer('Wszyscy producenci');
  };

  const getAvailableProducers = () => {
    const availableProducers = new Set();
    productsData.forEach(product => {
      if (activeCategory === 'Wszystkie produkty' || product.category === activeCategory) {
        availableProducers.add(product.producer);
      }
    });
    return Array.from(availableProducers);
  };

  const applyFilters = () => {
    console.log('Filtry zostały zastosowane:', priceRange);
  };

  const filteredProducts = productsData
    .filter(product => {
      if (activeCategory === 'Wszystkie produkty') return true;
      return product.category === activeCategory;
    })
    .filter(product => {
      if (activeProducer === 'Wszyscy producenci') return true;
      return product.producer === activeProducer;
    })
    .filter(product => {
      return product.regularPrice >= priceRange[0] && product.regularPrice <= priceRange[1];
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
      <div className='pt-5 pb-9 flex items-center text-gray-800'>
        <p>Strona główna</p>
        <MdKeyboardArrowRight className='px-1 text-3xl' />
        <p>Sklep</p>
      </div>

      <div className='flex'>
        <div className='w-[300px]'>
          <div className="w-64 h-full text-gray-800">
            <ShopSidebarMenu
              categories={categories}
              activeCategory={activeCategory}
              expandedCategory={expandedCategory}
              toggleCategory={toggleCategory}
              setActiveSubcategory={setActiveSubcategory}
            />
            <div className='relative'>
              <h1 className='text-xl mt-10 pb-3 border-b-[1px] border-gray-200'>Filtry</h1>
              <div className='absolute h-[2px] w-[70px] bg-orange-500 bottom-[1px]'></div>
            </div>
            <ShopFilterProducers
              activeProducer={activeProducer}
              setActiveProducer={setActiveProducer}
              availableProducers={getAvailableProducers()}
            />
            <PriceFilter
              minPrice={minPrice}
              maxPrice={maxPrice}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              applyFilters={applyFilters}
            />
          </div>
        </div>

        <div className='w-full pl-10'>
          <h1 className="text-3xl text-gray-700">
            {activeMainCategory ? `${activeMainCategory} / ${activeCategory}` : activeCategory}
          </h1>
          <div className='bg-gray-100 my-5 rounded-xl'>
            <div className='p-2 pr-4 flex justify-between items-center'>
              <BsFillGrid3X3GapFill className='text-xl ml-2' />
              <ShopFilterDropdown onOptionSelect={handleSortOptionSelect} />
            </div>
          </div>
          <div className='grid grid-cols-4 gap-4 text-gray-800 py-2'>
            {filteredProducts.map((product, index) => (
              <ShopProductCard
                key={index}
                product={product}
                handleAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shop;
