import { useState } from "react";

import { FaSwatchbook } from "react-icons/fa";
import { IoMdBook } from "react-icons/io";

import { structures, lintels, patterns } from "../../../../public/configurator/garage-doors/generalData";
import SectionalDoorsStructures from "./SectionalDoorsStructures";
import SectionalDoorsLintel from "./SectionalDoorsLintel";
import SectionalDoorsPattern from "./SectionalDoorsPattern";

const SectionalDoorsMain = () => {

  const [selectedStructure, setSelectedStructure] = useState('woodgrain');
  const [selectedLintel, setSelectedLintel] = useState('standard');
  const [selectedPattern, setSelectedPattern] = useState('standard');

  // Znalezienie danych wybranego przetłoczenia
  const selectedPatternData = patterns.find(pattern => pattern.id === selectedPattern);

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

          <SectionalDoorsLintel
            lintels={lintels}
            selectedLintel={selectedLintel}
            onSelect={setSelectedLintel}
          />

          <SectionalDoorsPattern
            patterns={patterns}
            selectedPattern={selectedPattern}
            onSelect={setSelectedPattern}
          />

        </div>
        <div className='w-1/2 p-5 bg-green-500 sticky top-0 h-fit'>
          <p className='pb-5 sticky'>Twój wybór</p>
          <div>
            {selectedPatternData && (
              <div className="mb-4 flex justify-center">
                <img
                  src={selectedPatternData.image}
                  alt={selectedPatternData.name}
                  className="w-[80%] h-full object-cover rounded-md border border-gray-300"
                />
              </div>
            )}
            <p className='mt-4'>Struktura: {structures.find(s => s.id === selectedStructure)?.name}</p>
            <p className='mt-4'>Nadproże: {lintels.find(s => s.id === selectedLintel)?.name}</p>
            <p className='mt-4'>Przetłoczenie: {patterns.find(pattern => pattern.id === selectedPattern)?.name}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SectionalDoorsMain
