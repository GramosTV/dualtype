import React from "react";
import Blurout from "./Blurout";
import DownsideAppear from "./DownsideAppear";
import FeaturesAppear from "./FeaturesAppear";
import CleanAppear from "./CleanAppear";
const Features = () => {
  return (
    <div className="md:h-[30vh]  z-[10000000] flex flex-col justify-between w-[86vw]">
      <div className="flex w-full justify-between">
        <div className=" z-100">
       <DownsideAppear>We Make Keyboards With Character.</DownsideAppear>
 </div>
        <div className="skew-x-[-15deg] text-right opacity-60 text-[0.7vw] leading-none uppercase">
          improvment <br />
          2025 product
        </div>
      </div>
      <div className=" md:flex-row flex-col flex w-full justify-between ">
       <Blurout>
        <h2 className=" mt-[6vh] md:mt-0 tracking-tight text-[5vw] md:text-[1.5vw]  capitalize w-[80vw] md:w-[30vw]">
          <CleanAppear>our clients are our top priority</CleanAppear> <CleanAppear>we’re always here for you </CleanAppear> <CleanAppear>deliver the
          best expirience.</CleanAppear> {" "}
        </h2>
        </Blurout>
        <div className="flex gap-[1vw]">
          <FeaturesAppear>
        
          </FeaturesAppear>
        </div>
      </div>
    </div>
  );
};

export default Features;
