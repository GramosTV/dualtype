import React from "react";
import Theline from "../../public/svg/Theline";

interface FeatureProps {
  description: string;
  children: React.ReactNode;
}
const Feature: React.FC<FeatureProps> = ({ description, children }) => {
  return (
    <div className="w-[90vw] h-full md:w-[18vw] ">
    <div id="feature"   className="flex   justify-between">
<div className="md:scale-100 sacle-[130%]"><Theline></Theline></div>
    <div  className="flex  flex-col gap-[3vh] md:gap-[2vh]">
      {" "}
    
        <h2 className="md:text-[1.5vw] text-[6vw]">{children}</h2>
        <p className="w-[80vw] md:text-[0.6vw] text-[2.5vw]  md:w-[15vw]">{description}</p>
     
    </div></div></div>
  );
};

export default Feature;
