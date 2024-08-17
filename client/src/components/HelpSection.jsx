import { IoIosArrowDroprightCircle } from "react-icons/io";
import { Link } from 'react-router-dom';

const HelpSection = () => {

  return (
    <div className='  py-10'>
      <div className='container'>
        <div className='grid grid-cols-3 gap-4'>
          <div className=' bg-gray-100 h-[150px] rounded group cursor-pointer box-shadow'>
            <Link to='/sklep' className='flex justify-center items-center '>
              <img src='/uniwersalny-montaz.png' className='w-1/2 object-fit'/>
              <div className='w-1/2'>
                <p className='uppercase'>Dobierz <span className='font-bold'>akcesoria</span> i inne <span className='font-bold'>produkty</span></p>
                <div className='flex items-center mt-4'>
                  <p className='mr-2 font-bold'>Sklep online</p>
                  <IoIosArrowDroprightCircle className='text-orange-600 duration-300 transform group-hover:translate-x-3' />
                </div>
              </div>
            </Link>
          </div>

          <div className='bg-orange-600 h-[150px] rounded flex flex-col justify-center items-center'>
            <p>Potrzebujesz pomocy przy wycenie?</p>
            <p>Skontaktuj się z nami</p>
          </div>
          <div className='bg-orange-600 h-[150px] rounded flex flex-col justify-center items-center'>
            <p>Jak prawidłowo zmierzyć bramę?</p>
            <p>Poradnik</p>
          </div>
          <div className='bg-orange-600 h-[150px] rounded flex flex-col justify-center items-center'>
            <p>Bezpieczna dostawa</p>
            <p>Sprawdź szczegóły</p>
          </div>
          <div className='bg-orange-600 h-[150px] rounded flex flex-col justify-center items-center'>
            <p>Reklamacje i zwroty</p>
          </div>
          <div className='bg-orange-600 h-[150px] rounded flex flex-col justify-center items-center'>
            <p>Partner firmy Wiśniowski</p>
            <p>Poznaj naszą firmę</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HelpSection
