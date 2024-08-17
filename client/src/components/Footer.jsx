import { Link } from 'react-router-dom';
import { MdKeyboardArrowRight } from "react-icons/md";
import { RiCustomerService2Line } from "react-icons/ri";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <div className=' text-gray-800 mt-10'>

      <div className='bg-gray-100 py-10'>
        <div className='container flex justify-between'>

          <div className='w-2/5'>
            <h1 className='text-3xl font-bold py-5'>logo.</h1>
            <div className='flex items-center py-3'>
              <RiCustomerService2Line className='text-5xl text-orange-600 mr-5' />
              <div>
                <p>Masz pytanie? Zadzwoń do nas!</p>
                <p className='text-xl'>+48 694 943 167</p>
              </div>
            </div>
            <div className='py-3'>
              <p className='font-bold'>Dane adresowe</p>
              <p>Ul. Dąbrowskiego 4, 43-180 Orzesze, Polska</p>
            </div>
            <div className='flex py-3 pb-7'>
              <FaFacebook className='text-2xl text-black mr-5 hover:text-orange-600 transition-smooth cursor-pointer' />
              <FaInstagram className='text-2xl text-black hover:text-orange-600 transition-smooth cursor-pointer' />
            </div>
          </div>

          <div className='w-3/5'>
            <div className='flex justify-between p-5'>
              <div className='w-1/3'>
                <h1 className='font-bold text-lg mb-5'>Menu</h1>
                <Link
                  to='/'
                  className='flex items-center pb-2'
                >
                  <MdKeyboardArrowRight />
                  <p className="whitespace-nowrap hover:text-orange-600 transition-all duration-300 transform hover:translate-x-1">Wycena bramy</p>
                </Link>
                <Link
                  to='/'
                  className='flex items-center pb-2'
                >
                  <MdKeyboardArrowRight />
                  <p className="whitespace-nowrap hover:text-orange-600 transition-all duration-300 transform hover:translate-x-1">Automatyka do bram</p>
                </Link>
                <Link
                  to='/'
                  className='flex items-center pb-2'
                >
                  <MdKeyboardArrowRight />
                  <p className="whitespace-nowrap hover:text-orange-600 transition-all duration-300 transform hover:translate-x-1">Akcesoria do bram</p>
                </Link>
                <Link
                  to='/'
                  className='flex items-center pb-2'
                >
                  <MdKeyboardArrowRight />
                  <p className="whitespace-nowrap hover:text-orange-600 transition-all duration-300 transform hover:translate-x-1">Ogrodzenia</p>
                </Link>
                <Link
                  to='/'
                  className='flex items-center pb-2'
                >
                  <MdKeyboardArrowRight />
                  <p className="whitespace-nowrap hover:text-orange-600 transition-all duration-300 transform hover:translate-x-1">Wyprzedaz</p>
                </Link>
              </div>
              <div className='w-1/3'>
                <h1 className='font-bold text-lg mb-5'>Informacje</h1>
                <Link
                  to='/'
                  className='flex items-center pb-2'
                >
                  <MdKeyboardArrowRight />
                  <p className="whitespace-nowrap hover:text-orange-600 transition-all duration-300 transform hover:translate-x-1">Dane kontaktowe</p>
                </Link>
                <Link
                  to='/'
                  className='flex items-center pb-2'
                >
                  <MdKeyboardArrowRight />
                  <p className="whitespace-nowrap hover:text-orange-600 transition-all duration-300 transform hover:translate-x-1">Producent Wiśniowski</p>
                </Link>
                <Link
                  to='/'
                  className='flex items-center pb-2'
                >
                  <MdKeyboardArrowRight />
                  <p className="whitespace-nowrap hover:text-orange-600 transition-all duration-300 transform hover:translate-x-1">Polityka prwyatności</p>
                </Link>
                <Link
                  to='/'
                  className='flex items-center pb-2'
                >
                  <MdKeyboardArrowRight />
                  <p className="whitespace-nowrap hover:text-orange-600 transition-all duration-300 transform hover:translate-x-1">Regulamin sklepu</p>
                </Link>
                <Link
                  to='/'
                  className='flex items-center pb-2'
                >
                  <MdKeyboardArrowRight />
                  <p className="whitespace-nowrap hover:text-orange-600 transition-all duration-300 transform hover:translate-x-1">Transport</p>
                </Link>
              </div>
              <div className='w-1/3'>
                <h1 className='font-bold text-lg mb-5'>Profil klienta</h1>
                <Link
                  to='/'
                  className='flex items-center pb-2'
                >
                  <MdKeyboardArrowRight />
                  <p className="whitespace-nowrap hover:text-orange-600 transition-all duration-300 transform hover:translate-x-1">Załóż konto</p>
                </Link>
                <Link
                  to='/'
                  className='flex items-center pb-2'
                >
                  <MdKeyboardArrowRight />
                  <p className="whitespace-nowrap hover:text-orange-600 transition-all duration-300 transform hover:translate-x-1">Zaloguj się</p>
                </Link>
                <Link
                  to='/'
                  className='flex items-center pb-2'
                >
                  <MdKeyboardArrowRight />
                  <p className="whitespace-nowrap hover:text-orange-600 transition-all duration-300 transform hover:translate-x-1">Moje zamówienia</p>
                </Link>
                <Link
                  to='/'
                  className='flex items-center pb-2'
                >
                  <MdKeyboardArrowRight />
                  <p className="whitespace-nowrap hover:text-orange-600 transition-all duration-300 transform hover:translate-x-1">Koszyk</p>
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className='bg-gray-200'>

        <div className='container py-6 flex justify-between'>
          <div>
            <p className='pb-1 flex'>@2024 Prospero Bramy / Wszystkie prawa zastrzeżone.</p>
            <div className='flex'>
              <p className='mr-1'>Shop created by</p>
              <Link to='https://www.latedevelopers.co.uk' className='hover:text-orange-600 transition-smooth'>Late Developers</Link>.
            </div>
          </div>

          <div>
            Płatności
          </div>

        </div>
      </div>

    </div>
  )
}

export default Footer
