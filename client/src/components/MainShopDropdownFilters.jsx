import { useState } from 'react';

const Dropdown = ({ onOptionSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Wybierz opcję');

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
    onOptionSelect(option); // Przekazanie opcji do rodzica
  };

  return (
    <div className='relative inline-block text-left'>
      <button
        onClick={toggleDropdown}
        className='bg-blue-500 text-white px-4 py-2 rounded focus:outline-none'
      >
        {selectedOption}
        <svg
          className='w-5 h-5 inline ml-2'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M19 9l-7 7-7-7'></path>
        </svg>
      </button>
      {isOpen && (
        <div className='absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg z-10'>
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
