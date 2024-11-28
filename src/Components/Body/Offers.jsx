import React, { useState } from "react";
import {Top} from "../index.js";

const Offers = ({discountData}) => {
  const [move, setMove] = useState(0);

  const handleMoveRight = () => {
    if (move > 0) {
      setMove(move - 1);
    }
  };
  const handleMoveLeft = () => {
    if (move < 4) {
      setMove(move + 1);
    }
  };

  return (
    <div>
      <Top
        title={"Deals for you"}
        move={move}
        handleMoveLeft={handleMoveLeft}
        handleMoveRight={handleMoveRight}
        length={4}
      />

      <div className="overflow-hidden mt-4">
        <div
          style={{ translate: `-${move * 59}%` }}
          className="flex gap-8 duration-300 ease-in-out"
        >
          {discountData.map((item, idx) => (
            <div
              key={idx}
              className="flex gap-3 w-[430px] p-[18px] border border-zinc-400 rounded-2xl shrink-0"
            >
              <img
                className="w-[50px] h-[50px]"
                src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/${item?.info?.offerLogo}`}
                alt=""
              />
              <div>
                <h1 className="text-xl font-bold">{item?.info?.header}</h1>
                <h1 className="text-zinc-500 text-lg">
                  {item?.info?.couponCode || item?.info?.description}
                </h1>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Offers;
