import React from "react";
import wallPaper from "../Assets/wallpaper2.jpg";

const Adeptus = () => {
  return (
    <div className="w-full h-[600px] pt-32 font-copperplate  justify-center  bg-black relative">
      <div className=" max-h-[250px]  mt-8 text-center w-full text-[#76F2FE] mx-auto absolute">
        <h1
          className="sm:text-xl text-2xl md:text-3xl mb-3"
          data-aos="fade-right"
        >
          Adeptus Mechanicus
        </h1>
        <p className="border-2 border-[#76F2FE] text-sm md:text-lg md:p-2">
          The Adeptus Mechanicus is the official Imperial name within the
          Adeptus Terra for the Cult Mechanicus or Cult of the Machine based on
          Mars which provides the Imperium with its scientists, engineers and
          technicians. The tech-adepts of the Mechanicus are the primary keepers
          of what is viewed as sacred wisdom, a privileged caste of Tech-priests
          who jealously guard the knowledge.As part of this faith, the Adeptus
          Mechanicus believes knowledge is the true manifestation of divinity in
          the universe, and all creatures and artefacts that embody knowledge
          are holy because of it.
        </p>
      </div>
    </div>
  );
};

export default Adeptus;
