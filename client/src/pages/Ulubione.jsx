import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ShopProductCard from '../components/ShopProductCard';
import { MdKeyboardArrowRight } from "react-icons/md";
import { setShouldScroll } from '../redux/scroll/scrollSlice';
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import ShopFilterDropdown from '../components/ShopFilterDropdown';

const formatCategoryName = (name) => name.toLowerCase().replace(/\s+/g, '-');

const formatSubcategoryName = (name) => {
  const mapDiacritics = {
    'ą': 'a', 'ć': 'c', 'ę': 'e', 'ł': 'l', 'ń': 'n',
    'ó': 'o', 'ś': 's', 'ź': 'z', 'ż': 'z',
    'Ą': 'A', 'Ć': 'C', 'Ę': 'E', 'Ł': 'L', 'Ń': 'N',
    'Ó': 'O', 'Ś': 'S', 'Ź': 'Z', 'Ż': 'Z',
  };

  return name
    .replace(/[ąćęłńóśźżĄĆĘŁŃÓŚŹŻ]/g, (char) => mapDiacritics[char] || char)
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .trim();
};

const Ulubione = () => {
  const { items } = useSelector((state) => state.products);
  const { category, subcategory } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [categoryFilteredProducts, setCategoryFilteredProducts] = useState(items);
  const [filteredProducts, setFilteredProducts] = useState(items);
  const [availableProducers, setAvailableProducers] = useState([]);
  const [activeProducers, setActiveProducers] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [priceRange, setPriceRange] = useState([0, 0]);
  const [sortOption, setSortOption] = useState('Sortuj według');

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
      const formattedCategory = formatCategoryName(product.category);
      const formattedSubcategory = formatSubcategoryName(product.subcategory || '');

      if (!category || category === 'wszystkie-produkty') return true;
      if (subcategory) {
        return formattedCategory === category && formattedSubcategory === subcategory;
      }
      return formattedCategory === category;
    });

    setCategoryFilteredProducts(filteredByCategory);

    const producers = filteredByCategory.map((product) => product.producer);
    const uniqueProducers = [...new Set(producers)];
    setAvailableProducers(uniqueProducers);

    const filteredByPriceAndProducer = filteredByCategory.filter((product) => {
      return (activeProducers.length === 0 || activeProducers.includes(product.producer));
    });

    if (filteredByPriceAndProducer.length > 0) {
      const prices = filteredByPriceAndProducer.map((product) => product.price);
      const min = Math.min(...prices);
      const max = Math.max(...prices);
      setMinPrice(min);
      setMaxPrice(max);
      setPriceRange([min, max]);
    } else {
      setMinPrice(0);
      setMaxPrice(0);
      setPriceRange([0, 0]);
    }
  }, [items, category, subcategory, activeProducers]);

  useEffect(() => {
    const producerFilteredProducts = categoryFilteredProducts.filter((product) =>
      activeProducers.length === 0 || activeProducers.includes(product.producer)
    );

    const priceFilteredProducts = producerFilteredProducts.filter((product) =>
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    let sortedProducts = [...priceFilteredProducts];
    if (sortOption === 'Najdroższe produkty') {
      sortedProducts.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'Najtańsze produkty') {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'Nazwa A-Z') {
      sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === 'Nazwa Z-A') {
      sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortOption === 'Najniższa ocena') {
      sortedProducts.sort((a, b) => a.rating - b.rating);
    } else if (sortOption === 'Najwyższa ocena') {
      sortedProducts.sort((a, b) => b.rating - a.rating);
    }

    setFilteredProducts(sortedProducts);
  }, [activeProducers, categoryFilteredProducts, priceRange, sortOption]);

  useEffect(() => {
    setActiveProducers([]);
  }, [category, subcategory]);

  const handleSortOptionSelect = (option) => {
    setSortOption(option);
  };

  return (
    <div className="container">
      <div className="breadcrumbs pt-5 pb-9 flex items-center text-gray-800">
        <Link to="/" className="hover:text-orange-600">Strona główna</Link>
        <MdKeyboardArrowRight className="px-1 text-3xl" />
        <Link to="/ulubione" className={`hover:text-orange-600 ${!category ? 'text-orange-600' : ''}`}>Ulubione produkty</Link>
      </div>

      <div className="flex">

        <div className="w-full">
          <h1 className="text-3xl text-gray-700 mb-5">
            Ulubione produkty
          </h1>
          <div className="bg-gray-100 my-5 rounded-xl">
            <div className="p-2 pr-4 flex justify-between items-center">
              <BsFillGrid3X3GapFill className="text-xl ml-2" />
              <ShopFilterDropdown onOptionSelect={handleSortOptionSelect} />
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4 text-gray-800 py-2">
            {filteredProducts.map((product) => (
              <ShopProductCard
                key={product._id}
                product={product}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ulubione;
