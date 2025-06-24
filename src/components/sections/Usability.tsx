import React from 'react'
import Image from 'next/image'
interface props {
  children: React.ReactNode
  desc: string
src:string
}
const Usability:React.FC<props> = ({children, desc, src}) => {
  return (
    <div className='text-white  w-[35vh] ' > 
    <div className='flex text-[20px] items-center justify-between'>
    <div className='font-b tracking-tighter uppecase '>{children}</div> <div className='text-[12px] opacity-40'>A03</div></div>

    <div className=' bg-white h-[1.5px]' ></div>
    
    <div className='text-desc text-[15px] w-[20vw] mt-[2vh] opacity-40 leading-[110%]'>
    {desc}</div>
    <Image src={src} alt="xx" width={100} height={100}></Image>
    
    </div>
  )
}

export default Usability