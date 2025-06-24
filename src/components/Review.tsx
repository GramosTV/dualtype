import React from 'react';
import { FaStar } from 'react-icons/fa';

interface ReviewProps {
  authorName: string;
  title: string;
  date: string;
  content: string;
  rating: number;
}

const Review: React.FC<ReviewProps> = ({ authorName, title, date, content, rating }) => {
  return (
    <div className="w-[28vw] mx-[1vw] flex items-start">
      <div className="h-[100%] w-[5vw] flex-col flex items-center mx-[.5vw] opacity-45 justify-center">
        <svg width="31" height="300" viewBox="0 0 31 339" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1.75092 0L1.53125 309.47L30.0707 338.009" stroke="white" strokeWidth="1.5" />
        </svg>
      </div>
      <div>
        <div className="font-bold tracking-tighter  mb-[1vh] uppercase ">{authorName}</div>
        <div className="font-bold text-[1.5vw] tracking-tighter mb-[1vh] leading-[110%] uppercase">{title}</div>
        <div className="my-[2vh] opacity-45">
          <div className="desc text-[0.9vw] leading-[100%]">{date}</div>
        </div>
        <div className="desc text-[0.9vw] leading-[100%] opacity-40 ">{content}</div>
        <div className="desc text-[0.9vw] leading-[100%] flex items-center my-[1vh]">
          <FaStar />
          &nbsp; {rating.toFixed(1)}
        </div>
      </div>
    </div>
  );
};

export default Review;
