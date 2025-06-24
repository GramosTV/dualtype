import React from "react";
import Recbtn from "../../public/svg/Recbtn";
import Image from "next/image";
import { ReactNode } from "react";
interface BtnProps {
    children: ReactNode;
    src: string;
   

}

const Btn: React.FC<BtnProps> = ({ children, src, }) => {
    return (
        <div className="flex items-center w-[325px]    justify-center">
            <div className="relative flex items-center w-full justify-center">
                <Recbtn />
                <div className="absolute text-black w-full flex justify-center items-center">
                    <div className="w-[80%] mt-[5px] flex items-center justify-between">
                        <div className="text-sm uppercase">{children}</div>
                        <Image src={src} width={18} height={18} alt={"btn"} className="invert" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Btn;
