import { IoIosArrowDroprightCircle } from "react-icons/io";
import { Link } from 'react-router-dom';
import { LuPencilRuler } from "react-icons/lu";
import { MdOutlineHandshake } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";

const HelpSection = () => {

  return (
    <div className='text-gray-800 py-12'>
      <div className='container'>
        <div className='grid grid-cols-3 gap-4'>

          <div className='bg-gray-100 h-[150px] rounded group cursor-pointer shadow hover:shadow-md transition-smooth overflow-hidden'>
            <Link to='/sklep' className='flex justify-center items-center h-full'>
              <img
                src='/help-section/naped-moto.png'
                className='w-1/2 object-contain h-full py-3'
                alt='Naped Moto'
              />
              <div className='w-1/2'>
                <p className='uppercase'>
                  Dobierz <span className='font-bold'>napęd</span> i inne <span className='font-bold'>akcesoria</span>
                </p>
                <div className='flex items-center mt-4'>
                  <p className='mr-2 font-bold'>Sklep online</p>
                  <IoIosArrowDroprightCircle className='text-orange-600 duration-300 transform group-hover:translate-x-3' />
                </div>
              </div>
            </Link>
          </div>

          <div className='bg-gray-100 h-[150px] rounded group cursor-pointer shadow hover:shadow-md transition-smooth overflow-hidden'>
            <Link to='/sklep' className='flex justify-center items-center h-full'>
              <MdOutlineHandshake
                className='w-1/2 text-6xl'
              />
              <div className='w-1/2'>
                <p className='uppercase'>
                  Potrzebujesz <span className='font-bold'>pomocy</span> przy <span className='font-bold'>wycenie?</span>
                </p>
                <div className='flex items-center mt-4'>
                  <p className='mr-2 font-bold'>Skontaktuj się z nami</p>
                  <IoIosArrowDroprightCircle className='text-orange-600 duration-300 transform group-hover:translate-x-3' />
                </div>
              </div>
            </Link>
          </div>

          <div className='bg-gray-100 h-[150px] rounded group cursor-pointer shadow hover:shadow-md transition-smooth overflow-hidden'>
            <Link to='/' className='flex justify-center items-center h-full'>
              <LuPencilRuler
                className='w-1/2 text-6xl'

              />
              <div className='w-1/2'>
                <p className='uppercase'>
                  Jak <span className='font-bold'>prawidłowo</span> zmierzyć <span className='font-bold'>bramę?</span>
                </p>
                <div className='flex items-center mt-4'>
                  <p className='mr-2 font-bold'>Poradnik</p>
                  <IoIosArrowDroprightCircle className='text-orange-600 duration-300 transform group-hover:translate-x-3' />
                </div>
              </div>
            </Link>
          </div>

          <div className='bg-gray-100 h-[150px] rounded group cursor-pointer shadow hover:shadow-md transition-smooth overflow-hidden'>
            <Link to='/sklep' className='flex justify-center items-center h-full'>
              <TbTruckDelivery
                src='/help-section/naped-moto.png'
                className='w-1/2 text-6xl'
              />
              <div className='w-1/2'>
                <p className='uppercase'>
                  Bezpieczna <span className='font-bold'>dostawa</span>
                </p>
                <div className='flex items-center mt-4'>
                  <p className='mr-2 font-bold'>Sprawdź szczegóły</p>
                  <IoIosArrowDroprightCircle className='text-orange-600 duration-300 transform group-hover:translate-x-3' />
                </div>
              </div>
            </Link>
          </div>

          <div className='bg-gray-100 h-[150px] rounded group cursor-pointer shadow hover:shadow-md transition-smooth overflow-hidden'>
            <Link to='/sklep' className='flex justify-center items-center h-full'>
              <img
                src='/help-section/gwarancja-5-pl.png'
                className='w-1/2 object-contain h-full py-3'
                alt='Naped Moto'
              />
              <div className='w-1/2'>
                <p className='uppercase'>
                  Reklamacje, <span className='font-bold'>gwarancja</span> i zwroty
                </p>
                <div className='flex items-center mt-4'>
                  <p className='mr-2 font-bold'>Dowiedz się więcej</p>
                  <IoIosArrowDroprightCircle className='text-orange-600 duration-300 transform group-hover:translate-x-3' />
                </div>
              </div>
            </Link>
          </div>

          <div className='bg-gray-100 h-[150px] rounded group cursor-pointer shadow hover:shadow-md transition-smooth overflow-hidden'>
            <Link to='/sklep' className='flex justify-center items-center h-full'>
              <img
                src='/logo/wisniowski3.jpg'
                className='w-1/2 px-10'
                alt='Naped Moto'
              />
              <div className='w-1/2'>
                <p className='uppercase'>
                  Partner firmy <span className='font-bold'>Wiśniowski</span>
                </p>
                <div className='flex items-center mt-4'>
                  <p className='mr-2 font-bold'>Poznaj naszą firmę</p>
                  <IoIosArrowDroprightCircle className='text-orange-600 duration-300 transform group-hover:translate-x-3' />
                </div>
              </div>
            </Link>
          </div>

        </div>
      </div>
    </div>
  )
}

export default HelpSection
