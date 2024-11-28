import React from "react";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";

const Top = ({title,move,handleMoveLeft,handleMoveRight,length}) => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-2xl">{title}</h1>
        <h2 className="flex gap-2">
          <span
            onClick={handleMoveRight}
            className={`p-2 rounded-full ${
              move == 0
                ? "bg-gray-200 text-gray-400"
                : "bg-gray-300 hover:bg-zinc-400"
            } text-xl `}
          >
            <IoIosArrowRoundBack />
          </span>
          <span
            onClick={handleMoveLeft}
            className={`p-2 rounded-full ${
              move == length
                ? "bg-gray-200 text-gray-400"
                : "bg-gray-300 hover:bg-zinc-400"
            } text-xl `}
          >
            <IoIosArrowRoundForward />
          </span>
        </h2>
      </div>
    </div>
  );
};

export default Top;
