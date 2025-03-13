import React, { useState } from 'react';
import ConfiguratorSectionalDoors from './ConfiguratorSectionalDoors';

const Configurator = () => {
  const [selected, setSelected] = useState('garazowe');

  return (
    <div
      className='bg-cover bg-center h-[900px]'
      style={{ backgroundImage: `url('/konfigurator-tlo2.jpg')` }}
    >
      <div className='container py-10 h-[850px]'>

        <div className='flex'>
          <button
            onClick={() => setSelected('garazowe')}
            className={`px-4 py-2 rounded rounded-bl-none rounded-br-none ${
              selected === 'garazowe' ? 'bg-white text-black' : 'bg-orange-600 text-white'
            }`}
          >
            Bramy garażowe
          </button>
          <button
            onClick={() => setSelected('segmentowe')}
            className={`px-4 py-2 rounded rounded-br-none rounded-bl-none ${
              selected === 'segmentowe' ? 'bg-white text-black' : 'bg-orange-600 text-white'
            }`}
          >
            Bramy przemysłowe
          </button>
        </div>

        <div className='w-full h-full rounded rounded-tl-none text-gray-800 bg-white'>
          {selected === 'garazowe' ? (
            <ConfiguratorSectionalDoors />
          ) : (
            <p>Konfigurator wyceny bram przemysłowych - to do</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Configurator;
