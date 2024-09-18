import React from 'react'
import { Link } from 'react-router-dom'

const Blokada = () => {
  return (
    <div className='container'>
      <div className='mt-10 h-[200px] flex items-center justify-center'>
        <div className='flex-col text-center'>
          <p className='mb-5'>Nie masz uprawnień, by odwiedzać tę stronę.</p>
          <Link to='/' className='cursor-pointer text-orange-600 hover:text-gray-800 transition-smooth'>Wróć na stronę główną</Link>
        </div>
      </div>
    </div>
  )
}

export default Blokada
