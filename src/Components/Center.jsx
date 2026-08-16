import React from "react";
import { Link } from "react-router-dom";

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
        <div className="mt-5 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/codex/registration-tracking"
            className="bg-[#40E0D0] opacity-80 border-solid border-3 border-[#D4FFFD] rounded-lg p-2 md:p-3 font-copperplate hover:bg-[#72eaf6]"
          >
            Track Servitor Skull
          </Link>
          <Link
            to="/codex/registration-tracking?ref=field-reference"
            className="bg-transparent opacity-80 border-solid border-3 border-[#D4FFFD] rounded-lg p-2 md:p-3 font-copperplate text-[#D4FFFD] hover:bg-[#72eaf6] hover:text-black"
          >
            Register Servitor Skull
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Center;
