import React from 'react'

const SectionalDoorsPattern = ({ patterns, selectedPattern, onSelect }) => {
  return (
    <div className='mb-5'>
      <p>Wybierz przetłoczenie</p>
      <div className='grid grid-cols-4 gap-4 mt-4'>
        {patterns.map((pattern) => (
          <div
            key={pattern.id}
            className={`border p-2 rounded-md cursor-pointer ${selectedPattern === pattern.id ? 'border-gray-400' : 'border-gray-300'}`}
            onClick={() => onSelect(pattern.id)}
          >
            <img src={pattern.image} alt={pattern.name} className='w-full h-20 object-cover rounded' />
            <div className='flex items-center justify-center mt-2'>
              <input
                type='radio'
                name='pattern'
                checked={selectedPattern === pattern.id}
                onChange={() => onSelect(pattern.id)}
              />
              <span className='ml-2'>{pattern.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SectionalDoorsPattern
