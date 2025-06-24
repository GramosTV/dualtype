import React from "react";

const TextPresentation = () => {
  return (
    <div className="flex flex-col gap-[3vh] z-[-10] scale-90 relative h-fit">
      <div className="flex h-fit gap-[3vw] text-[49px] leading-[105%] tracking-tighter">
        <div className="h-full justify-between items-end flex flex-col">
          <div>I&apos;m</div>
          <div className="opacity-0"> {""}x</div>
          <div>&</div>
        </div>

        <div>
          <div className=" skew-x-[-12deg]">a manufacture</div>
          <div>with +6 yrs of expirience</div>
          <div className="">huge <span className=" skew-x-[-12deg]"> passion</span></div>
        </div>
      </div>
      <div className="flex">
        <div className="flex h-fit font-normal gap-[3vw] text-[16px] leading-[105%] tracking-tighter">
          <div className="h-full justify-between items-end flex flex-col">
            <div>loading</div>
            <div className="text-[49px] opacity-0">I&apos;m</div>
            <div>Available</div>
          </div>

          <div>
            <div>Longer subalter for Qualtiy</div>
            <div>Poland / Warsaw</div>
            <div>2024Q5</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextPresentation;