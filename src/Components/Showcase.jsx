import React from "react";
import sign from "../Assets/sign.jpg";
import test from "../Assets/test.jpg";
const Showcase = () => {
  return (
    <div>
      <section className="md:mt-24 pt-24 bg-black font-copperplate">
        <div className=" container mx-auto  flex md:p-24 md:flex-row flex-col items-center">
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center ">
            <h1
              className="title-font text-xl md:text-3xl mb-4 font-medium text-[#72eaf6] "
              data-aos="fade-right"
            >
              Cult Mechanicus
            </h1>
            <p className="mb-8 text-white leading-relaxed italic  text-md  md:text-xl">
              From the weakness of the mind, Omnissiah save us <br></br> From
              the lies of the Antipath, circuit perserve us <br></br> From the
              rage of the Beast, iron protect us <br></br> From the temptations
              of the Flesh, silica cleanse us From <br></br>
              the ravages of the Destroyer, anima shield us <br></br> From this
              rotting cage of biomatter, Machine God set us free.
            </p>
          </div>
          <div className="lg:max-w-2xl lg:w-full md:w-1/2 w-6/6">
            <img className="object-cover  " alt="hero" src={sign} />
          </div>
        </div>
      </section>

      <div
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5),
                       rgba(0, 0, 0, 0.5)), url(${test})`,
        }}
        className=""
      >
        <div className="pt-9 h-full w-full">
          <section className=" w-full h-full font-copperplate text-white">
            <div className=" container px-5 py-24 mx-auto flex flex-wrap">
              <h2
                className="sm:text-3xl text-2xl text-[#72eaf6] font-medium title-font mb-2 md:w-2/5"
                data-aos="fade-right"
              >
                ABOUT
              </h2>
              <div className="md:w-3/5 md:pl-6">
                <p
                  className="leading-relaxed text-md md:text-xl"
                  data-aos="fade-left"
                >
                  The Cult Mechanicus, also known in ancient times before the
                  Horus Heresy as the Cult Mechanicum, is the set of religious
                  beliefs that serves as the philosophical foundation of the
                  Adeptus Mechanicus and its predecessor, the ancient
                  Mechanicum. The religion of the Cult Mechanicus values
                  knowledge and the technology it creates above all else and
                  views the final embrace of technology in the form of a purely
                  mechanical existence as the ultimate destiny for Mankinds
                  evolution..
                </p>
              </div>
            </div>
          </section>
          <section className="text-white body-font font-copperplate">
            <div className="container px-5 py-24 mx-auto flex flex-wrap ">
              <h2
                className="sm:text-3xl text-2xl text-[#72eaf6] font-medium title-font mb-2 md:w-2/5"
                data-aos="fade-right"
              >
                Tech Priest
              </h2>
              <div className="md:w-3/5 md:pl-6">
                <p
                  className="leading-relaxed text-md md:text-xl"
                  data-aos="fade-left"
                >
                  Tech-priests are members of the Cult Mechanicus, the Cult of
                  the Machine, a priesthood which forms an ecclesiastical
                  hierarchy of technicians, scientists, and religious leaders
                  who believe that knowledge represents the only true divinity
                  in the universe.
                </p>
              </div>
            </div>
          </section>

          <section className="text-white body-font font-copperplate">
            <div className="container px-5 py-24 mx-auto flex flex-wrap">
              <h2
                className="sm:text-3xl text-2xl  font-medium title-font mb-2 md:w-2/5 text-[#72eaf6]"
                data-aos="fade-right"
              >
                Quest for Knowledge
              </h2>
              <div className="md:w-3/5 md:pl-6">
                <p
                  className="leading-relaxed text-md md:text-xl"
                  data-aos="fade-left"
                >
                  Generally, the Quest for Knowledge is pursued through
                  scientific and exploratory endeavours. The cult believes that
                  all knowledge already exists, and it is primarily a matter of
                  time before it can be gathered together to complete the Quest
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Showcase;
