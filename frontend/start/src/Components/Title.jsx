import React from "react";

const Title = ({ text }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <h1
        className="
          relative
          text-[#002f6c] 
          font-bold 
          text-2xl
          md:text-3xl
          tracking-[0.02em] 
          uppercase 
          select-none
          mb-2
          after:content-[''] 
          after:block 
          after:w-[90px] 
          after:h-[4px] 
          after:bg-[#0077b6] 
          after:mt-[14px] 
          after:mx-auto 
          after:rounded-md
        "
      >
        {text}
      </h1>
    </div>
  );
};

export default Title;
