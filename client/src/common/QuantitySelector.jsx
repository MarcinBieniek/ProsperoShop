import React from "react";
import { HiPlusSm, HiMinusSm } from "react-icons/hi";

const QuantitySelector = ({ quantity, setQuantity, maxQuantity = 10 }) => {
  const handleIncrease = () => {
    if (quantity < maxQuantity) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="border-[1px] rounded-full flex justify-between items-center px-4 py-2 mt-4 w-[50%]">
      <HiMinusSm
        className={`bg-gray-200 cursor-pointer rounded-full text-xl ${
          quantity === 1 ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={handleDecrease}
      />
      <p>{quantity}</p>
      <HiPlusSm
        className={`bg-gray-200 cursor-pointer rounded-full text-xl ${
          quantity === maxQuantity ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={handleIncrease}
      />
    </div>
  );
};

export default QuantitySelector;
