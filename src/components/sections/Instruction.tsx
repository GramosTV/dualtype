import React from 'react';
import { StaggerBlurOut } from '@/components/animations';
import Specification from './Specification';
const Instruction = () => {
  return (
    <div className="w-[100%] flex flex-col justify-between  border-[0.5px] border-[#ffffff30] bg h-fit">
      <div id="elements-instruction" className="">
        <StaggerBlurOut className=" flex flex-col items-center justify-center w-full  ">
          {' '}
          <Specification title="DEVICE WEIGHT" data="ABOUT 250(g)" />
          <Specification title="ACTIVATION WEIGHT" data="60(g)" />
          <Specification title="PLASTIC TYPE" data="MATERIAL" />
          <Specification title="KEYBOARD TYPE" data="INTERNATIONAL" />
          <Specification title="WIRELESS" data="NO" />
          <Specification title="INNER WIRE" add="(lenght)" data="OPTIONAL" />
          <Specification title="WARRANTY" data="2 YEARS" />
          <Specification title="more details" add="(contact)" data="ECSPLITS@SUPPORT.PL" />
          <Specification title="WIRELESS" data="NO" />
          <Specification title="INNER WIRE" add="(lenght)" data="OPTIONAL" />
          <Specification title="WARRANTY" data="2 YEARS" />
          <Specification title="more details" add="(contact)" data="ECSPLITS@SUPPORT.PL" />
        </StaggerBlurOut>
      </div>
      <div className="flex gap-[5%] my-[3.5vh] ml-[5vw]  l leading-[120%] tracking-tight opacity-45 text-[0.7vw]">
        <div className="desc w-[28%]">
          According to the documents, the teenagers – drafted in from schools and technical colleges in and around the
          central southern city of Hengyang – are classified as “interns”, and their teachers
        </div>
        <div className="desc w-[35%]">
          According to the documents, the teenagers – drafted in from schools and technical colleges in and around the
          central southern city of Hengyang – are classified as “interns”, and their teachers are paid by the factory to
          accompany them.
        </div>
      </div>{' '}
    </div>
  );
};

export default Instruction;
