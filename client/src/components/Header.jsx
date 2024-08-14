import HeaderMenuBottom from './HeaderMenuBottom';
import HeaderMenuTop from './HeaderMenuTop';

const Header = () => {
  return (
    <header className='bg-white'>
      <div className='bg-orange-600 h-8 flex justify-center items-center text-white text-sm'>
        PROMOCJA - 20% NA WSZYSTKIE BRAMY GARAŻOWE
      </div>
      <div className='container text-black h-36'>
        <HeaderMenuTop />
        <HeaderMenuBottom />
      </div>
    </header>
  );
}

export default Header;
