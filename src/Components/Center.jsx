import React from "react";

const Center = () => {
  return (
    <div className="w-full  h-[300px] bg-black pt-16  mx-auto text-center">
      <div className="text-white m-auto  text-center">
        <h1
          className="font-copperplate font-bold sm:text-sm md:text-xl"
          data-aos="fade-right"
        >
          "There is no truth in flesh, only betrayal." <br /> "There is no
          strength in flesh, only weakness."
          <br /> "There is no constancy in flesh, only decay." <br />
          "There is no certainty in flesh but death." <br />— Credo Omnissiah
        </h1>
        <button className="bg-[#40E0D0] opacity-80  border-solid border-3 border-[#D4FFFD] rounded-lg mt-5 p-2 md:p-3 font-copperplate hover:bg-[#72eaf6]">
          Explore
        </button>
      </div>
    </div>
  );
};

export default Center;
