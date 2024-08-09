import React from 'react';
import ReactSlider from 'react-slider';

const PriceFilter = ({ minPrice, maxPrice, priceRange, setPriceRange, applyFilters }) => {

  return (
    <div>
      <p className='font-bold mb-5 text-gray-700'>Przedział cenowy</p>

      <ReactSlider
        className="relatie w-full h-[6px] mt-[10px] cursor-pointer"
        thumbClassName="custom-thumb"
        trackClassName="custom-track"
        min={minPrice}
        max={maxPrice}
        value={priceRange}
        onChange={(value) => setPriceRange(value)}
        renderThumb={(props, state) => (
          <div {...props} className="bg-orange-600 absolute top-[-7px] text-white p-1 rounded-full h-5 w-5" />
        )}
        ariaLabel={['Minimum price', 'Maximum price']}
        ariaValuetext={state => `Price: ${state.valueNow}`}
      />

      <div className='flex justify-between mt-4 text-sm text-gray-600'>
        <span>Od {priceRange[0]} zł</span>
        <span>Do {priceRange[1]} zł</span>
      </div>

    </div>
  );
};

export default PriceFilter;
