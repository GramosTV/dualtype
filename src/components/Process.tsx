import React from "react";
import StaggerBlurOut from "./StaggerBlurOut";
import Usability from "./Usability";
import Blocks from "./blocks";
import Image from "next/image";

import CleanAppear from "./CleanAppear";
const Process = () => {
  return (
    <div className=" h-[90vh] w-full  flex-col flex items-  justify-center">
      <Blocks></Blocks>

      <div className="flex flex-col items-center ">
        <div className="mb-[2vh] font-bold">(THREE PHILARS)</div>
        <h1 className="text-center flex  flex-col items-center  mb-[6vh] font-bold leading-none">
         
          <br />
         
          <CleanAppear > FROM ORDER TO</CleanAppear>
            {" "}
            <CleanAppear>
            <div className="flex">
              THE FINAL{" "}
              <span className="h-[80px] overflow-hidden"> 
                <Image
                className="mt-[-2vh]" 
                  alt="xx"
                  width={150}
                  height={150}
                  src="/ezgif.com-animated-gif-maker.gif"
                ></Image>
              </span>{" "}
              PRODUCT
            </div>
            </CleanAppear>
          <CleanAppear> FOR YOU </CleanAppear>
        </h1>
      </div>
      <div className=" w-full flex items-start px-[3vw] justify-between mb-[4vh]">
        <StaggerBlurOut className="flex  gap-[3vw]   w-full items-center justify-center    b h-fit s">
          <Usability
            desc="
Korzystamy z plików cookie własnych oraz stron trzecich, aby zrozumieć działanie "
            src="/ezgif.com-animated-gif-maker.gif"
          >
            Upgrade
          </Usability>
          <Usability
            desc="internetowego i móc je udoskonalać, dostosowywać treści do indywidualnych zainteresowań odbiorców"
            src="/ezgif.com-animated-gif-maker.gif"
          >
            That Sound
          </Usability>

          <Usability
            desc="Pamiętaj, że brak wyrażenia zgody na wykorzystanie plików cookie może wpłynąć"
            src="/ezgif.com-animated-gif-maker.gif"
          >
            Just Look
          </Usability>
        </StaggerBlurOut>
      </div>
    </div>
  );
};

export default Process;
