import React from 'react';
import Image from 'next/image';
import { Textbg } from '@/components/ui';
const Footer = () => {
  return (
    <div id="footer" className="w-full relative flex items-center  justify-center  h-[100vh] ">
      <Image
        alt="xx"
        width={1000}
        className=" rotate-[-10deg]  absolute top-[10vh] scale-110 left-[5%] s "
        style={{ filter: 'invert(1%)' }}
        height={1000}
        src="/assets/images/signature.png"
      ></Image>
      <Image
        alt="xx"
        width={1000}
        className=" rotate-[-25deg]  scale-[180%]"
        style={{ filter: 'invert(1%)' }}
        height={1000}
        src="/assets/images/hoes.png"
      ></Image>
      <div className="w-full absolute flex  z-[-10] items-center blur-[250px] opacity-80 bg justify-center  h-[100vh] ">
        {' '}
        <Image
          alt="xx"
          width={1000}
          className=" rotate-[-25deg] bl scale-[190%]"
          style={{ filter: 'invert(100%)' }}
          height={1000}
          src="/assets/images/hoes.png"
        ></Image>
      </div>
      <div className="w-full h-full absolute mb-[30vh]">
        <Textbg></Textbg>
      </div>
    </div>
  );
};

export default Footer;
