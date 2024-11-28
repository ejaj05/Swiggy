import React from "react";
import { IoStarSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

const RestaurantDetails = ({resInfo}) => {
  return (
    <div className="mt-8">
      <h1 className="text-3xl font-bold pl-3">{resInfo?.name}</h1>

      <div className="w-full border-zinc-400  rounded-[30px] bg-gradient-to-t from-zinc-300 p-5 mt-5">
        <div className="w-full h-full p-4 rounded-[16px] border-2 border-zinc-300 bg-white">
          <h1 className="flex items-center gap-2 font-bold text-lg">
            <span className="text-white bg-emerald-600 inline-block rounded-full p-[0.5px] text-sm">
              <IoStarSharp />
            </span>
            <span>
              {" "}
              {resInfo?.avgRating} ({resInfo?.totalRatings}+ ratings) .{" "}
            </span>
            <span>{resInfo?.costForTwoMessage}</span>
          </h1>
          <Link className="text-orange-500 underline font-semibold">
            {resInfo?.cuisines?.join(", ")}
          </Link>

          <div className="flex gap-2 items-center pt-2">
            <div className="w-[9px] flex flex-col items-center">
              <div className="w-[7px] h-[7px] bg-zinc-400 rounded-full"></div>
              <div className="w-[1px] h-[30px] bg-zinc-400"></div>
              <div className="w-[7px] h-[7px] bg-zinc-400 rounded-full"></div>
            </div>
            <div className="flex flex-col gap-3 font-bold text-[15px] ">
              <p className="">
                Outlet
                <span className="font-medium text-zinc-500 ml-2">
                  {resInfo?.locality}
                </span>{" "}
              </p>
              <p className="">{resInfo?.sla?.slaString}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetails;
