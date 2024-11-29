import React, { useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { RiArrowDropUpLine } from "react-icons/ri";
import ItemDetails from "./ItemDetails";

const CardDetails = ({ data,resInfo }) => {
  const [isOpen, setIsOpen] = useState(true);

  if (data.itemCards) {
    const { title, itemCards } = data;
    return (
      <div className="p-3 bg-white">

        <div
          onClick={() => setIsOpen(!isOpen)}
          className="flex justify-between items-center"
        >
          <h1 className="font-black text-xl">
            {title} ({itemCards.length})
          </h1>
          <span className="text-4xl text-zinc-600">
            {isOpen ? <RiArrowDropDownLine /> : <RiArrowDropUpLine />}
          </span>
        </div>

        {isOpen &&
          itemCards.map((item, idx) => (
            <ItemDetails key={idx} item={item} index={idx} resInfo={resInfo}/>
          ))}
      </div>
    );
  } else {
    const { title, categories } = data;
    return (
      <div className="bg-white">
        <h1 className="font-bold text-xl mt-3 ml-3">{title}</h1>
        {categories.map((item, idx) => (
          <div key={idx}>
            <CardDetails data={item} />
            {idx !== categories.length - 1 && (
              <hr className=" my-2 border border-zinc-200" />
            )}
          </div>
        ))}
      </div>
    );
  }
};

export default CardDetails;
