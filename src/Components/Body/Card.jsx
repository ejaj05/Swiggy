import React from "react";
import { IoStarSharp } from "react-icons/io5"
import { Link } from "react-router-dom";
const Card = ({ restaurant ,cta}) => {
  return (
    <Link to={`/restaurantMenu/${cta?.link.split('/')[5]}`} className="min-w-[270px]  hover:scale-95 duration-300">
      <div className="h-[188px] w-full rounded-xl overflow-hidden relative">
        <img
          className="w-full h-full object-cover object-top"
          src={`https://media-assets.swiggy.com/swiggy/image/upload/${restaurant.cloudinaryImageId}`}
          alt=""
        />
        <div className="absolute w-full h-full bg-gradient-to-t from-1% to-transparent to-40% from-black bottom-0 p-2 text-2xl font-bold text-white flex items-end">
        {restaurant?.aggregatedDiscountInfoV3 ? (restaurant?.aggregatedDiscountInfoV3?.header +" " +restaurant?.aggregatedDiscountInfoV3?.subHeader):restaurant?.costForTwo}
        </div>
      </div>

      <div className="p-2 font-sans">
        <h1 className="font-bold text-lg">{restaurant.name}</h1>
        <h2 className="flex items-center gap-1 font-medium">
          <span className="text-white bg-emerald-600 inline-block rounded-full p-[1px] text-sm">
            <IoStarSharp/>
          </span>
          <span >{restaurant.avgRating}</span>
          <span>{restaurant.sla.slaString}</span>
        </h2>
        <h2 className="text-zinc-600 line-clamp-1">{restaurant.cuisines.join(',')}</h2>
        <h2 className="text-zinc-600 ">{restaurant.locality}</h2>
      </div>
    </Link>
  );
};

export default Card;
