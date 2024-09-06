import { Link } from 'react-router-dom';
import { PiGarage } from 'react-icons/pi';

import HeaderMenuBottomShopButton from './HeaderMenuBottomShopButton';
import HeaderMenuBottomContactButton from './HeaderMenuBottomContactButton';

const HeaderMenuBottom = () => {
  return (
    <div className='h-16 flex items-center justify-between text-gray-800'>
      <div className='flex'>
        <Link to='/wycena' className='flex items-center border-gray-200 border-2 rounded-3xl p-1 mr-10 hover:border-orange-600 transition-smooth cursor-pointer'>
          <PiGarage className='text-white text-2xl bg-orange-600 rounded-full p-2 h-8 w-8' />
          <p className='px-5 font-bold'>Wyceń bramę Wiśniowski</p>
        </Link>
        <HeaderMenuBottomShopButton />
        <HeaderMenuBottomContactButton />
      </div>
      <div className='flex items-center justify-between'>
        <p className='font-bold'>Partner firmy</p>
        <Link to='https://www.wisniowski.pl/'>
          <img src='/logo/wisniowski2.jpg' alt='logo' className='h-16' />
        </Link>
      </div>
    </div>
  );
};

export default HeaderMenuBottom;
