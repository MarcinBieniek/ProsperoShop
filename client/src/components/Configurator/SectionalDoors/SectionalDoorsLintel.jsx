const SectionalDoorsLintel = ({ lintels, selectedLintel, onSelect }) => {
  return (
    <div className='mb-5'>
      <p>Wybierz wysokość nadproża</p>
      <div className='grid grid-cols-4 gap-4 mt-4'>
        {lintels.map((lintel) => (
          <div
            key={lintel.id}
            className={`border p-2 rounded-md cursor-pointer ${selectedLintel === lintel.id ? 'border-gray-400' : 'border-gray-300'}`}
            onClick={() => onSelect(lintel.id)}
          >
            <img src={lintel.image} alt={lintel.name} className='w-full h-20 object-cover rounded' />
            <div className='flex items-center justify-center mt-2'>
              <input
                type='radio'
                name='lintel'
                checked={selectedLintel === lintel.id}
                onChange={() => onSelect(lintel.id)}
              />
              <span className='ml-2'>{lintel.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SectionalDoorsLintel
