import React from "react";

interface SpecificationProps {
  title: string;
  data: string;
  add?: string;
}
const Specification: React.FC<SpecificationProps> = ({ title, data,add }) => {
  return (
    
    <div className=" w-full">

      <div
        id="specification"
        className="w-full h-fit pl-[5vw] my-[0.5vh] flex justify-start text-[0.9vw]"
      >
        <div className="uppercase font-bold tracking-tight w-[37%] 0 ">
          {title} <span className="opacity-40">{add}</span>
        </div>
        <div className="tracking-tight w-[25%]  flex   opacity-45">
          {data}
        </div>
      </div>
      <div className="w-full bg-white h-[0.5px] opacity-30"></div>
    </div>
  );
};

export default Specification;
