import React from "react";
import {CardDetails} from '../index'
const MenuCard = ({ data }) => {
  return (
    <div className="mt-10 bg-zinc-200 flex flex-col gap-4 pt-4">
      {data?.map((item,idx)=>(
        <CardDetails key={idx} data={item?.card?.card}/>
      ))}
    </div>
  );
};

export default MenuCard;
