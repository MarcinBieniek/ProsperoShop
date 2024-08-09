const ProducerFilter = ({ activeProducer, setActiveProducer, availableProducers }) => {
  return (
    <div className='mt-10 mb-7 pb-2 border-b-[1px] border-gray-200'>
      <p className='font-bold mb-5'>Producent</p>
      <div className='mb-5'>
        <div className='flex items-center'>
          <input
            type="radio"
            id="wszyscy-producenci"
            className="form-radio h-4 w-4 text-orange-600"
            checked={activeProducer === 'Wszyscy producenci'}
            onChange={() => setActiveProducer('Wszyscy producenci')}
          />
          <label htmlFor="wszyscy-producenci" className="ml-2 text-gray-700">
            Wszyscy producenci
          </label>
        </div>
        {availableProducers.map((producer, index) => (
          <div key={index} className='flex items-center'>
            <input
              type="radio"
              id={`producer-${producer}`}
              className="form-radio h-4 w-4 text-orange-600"
              checked={activeProducer === producer}
              onChange={() => setActiveProducer(producer)}
            />
            <label htmlFor={`producer-${producer}`} className="ml-2 text-gray-700">
              {producer}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProducerFilter;
