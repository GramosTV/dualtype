import React from 'react';
import { Theline, Text } from '@/components/ui';
import Image from 'next/image';
import { TbWorld } from 'react-icons/tb';

const Navbar = () => {
  const array = ['products', 'about', 'contact', 'subscribe'];
  return (
    <div className="w-full fixed flex justify-between z-[10099] items-center h-[6vh] overflow-hidden border-b-[1px] bg-[#0000000d] backdrop-blur-[100px]  border-[#ffffff66]">
      <div className="flex  justify-between items-center h-full  gap-4 px-10">
        <div className="tracking-wide text-[20px] leading-[100%]">ec.splits</div>

        <div className="uppercase text-desc opacity-50 hidden md:block ">Rewriting Writing</div>
        <div className="opacity-50  hidden md:block">
          {' '}
          <TbWorld color="#ffffff" />
        </div>
        <div className="uppercase text-desc opacity-50 hidden md:block">Since 2025</div>
      </div>
      <div className="flex w-[52vw] justify-between">
        <div className="hidden  items-center h-full md:flex  w-[30vw] justify-between px-10">
          <Theline></Theline>
          {array.map((item) => (
            <div className="uppercase text-sm hover:opacity-100 opacity-50" key={item}>
              <Text>{item}</Text>
            </div>
          ))}
        </div>
        <div className="flex">
          <div className="  w-[9.5vw] items-center md:flex hidden justify-between">
            <Theline></Theline>

            <div className=" text-center w-full  text-sm">CONNECT</div>
          </div>
          <div className="clipbtn w-[30vw] md:w-[9.5vw] flex justify-center cursor-pointer  items-center text-sm text-black h-[7.3vh] group">
            <div className=" translate-y-[00%] text-[14px] md:text-sm group-hover:translate-y-[-300%] group-hover:blur-md  absolute transition-all duration-200 ease-in">
              {' '}
              ORDER FOR $50
            </div>
            <div className="w-full h-full absolute bg-[#ffffff00] translate-y-[-100%] group-hover:translate-y-[0%] transition-all duration-200 delay-200 ease-out backdrop-invert-[100%]"></div>
            <div className=" translate-x-[-300%] gap-[0.3vw] w-[30vw] md:w-[9.5vw]  text-[14px] md:text-sm flex-row-reverse blur-md group-hover:blur-0 flex group-hover:translate-x-[0%] z-[-10] text-black  absolute transition-all duration-200  ease-in">
              {' '}
              ENTER
              <Image src={'/assets/icons/longarrow.svg'} alt="xx" width={19.5} height={19.5}></Image>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
