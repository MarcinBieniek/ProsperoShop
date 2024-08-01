import React, { useState } from 'react';
import { MdKeyboardArrowRight } from "react-icons/md";

const SidebarMenu = () => {
  const [activeCategory, setActiveCategory] = useState(null);

  const categories = [
    {
      name: 'Wszystkie produkty'
    },
    {
      name: 'Automatyka',
      subcategories: ['Bramy garażowe', 'Bramy przesuwne', 'Bramy przemysłowe', 'Szyny do napędów'],
    },
    {
      name: 'Akcesoria'
    }
  ];

  const toggleCategory = (categoryName) => {
    if (activeCategory === categoryName) {
      setActiveCategory(null);
    } else {
      setActiveCategory(categoryName);
    }
  };

  return (
    <div className="w-64 h-full text-gray-800">
      <ul className="border-[2px] rounded-xl">
        <h1 className="border-b-[2px] border-gray-200 p-5 text-xl text-gray-700">Kategorie</h1>
        {categories.map((category, index) => (
          <li key={category.name} className="flex flex-col items-center">
            <button
              className={`flex items-center justify-between w-[80%] text-left py-2 ${index !== categories.length - 1 ? 'border-b-[2px] border-gray-200' : ''}`}
              onClick={() => toggleCategory(category.name)}
            >
              {category.name}
              {category.subcategories && <MdKeyboardArrowRight />}
            </button>
            {activeCategory === category.name && category.subcategories && (
              <ul className="w-full">
                {category.subcategories.map((subcategory) => (
                  <li key={subcategory} className="py-1 pl-10 text-left w-full">
                    {subcategory}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SidebarMenu;
