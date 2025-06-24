import React from 'react';

import Image from 'next/image';
interface ProcesPartProps {
  stepNumber: string;
  title: string;
  description: string;
  timeEstimate: string;
}

const ProcesPart: React.FC<ProcesPartProps> = ({
  title = "LET'S HAVE A TALK",
  description = 'nternetowego i móc je udoskonalać, dostosowywać treści do indywidualnych zainteresowań odbiorców',
  timeEstimate = '~(1-2 DAYS)',
}) => {
  return (
    <div>
      <div className="w-[99.9vw]    px-[3vw]   h-fit border-[0.5px] items-center flex justify-between border-[#ffffff30]">
        <Image alt="xx" width={200} height={200} src="/assets/images/ezgif.com-animated-gif-maker.gif"></Image>
        <div className="font-bold w-[10vw] my-[5vh]">{title}</div>
        <div className="fo tracking-tight text-[20px] leading-[110%] w-[20vw]">
          think teachers would be really interested in this site as it allows students to watch videos and comment on
          them.
        </div>
        <div className="w-[13vw] my-[1vh] text-desc opacity-40">{description}</div>
        <div>{timeEstimate}</div>
      </div>
    </div>
  );
};

export default ProcesPart;
