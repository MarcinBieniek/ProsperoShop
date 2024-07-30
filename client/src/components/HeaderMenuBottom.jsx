import { PiGarage } from "react-icons/pi";
import { IoIosArrowDown } from "react-icons/io";

const HeaderMenuBottom = () => {
  return (
    <div className='h-16 flex items-center justify-between'>
      <div className='flex'>
        <div className='flex items-center border-gray-200 border-2 rounded-3xl p-1 mr-10 hover:border-orange-600 transition-smooth cursor-pointer'>
          <PiGarage className='text-white text-2xl bg-orange-600 rounded-full p-2 h-8 w-8' />
          <p className='px-5 font-bold'>Wyceń bramę Wiśniowski</p>
        </div>
        <div className='flex items-center mr-10 cursor-pointer'>
          <p className='font-bold'>Sklep online</p>
          <IoIosArrowDown className='ml-2' />
        </div>
        <div className='flex items-center mr-10 cursor-pointer'>
          <p className='font-bold'>Poznaj nas</p>
          <IoIosArrowDown className='ml-2' />
        </div>
        <div className='flex items-center mr-10 cursor-pointer'>
          <p className='font-bold'>Transport i gwarancja</p>
          <IoIosArrowDown className='ml-2' />
        </div>
        <div className='flex items-center mr-10 cursor-pointer'>
          <p className='font-bold'>Kontakt</p>
          <IoIosArrowDown className='ml-2' />
        </div>
      </div>
      <div className='font-bold'>Partner firmy</div>
    </div>
  )
}

export default HeaderMenuBottom
