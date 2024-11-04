import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { categories } from "../../public/temp_data";
import ShopProductCard from '../components/ShopProductCard';
import { MdKeyboardArrowRight } from "react-icons/md";

// Utils do formatowania
const formatCategoryName = (name) => name.toLowerCase().replace(/\s+/g, '-');
const formatSubcategoryName = (name) => name.toLowerCase().replace(/\s+/g, '-');
const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);

// Zaktualizowana funkcja do formatowania wyświetlania
const formatDisplayName = (name) => {
  const parts = name.split('-'); // Podziel na części
  if (parts.length === 0) return name; // Zwróć oryginalny ciąg, jeśli jest pusty
  // Zwróć tylko pierwszy element z wielką literą, a resztę z małymi
  return parts[0].charAt(0).toUpperCase() + parts[0].slice(1) + ' ' + parts.slice(1).join(' ').toLowerCase();
};

const Shop = () => {
  const { items } = useSelector((state) => state.products);
  const { category, subcategory } = useParams();
  const navigate = useNavigate();

  const [filteredProducts, setFilteredProducts] = useState(items);
  const [expandedCategory, setExpandedCategory] = useState(category || null);

  // Nazwa do wyświetlania
  const displayCategory = category ? formatDisplayName(category) : 'Wszystkie produkty';
  const displaySubcategory = subcategory ? formatDisplayName(subcategory) : null;

  useEffect(() => {
    const filtered = items.filter((product) => {
      if (!category || category === 'wszystkie-produkty') {
        return true; // Zwracamy wszystkie produkty
      }
      // Filtrowanie po kategorii i podkategorii
      if (subcategory) {
        return product.category.toLowerCase() === category && product.subcategory.toLowerCase().replace(/\s+/g, '-') === subcategory;
      }
      if (category) {
        return product.category.toLowerCase() === category;
      }
      return false; // Domyślnie nie zwracamy nic
    });
    setFilteredProducts(filtered);
  }, [items, category, subcategory]);

  const handleCategoryClick = (categoryName) => {
    const formattedCategoryName = formatCategoryName(categoryName);

    if (formattedCategoryName === 'wszystkie-produkty') {
      navigate(`/sklep/wszystkie-produkty`);
      setExpandedCategory(false);
    } else {
      navigate(`/sklep/${formattedCategoryName}`);
      setExpandedCategory((prevCategory) =>
        prevCategory === categoryName ? null : categoryName
      );
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
            <Link to={`/sklep/${formatCategoryName(category)}`} className={`hover:text-orange-600 ${formatCategoryName(category) === category ? 'text-orange-600' : ''}`}>
              {displayCategory}
            </Link>
            {subcategory && (
              <>
                <MdKeyboardArrowRight className='px-1 text-3xl' />
                <Link to={`/sklep/${formatCategoryName(category)}/${formatSubcategoryName(subcategory)}`} className={`hover:text-orange-600 text-orange-600`}>
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
