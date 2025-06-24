import React from "react";
interface TagProps {
  children?: React.ReactNode;
  color?: string;
  board?: string
  keycaps?: string
}
const Tag: React.FC<TagProps> = ({ children, keycaps, color, board }) => {
  const clipPathValue = "polygon(0 0, 95% 0, 100% 15%, 100% 100%, 100% 100%, 10% 100%, 0 80%, 0 0)";
  
  return (
    <div className="relative rounded-sm  overflow-visible">
      <div 
        className="relative "
      >

        <div
          style={{
            clipPath: clipPathValue,
          }}
          className={`${color} w-fit h-fit rounded-md  z-[100] text-[11.5px] tracking-tight`}
        >
          <div className="py-3 leading-[100%] flex items-center gap-[0.4vw] px-3 opacity-80 text-white">
     

            {board && (
              <div
                className="w-4 h-2 bg-gray-800"
                style={{
                  clipPath: clipPathValue, backgroundColor:board
                }}
              ></div>
            )}
             {keycaps && (
              <div
                className="w-4 h-2 bg-gray-800"
                style={{
                  clipPath: clipPathValue, backgroundColor:keycaps
                }}
              ></div>
            )}
          {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tag;
