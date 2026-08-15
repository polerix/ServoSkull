import React from "react";
import belisarius from "../Assets/BelisariusCawl.jpg";
import fake from "../Assets/wallpaper3.jpg";
import crawl from "../Assets/crawl.jpg";

const Archmagos = () => {
  return (
    <div className="w-full h-[600px] relative font-copperplate bg-black">
      <img
        className="object-cover object-center  h-full md:min-h-screen w-full z-0"
        src={crawl}
        data-aos="fade-left"
        alt="/"
      ></img>
      <div className="md:max-h-[500px] absolute top-60 mt-10  text-white ">
        <p
          className="text-center  sm:text-xl md:text-3xl  font-bold"
          data-aos="fade-up"
        >
          Belisarius Cawl is a ten-thousand-standard-years-old Archmagos Dominus
          of the Adeptus Mechanicus, one of the ruling lords of the Priesthood
          of Mars
        </p>
      </div>
    </div>
  );
};

export default Archmagos;
