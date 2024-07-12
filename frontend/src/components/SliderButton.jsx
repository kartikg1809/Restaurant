import React, { useState } from 'react';

const SliderButton = ({ type, handleFilterChange }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    handleFilterChange(type, !isChecked);
  };

  return (
    <label className="flex cursor-pointer select-none items-center p-2">
      <div className="relative">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
          className="sr-only"
        />
        <div
          className={`h-5 w-14 rounded-full  ${
            isChecked ? (type === 'veg' ? 'bg-green-600' : 'bg-red-600') : 'bg-[#E5E7EB]'
          } shadow-inner`}
        ></div>
        <div
          className={`dot flex absolute left-0 -top-1 h-7 w-7 rounded-md ${type === 'veg' ? 'border-2 border-green-600' : 'border-2 border-red-600'} bg-white transition-transform ${
            isChecked ? 'translate-x-full' : ''
          }`}
        >
          <div className={`h-4 w-4 m-auto rounded-full ${type === 'veg' ? 'bg-green-600' : 'bg-red-600'}`}></div>
        </div>
      </div>
    </label>
  );
};

export default SliderButton;
