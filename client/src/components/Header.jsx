import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';

import { BsTelephone } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { HiOutlineWrenchScrewdriver } from "react-icons/hi2";
import { PiGarage } from "react-icons/pi";
import { LuPackage } from "react-icons/lu";
import { TiDeleteOutline } from "react-icons/ti";

const Header = () => {

  const { currentUser } = useSelector(state => state.user)

  const [isCart, setIsCart] = useState(false);
  const [isCartHovered, setIsCartHovered] = useState(false);

  return (

    <>

    <header className='bg-neutral-900 flex text-white h-20'>
      <div className='flex basis-3/4 h-full items-center justify-between'>
        <Link to='/'>
          <p className='ml-20'>Logo</p>
        </Link>
        <div className='flex mx-20 gap-4'>
          <a href='tel:+48694943167' className='flex items-center text-stone-500 hover:text-white transition-colors duration-300 ease-in-out gap-1'>
            <BsTelephone />
            <p>(+48) 694 943 167</p>
          </a>
          <a href='mailto:kontakt@bramyonline.pl' className='flex items-center text-stone-500 hover:text-white transition-colors duration-300 ease-in-out gap-1'>
            <AiOutlineMail />
            <p >kontakt@bramyonline.pl</p>
          </a>
        </div>
      </div>

      <div className='flex basis-1/4 bg-orange-600 h-full items-center'>

        <div className='ml-20'>
          <Link to='/profil'>
            {currentUser ? (
              <img
                src={currentUser?.avatar}
                alt='Profile image'
                className='rounded-full h-7 w-7 object-cover'
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className=' bg-neutral-900 flex items-center gap-2 py-2 px-3 hover:bg-white hover:text-neutral-900 transition-colors transition-text duration-300 ease-in-out rounded'>
                <FaRegUser className='text-xs' />
                <p className='uppercase text-xs'>Zaloguj</p>
              </div>
            )}
          </Link>
        </div>

        <div
          className='basket ml-10 mr-20 w-36 flex items-center gap-2 py-2 px-3 relative'


          onMouseEnter={() => setIsCartHovered(true)}
          onMouseLeave={() => setIsCartHovered(false)}
          /*
          do poprawnego wyświetlania:
          - zmienić opacity na 0 w description
          - zmienić state na false
          */


        >
          <div className='flex items-center justify-center relative'>
            <IoCartOutline className='text-lg' />
            <div className='absolute left-2 bottom-3'>
              <p className='bg-neutral-900 rounded-full h-5 w-5 flex items-center justify-center text-sm'>4</p>
            </div>
          </div>
          <p className='uppercase text-xs'>Twój koszyk</p>
          {isCartHovered ? (
          <>
            <div className='description absolute top-8 right-12 w-0 h-0 border-l-[20px] border-l-transparent border-b-[25px] border-b-white border-r-[20px] border-r-transparent opacity-0 transition-opacity duration-300'></div>
            <div className='description bg-white absolute top-[57px] right-5 w-80 text-neutral-900 opacity-1 transition-opacity duration-300 p-3 rounded'>
              <div className='font-bold text-white flex justify-center mx-auto bg-orange-600 p-2 rounded'>
                <p>Koszyk</p>
              </div>
              <div className='flex-col justify-center'>

                {isCart ? (
                  <div>
                    <div>
                      <p className='py-10 flex justify-center items-center'>Koszyk jest pusty</p>
                      <div className='flex justify-center gap-4 pb-5'>
                        <Link to='/'>
                          <div className='flex-col justify-center items-center hover:text-orange-600 transition-text duration-300'>
                            <p>Wyceń bramę</p>
                            <PiGarage className='mx-auto mt-2 text-xl'/>
                          </div>
                        </Link>
                        <Link to='/'>
                          <div className='flex-col justify-center items-center hover:text-orange-600 transition-text duration-300'>
                            <p>Zamów akcesoria</p>
                            <HiOutlineWrenchScrewdriver className='mx-auto mt-2 text-xl' />
                          </div>
                        </Link>
                      </div>
                    </div>
                    <div className='flex justify-center border-t border-orange-600 pt-3'>
                      <Link to='/kontakt' className='hover:text-orange-600 transition-text duration-300'>
                        <p>Masz pytanie?</p>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div>

                    <Link to='/'>
                      <div className='flex py-2 gap-2 hover:bg-gray-100 rounded my-2'>
                        <img
                          src="/produkt.jpg"
                          alt='Product image'
                          className='w-24 object-cover'
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <p className='font-bold text-sm mb-1'>Brama przesuwna Modern</p>
                          <p className='text-xs mb-1'>Wymiar: 350X145, kolor: RAL7016, automatyka: AWso2018</p>
                          <div className='flex text-sm justify-between items-center'>
                            <TiDeleteOutline className='text-red-600'/>
                            <p>Ilość: 1</p>
                            <p>Cena: 6500 zł</p>
                          </div>
                        </div>
                      </div>
                    </Link>

                    <Link to='/'>
                      <div className='flex py-2 gap-2 hover:bg-gray-100 rounded my-2'>
                        <img
                          src="/produkt.jpg"
                          alt='Product image'
                          className='w-24 object-cover'
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <p className='font-bold text-sm mb-1'>Brama przesuwna Modern</p>
                          <p className='text-xs mb-1'>Wymiar: 350X145, kolor: RAL7016, automatyka: AWso2018</p>
                          <div className='flex text-sm justify-between items-center'>
                            <TiDeleteOutline className='text-red-600'/>
                            <p>Ilość: 1</p>
                            <p>Cena: 6500 zł</p>
                          </div>
                        </div>
                      </div>
                    </Link>

                    <div className='flex flex-col items-end border-t border-orange-600 py-3'>
                      <p className='text-orange-600 font-bold pb-1'>Suma: 6500 zł brutto</p>
                      <p className='text-green-700 font-bold'>Transport gratis!</p>
                    </div>

                    <div className='flex justify-center border-t border-orange-600 pt-3'>
                      <Link to='/kontakt' className='bg-neutral-900 py-2 px-3 text-white hover:bg-orange-600 transition-text duration-200 flex items-center gap-1 rounded'>
                        <LuPackage />
                        <p className='text-xs uppercase'>Zamów</p>
                      </Link>
                    </div>
                  </div>
                )}

              </div>
            </div>
            </>
            ) : (
            <div></div>
          )}
        </div>

      </div>

    </header>

    <div className='bg-slate-200 shadow-md'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <Link to='/'>
          <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
            <span className='text-slate-500'>Prospero</span>
            <span className='text-slate-700'>Store</span>
          </h1>
        </Link>
        <form className='bg-slate-100 p-3 sounded-lg flex items-center'>
          <input
            type='text'
            placeholder='Search...'
            className='bg-transparent focus:outline-none w-24 sm:w-64'
          />
          <FaSearch className='text-slate-600' />
        </form>
        <ul className='flex gap-4'>
          <Link to='/'>
            <li className='hidden sm:inline text-slate-700 hover:underline'>Home</li>
          </Link>
          <Link to='/profil'>
            {currentUser ? (
              <img
                src={currentUser?.avatar}
                alt='Profile image'
                className='rounded-full h-7 w-7 object-cover'
                referrerPolicy="no-referrer"
              />
            ) : (
              <li className='text-slate-700 hover:underline'>Sign In</li>
            )}
          </Link>
        </ul>
      </div>
    </div>

    </>
  )
}

export default Header