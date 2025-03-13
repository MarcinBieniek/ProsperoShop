const SectionalDoorsStructures = ({ structures, selectedStructure, onSelect }) => {

  return (
    <div className='mb-5'>
      <p>Wybierz strukturę</p>
      <div className='grid grid-cols-4 gap-4 mt-4'>
        {structures.map((structure) => (
          <div
            key={structure.id}
            className={`border p-2 rounded-md cursor-pointer ${selectedStructure === structure.id ? 'border-gray-400' : 'border-gray-300'}`}
            onClick={() => onSelect(structure.id)}
          >
            <img src={structure.image} alt={structure.name} className='w-full h-20 object-cover rounded' />
            <div className='flex items-center justify-center mt-2'>
              <input
                type='radio'
                name='structure'
                checked={selectedStructure === structure.id}
                onChange={() => onSelect(structure.id)}
              />
              <span className='ml-2'>{structure.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionalDoorsStructures;
