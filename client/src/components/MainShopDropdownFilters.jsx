import { useState } from 'react';
import { IoIosArrowDown } from "react-icons/io";

const Dropdown = ({ onOptionSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Sortuj według');

  const options = [
    'Najdroższe produkty',
    'Najtańsze produkty',
    'Nazwa A-Z',
    'Nazwa Z-A',
    'Najniższa ocena',
    'Najwyższa ocena'
  ];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    onOptionSelect(option);
  };

  return (
    <div className='relative inline-block text-left'>
      <button
        onClick={toggleDropdown}
        className=' text-gray-800 bg-white px-4 py-2 rounded-2xl border-2 border-gray-200 focus:outline-none flex items-center'
      >
        {selectedOption}
        <IoIosArrowDown className='ml-10' />
      </button>
      {isOpen && (
        <div className='absolute right-0 w-48 bg-white border border-gray-300 rounded-xl shadow-lg z-10'>
          {options.map((option, index) => (
            <div
              key={index}
              onClick={() => handleOptionClick(option)}
              className='px-4 py-2 hover:bg-gray-100 cursor-pointer'
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
