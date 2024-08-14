import React from 'react';
import { MdKeyboardArrowRight } from "react-icons/md";

const ShopSidebarMenu = ({ categories, activeCategory, expandedCategory, toggleCategory, setActiveSubcategory }) => {
  return (
    <ul className="border-[2px] rounded-xl">
      <h1 className="border-b-[2px] border-gray-200 p-5 text-xl text-gray-700">Kategorie</h1>
      <div className='py-5'>
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
      </div>
    </ul>
  );
};

export default ShopSidebarMenu;
