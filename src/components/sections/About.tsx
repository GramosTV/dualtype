import React from 'react';
import { Appear } from '@/components/animations';
import Image from 'next/image';
const About = () => {
  return (
    <div className=" z-[-10000000000] mt-[10vh] relative overflow-hidden">
      <Appear delay={1}>
        <Image
          width={2222}
          className="absolute   top-[-5vh] z-[-111111111111111] opacity-[18%] blur-[7px] ml-[-3vw]"
          height={2222}
          alt="222"
          src={'/assets/images/hoes.png'}
        />
      </Appear>
      <div className="justify-between flex  w-[93vw]"></div>
      <div className="w-full flex items-center justify-center">
        <div className=" flex flex-col w-[90vw] gap-[6vh]  items-start">
          <Appear delay={0}>
            <h1 className="z-[-100]  gradient-text flex flex-col lowercase font justify-center items-center ">
              <div>
                custom keyboard is more than <br /> just a bunch of buttons it is something that is truly yours.
              </div>
            </h1>
          </Appear>
          <div className="w-full h-[1px] bg-slate-50  opacity-30"></div>
          <div className="flex text-[1vw] w-fit  justify-start gap-[20vw]">
            <div className="text-justified h-full ">Odkryj, nowe możliwości</div>
            <div className="  w-[17.5vw] ">
              <div>
                dualtype
                <br /> <br />
                Od 2022 roku tworze dla was klawiatury, które są nie tylko wyjątkowe, ale także trwałe.
                <br /> <br />
                nieustających jebań, niezrównanie ślepych ulic drżącego obłoku i błyskawicy umysłu skaczącej ku biegunom
                Kanady i Paterson.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
