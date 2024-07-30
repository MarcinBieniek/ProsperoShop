import React from 'react'

const HelpSection = () => {

  return (
    <div className='container pb-5'>
      <div className='grid grid-cols-3 gap-4'>
        <div className='bg-orange-600 h-[150px] rounded flex flex-col justify-center items-center'>
          <p>Dobierz akcesoria i inne produkty</p>
          <p>Zapraszamy do sklepu online</p>
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
  )
}

export default HelpSection
