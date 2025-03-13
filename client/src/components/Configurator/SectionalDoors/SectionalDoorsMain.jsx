import { useState } from "react";

import { FaSwatchbook } from "react-icons/fa";
import { IoMdBook } from "react-icons/io";

import { structures } from "../../../../public/configurator/garage-doors/generalData";
import SectionalDoorsStructures from "./SectionalDoorsStructures";

const SectionalDoorsMain = () => {

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
          Promo
          </div>
        </div>
      </div>
      <div className='flex'>
        <div className='w-1/2 p-5'>
          <p className='mb-5'>Konfigurator</p>
          <SectionalDoorsStructures
            structures={structures}
            selectedStructure={selectedStructure}
            onSelect={setSelectedStructure}
          />

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

export default SectionalDoorsMain
