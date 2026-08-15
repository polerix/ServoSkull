import React, { useState } from "react";
import warhammer from "../Assets/warhammer.png";
import warhammerVideo from "../Assets/file.mp4";
import { GiDreadSkull } from "react-icons/gi";
import { Link } from "react-scroll";
import { AiOutlineClose } from "react-icons/ai";
import mecha from "../Assets/son.png";

const Navbar = () => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };
  return (
    <div className=" mx-auto w-full h-[800px]  md:pb-4 relative overflow-hidden">
      <video
        className="object-cover h-full w-full absolute -z-10 overflow-hidden"
        typeof="video/mp4"
        autoPlay
        loop
        muted
        src={warhammerVideo}
      ></video>
      <div className=" h-full md:w-full grid grid-cols-3 m-auto justify-items-center absolute md:fixed z-10 overflow-hidden">
        <ul className="hidden px-3 sm:flex text-[#D4FFFD]  mt-2 md:text-xl font-bold font-copperplate h-[100px]">
          <li className="mx-3 mt-2 hover:text-[#72eaf6] hover:border-t-2 border-[#72EAF6]">
            <Link to="home" smooth={true} duration={500}>
              Home
            </Link>
          </li>
          <li className="md:mx-3 mt-2 hover:text-[#72eaf6] hover:border-t-2 border-[#72EAF6] cursor-pointer">
            <Link to="Adeptus" smooth={true} duration={500}>
              Adeptus Mechanicus
            </Link>
          </li>
        </ul>
        <img className="md:mx-auto" src={warhammer}></img>
        <ul className="hidden sm:flex text-[#D4FFFD] mt-2 text-sm md:text-xl font-bold font-copperplate   h-[100px]">
          <li className="mx-5 mt-2 hover:text-[#72eaf6] hover:border-t-2 border-[#72EAF6]">
            <Link to="Archmagos" smooth={true} duration={500}>
              Archmagos Belisarius Cawl
            </Link>
          </li>
          <li className="md:mx-5 mt-2 hover:text-[#72eaf6] hover:border-t-2 border-[#72EAF6]">
            <Link to="CultMechanicus" smooth={true} duration={500}>
              Cult Mechanicus
            </Link>
          </li>
        </ul>

        <div onClick={handleNav} className="block md:hidden top-0 right-0 ">
          {!nav ? (
            <img
              src={mecha}
              className="h-30 top-0 right-0  w-24  absolute  sm:hidden md:hidden outline-none cursor-pointer "
            ></img>
          ) : (
            <AiOutlineClose size={30} className="text-white"></AiOutlineClose>
          )}
        </div>
        <div
          className={
            nav
              ? "fixed w-[300px] bg-black-500 h-screen text-white top-20 left-0  duration-300 z-10 flex flex-col"
              : "absolute left-[-100%]"
          }
        >
          <ul className="md:hidden flex flex-col gap-10 text-[#D4FFFD] font-bold font-copperplate text-lg transition-transform">
            <li className="md:mx-3 mt-2 hover:text-[#72eaf6] hover:border-t-2 border-[#72EAF6]">
              <Link to="home" smooth={true} duration={500}>
                Home
              </Link>
            </li>
            <li className="md:mx-3 mt-2 hover:text-[#72eaf6] hover:border-t-2 border-[#72EAF6]">
              <Link to="Adeptus" smooth={true} duration={500}>
                Adeptus Mechanicus
              </Link>
            </li>
            <li className="md:mx-5 mt-2 hover:text-[#72eaf6] hover:border-t-2 border-[#72EAF6]">
              <Link to="Archmagos" smooth={true} duration={500}>
                Archmagos Belisarius Cawl
              </Link>
            </li>
            <li className="md:mx-5 mt-2 hover:text-[#72eaf6] hover:border-t-2 border-[#72EAF6]">
              <Link to="CultMechanicus" smooth={true} duration={500}>
                Cult Mechanicus
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
