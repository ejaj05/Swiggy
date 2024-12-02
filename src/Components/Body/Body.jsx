import React, { useContext } from "react";
import { Restaurant, Navbar, OnlineFood } from "../index";
import { UserContext } from "../../context/Context";
import Shimmer from "../Shimmer/Shimmer";

const Body = () => {
  const { isServiceable } = useContext(UserContext)
  const { data } = useContext(UserContext)

  if (!isServiceable) {
    return (
      <div className="w-full h-[80vh] pt-24">
        <div className="w-[380px] m-auto my-5 flex flex-col items-center">
          <img className="w-[238px] my-[50px]" src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_476,h_476/portal/m/location_unserviceable.png" alt="" />
          <h1 className="font-bold text-xl">Location Unserviceable</h1>
          <p className="text-center text-zinc-500 text-[16px] font-medium leading-none mt-3">We don’t have any services here till now. Try changing location.</p>
        </div>
      </div>
    )
  }

  return (
    <>
      {data.length > 0 ?
        < div className="w-full pt-24">
          <div className="w-[95%] md:w-[75%] m-auto">
            <Navbar />
            <Restaurant />
            <OnlineFood />
          </div>
      </div >
      : <Shimmer />}
    </>
  );
};

export default Body;
