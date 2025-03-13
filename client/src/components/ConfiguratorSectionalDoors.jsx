import { useState } from "react";

import { FaSwatchbook } from "react-icons/fa";
import { IoMdBook } from "react-icons/io";

import { structures } from "../../public/configurator/garage-doors/generalData";

const ConfiguratorSectionalDoors = () => {

  const [selectedStructure, setSelectedStructure] = useState('woodgrain');

  return (
    <div>
      <div className='p-5'>
        <div className='flex'>
          <div className='w-2/3'>
            <div className='flex items-center mb-2'>
              <FaSwatchbook className='mr-4 text-2xl' />
              <div>
                <p className=''>W tym segmencie wycenisz i zamówisz bramę segmentową o standardowych wymiarach.</p>
                <p>Jeśli szukasz bramy o niestandardowych parametrach, przejdź do zakładki "Wycena specjalna".</p>
              </div>
            </div>
            <div className='flex items-center '>
              <IoMdBook className='mr-4 text-2xl' />
              <div>
                <p className=''>Zachęcamy do zapoznania się z naszym poradnikiem dotyczącym wykonania wyceny.</p>
                <p>Znajdziesz w nim odpowiedzi na najczęściej zadawane pytania.</p>
              </div>
            </div>
          </div>
          <div className='w-1/3 bg-yellow-500'>

          </div>
        </div>
      </div>
      <div className='flex'>
        <div className='w-1/2 p-5'>
          <p className='mb-5'>Konfigurator</p>
          <div>
          <p>Wybierz strukturę</p>
            <div className='grid grid-cols-4 gap-4 mt-4'>
              {structures.map((structure) => (
                <div
                  key={structure.id}
                  className={`border p-2 rounded-md cursor-pointer ${selectedStructure === structure.id ? 'border-blue-500' : 'border-gray-300'}`}
                  onClick={() => setSelectedStructure(structure.id)}
                >
                  <img src={structure.image} alt={structure.name} className='w-full h-20 object-cover rounded' />
                  <div className='flex items-center justify-center mt-2'>
                    <input
                      type='radio'
                      name='structure'
                      checked={selectedStructure === structure.id}
                      onChange={() => setSelectedStructure(structure.id)}
                    />
                    <span className='ml-2'>{structure.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className='w-1/2 p-5 bg-green-500'>
        <p>Twój wybór</p>
          {selectedStructure ? (
            <p className='mt-4'>Struktura: {structures.find(s => s.id === selectedStructure)?.name}</p>
          ) : (
            <p className='mt-4'>Nie wybrano struktury</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default ConfiguratorSectionalDoors
