import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdLocationOn } from "react-icons/md";
import { RiCustomerService2Line } from "react-icons/ri";
import { IoIosArrowDown } from 'react-icons/io';

const HeaderMenuBottomAboutButton = () => {

  const [isMenuAboutOpen, setIsMenuAboutOpen] = useState(false);
  const [isMenuWisniowskiOpen, setIsMenuWisniowskiOpen] = useState(false);
  const [isMenuProductionOpen, setIsMenuProductionOpen] = useState(false);
  const [isMenuTransportOpen, setIsMenuTransportOpen] = useState(false);
  const [isMenuGuaranteeOpen, setIsMenuGuaranteeOpen] = useState(false);

  return (
    <div
      className={`relative flex items-center z-10 mr-8 p-2 cursor-pointer rounded-md transition-smooth ${isMenuAboutOpen ? 'bg-gray-100' : 'hover:bg-gray-100'}`}
      onMouseEnter={() => setIsMenuAboutOpen(true)}
      onMouseLeave={() => setIsMenuAboutOpen(false)}
    >
      <Link to='/' className='flex items-center'>
        <p className='font-bold'>Kontakt</p>
        <IoIosArrowDown className='ml-2' />
      </Link>

      {isMenuAboutOpen && (
        <div
          className='absolute top-11 left-[-1px] p-6 bg-white rounded-md shadow-lg flex w-auto border-t-2 border-l-1 border-b-1 border-r-1 border-gray-200 border-t-orange-600 transition-smooth'
          onMouseEnter={() => setIsMenuShopOpen(true)}
          onMouseLeave={() => setIsMenuShopOpen(false)}
        >
          <div className='flex whitespace-nowrap h-[300px] w-[600px]'>
            <div className='mr-10'>
              <p className='font-bold pb-2'>Informacje</p>
              <Link
                to="/"
                className="flex items-center pb-2"
              >
                <MdKeyboardArrowRight />
                <p className="whitespace-nowrap hover:text-orange-600 transition-all duration-300 transform hover:translate-x-1">Dane kontaktowe</p>
              </Link>
              <Link
                to='/'
                onMouseEnter={() => setIsMenuWisniowskiOpen(true)}
                onMouseLeave={() => setIsMenuWisniowskiOpen(false)}
                className='flex items-center pb-2'
              >
                <MdKeyboardArrowRight />
                <p className="whitespace-nowrap hover:text-orange-600 transition-all duration-300 transform hover:translate-x-1">Producent Wiśniowski</p>
              </Link>
              <Link
                to='/'
                onMouseEnter={() => setIsMenuProductionOpen(true)}
                onMouseLeave={() => setIsMenuProductionOpen(false)}
                className='flex items-center pb-2'
              >
                <MdKeyboardArrowRight />
                <p className='whitespace-nowrap hover:text-orange-600 transition-all duration-300 transform hover:translate-x-1'>Jak realizujemy zamówienia?</p>
              </Link>
              <Link
                to='/'
                onMouseEnter={() => setIsMenuTransportOpen(true)}
                onMouseLeave={() => setIsMenuTransportOpen(false)}
                className='flex items-center pb-2'
              >
                <MdKeyboardArrowRight />
                <p className='whitespace-nowrap hover:text-orange-600 transition-all duration-300 transform hover:translate-x-1'>Bezpieczna dostawa</p>
              </Link>
              <Link
                to='/'
                onMouseEnter={() => setIsMenuGuaranteeOpen(true)}
                onMouseLeave={() => setIsMenuGuaranteeOpen(false)}
                className='flex items-center pb-4'
              >
                <MdKeyboardArrowRight />
                <p className='whitespace-nowrap hover:text-orange-600 transition-all duration-300 transform hover:translate-x-1'>Gwarancja i reklamacje</p>
              </Link>

              <div className='flex flex-col justify-center items-center'>
                <Link to='/' className='flex items-center justify-center bg-sky-400 text-white rounded-3xl w-[200px] px-10 py-2 mb-4 hover:bg-sky-600 transition-smooth'>
                  <RiCustomerService2Line className='pr-2 text-2xl'/>
                  <p>Zadzwoń</p>
                </Link>
                <Link to='/' className='bg-green-500 text-white rounded-3xl px-10 py-2 hover:bg-green-600 transition-smooth flex items-center'>
                  <MdLocationOn className='pr-2 text-2xl' />
                  <p>Jak dojechać?</p>
                </Link>
              </div>
            </div>


            <div className="w-[400px]">
              <img
                src={
                  isMenuWisniowskiOpen
                    ? '/firma-wisniowski.jpg'
                    : isMenuProductionOpen
                    ? '/produkcja.jpg'
                    : isMenuTransportOpen
                    ? '/transport.jpg'
                    : isMenuGuaranteeOpen
                    ? '/gwarancja.jpg'
                    : '/Prospero-sklep.jpg'
                }
                alt="sklep"
                className="w-full object-cover h-[300px] rounded-lg"
              />
            </div>
          </div>
        </div>
      )}
  </div>
  )
}

export default HeaderMenuBottomAboutButton
