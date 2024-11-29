import React, {  useState } from 'react'
import { IoMdStar } from "react-icons/io";

import Button from './Button';
const ItemDetails = ({item,resInfo}) => {
    const [toggle, setToggle] = useState(false);
    const veg = "https://foodandfusion.in/assets/icons/veg-symbol.png";
    const nonVeg = "https://foodandfusion.in/assets/icons/non-veg-symbol.png";
    return (
        <>
            <div className="flex justify-between mt-[24px]">
                <div className="w-[70%]">
                    <img
                        className="w-5"
                        src={`${item.card.info.itemAttribute.vegClassifier === "VEG"
                            ? veg
                            : nonVeg
                            }`}
                        alt=""
                    />
                    <h2 className="font-bold text-xl text-zinc-600">
                        {item.card.info.name}
                    </h2>
                    <h2 className="font-medium text-lg">
                        ₹{item.card.info.price / 100 || item.card.info.defaultPrice / 100}
                    </h2>
                    <span className="flex items-center font-semibold text-emerald-700 my-1">
                        <IoMdStar className="" />
                        {item?.card?.info?.ratings?.aggregatedRating?.rating && <>
                            <span className="ml-1">
                                {item?.card?.info?.ratings?.aggregatedRating?.rating}
                            </span>
                            <span className="text-zinc-500">({item?.card?.info?.ratings?.aggregatedRating?.ratingCountV2})</span>
                        </>
                        }
                        
                    </span>
                    <div>
                        <p className="">{toggle ? item.card.info.description : item.card.info.description?.slice(0, 130)} </p>
                        {item.card.info.description?.length > 130 && <span onClick={() => setToggle(!toggle)} className="font-bold text-zinc-600 cursor-pointer">{toggle ? "less" : " ...more"}</span>}
                    </div>
                </div>

                <div className="w-[25%] h-40 relative">
                    <img
                        className="w-full h-full object-cover  rounded-2xl"
                        src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,c_fit/${item.card.info.imageId}`}
                        alt=""
                    />
                    <button className="absolute bottom-[-18px] left-10 font-bold text-xl bg-white rounded-xl shadow-xl text-emerald-600 hover:bg-zinc-200 border border-zinc-300">
                        <Button item={item.card.info} resInfo={resInfo}/>
                    </button>
                </div>
            </div>
            <hr className="border border-zinc-300 my-8" />
        </>
    )
}

export default ItemDetails