import React from 'react';
import Image from 'next/image';
import { Text } from '@/components/ui';
const Borderbtn = () => {
  return (
    <div
      id="thebtn"
      className="relative flex items-center z-[1000]  md:scale-100 scale-[75%] justify-center w-[353px] my-[2vh] "
    >
      <div className="flex  w-full    px-[25px] justify-between">
        <div id="textbtn" className="uppercase text-[14px] md:text-sm  text-white z-[10000] ">
          <Text width={true}>why would i need this </Text>
        </div>
        <Image alt="arrow" width={16} height={16} src="/assets/icons/anarrow.svg" className="z-[100000000] "></Image>
      </div>
      <svg
        width="360"
        height="63"
        viewBox="0 0 477 83"
        fill="#ffffff50"
        className="absolute  z-[100] opacity-100 clipborderbtn "
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M476.5 16.5808V79.7927C476.5 81.1734 475.381 82.2927 474 82.2927H24.177C23.6414 82.2927 23.1201 82.1208 22.6896 81.8022L1.51267 66.1275C0.875711 65.656 0.5 64.9105 0.5 64.1181V3.79272C0.5 2.41201 1.61929 1.29272 3 1.29272H457.216C457.764 1.29272 458.296 1.47241 458.732 1.80418L475.515 14.5923C476.136 15.0651 476.5 15.8006 476.5 16.5808Z"
          stroke="#00000000"
        />
      </svg>
      <svg
        width="360"
        height="63"
        viewBox="0 0 477 83"
        fill="#0000000d"
        className="absolute   backdrop-blur-[6px]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M476.5 16.5808V79.7927C476.5 81.1734 475.381 82.2927 474 82.2927H24.177C23.6414 82.2927 23.1201 82.1208 22.6896 81.8022L1.51267 66.1275C0.875711 65.656 0.5 64.9105 0.5 64.1181V3.79272C0.5 2.41201 1.61929 1.29272 3 1.29272H457.216C457.764 1.29272 458.296 1.47241 458.732 1.80418L475.515 14.5923C476.136 15.0651 476.5 15.8006 476.5 16.5808Z"
          stroke="#ffffff7c"
        />
      </svg>
    </div>
  );
};

export default Borderbtn;
