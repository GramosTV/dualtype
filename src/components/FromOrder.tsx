import React from "react";
import ProcesPart from "./ProcesPart";
import CleanAppear from "./CleanAppear";
import StaggerBlurOut from "./StaggerBlurOut";

const FromOrder = () => {
  return (
    <div className="w-full bg h-screen flex flex-col items-center justify-center  text-white">
      <div className="flex items-end font-bold w-full mb-[10vh] px-[3vw] justify-between">
        <div id="title " className="font-bold">
        <CleanAppear><h1>FROM ORDER TO</h1></CleanAppear>  
        <CleanAppear>    <h1>FINAL PRODUCT</h1></CleanAppear>  
        </div>
        <div>(THREE PHASES)</div>
        <div>Await Time</div>
      </div>

      <div >
        <StaggerBlurOut delay={0.1}  className="w-full " stagger={.2}>
        <ProcesPart
          stepNumber="01"
          title="LETS HAVE A TALK"
          description="A91"
          timeEstimate="1 or 2 days"
        />
        <ProcesPart
          stepNumber="02"
          title="ADJUST IT TO YOU"
          description="dasldjsakldj"
          timeEstimate="1 or 2 days"
        />
        <ProcesPart
          stepNumber="03"
          title="BUILDING PROCESS"
          description="dasldjsakldj"
          timeEstimate="1 or 2 days"
        />
        <ProcesPart
          stepNumber="04"
          title="GET YOU SPLIT"
          description="dasldjsakldj"
          timeEstimate="1 or 2 days"
        /></StaggerBlurOut>
      </div>
    </div>
  );
};

export default FromOrder;
