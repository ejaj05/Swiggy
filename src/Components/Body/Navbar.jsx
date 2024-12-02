import React, { useContext, useState } from "react";
import { Top } from "../index";
import { UserContext } from "../../context/Context";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { data } = useContext(UserContext)
  const header = data[0]?.card?.card?.header?.title
  const mainData = data.find((item) => item?.card?.card?.id === 'whats_on_your_mind')
  const item = mainData?.card?.card?.imageGridCards?.info
  const [move, setMove] = useState(0);
  const link = data[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
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
  if(!item) {
    return 
  }
  return (
    <>
      <div className="w-[100%]  mt-5 overflow-hidden hidden md:block">
      <Top title={header} move={move} handleMoveLeft={handleMoveLeft} handleMoveRight={handleMoveRight} length={4} />
      <div
        style={{ translate: `-${move * 34}%` }}
        className={`flex duration-300`}
      >
        {item?.map((item, idx) => (
          <Link key={idx} className="min-w-32" to={`/restaurantMenu/${link[idx]?.cta?.link.split('/')[5]}`}>
            <img
              key={idx}
              className={``}
              src={`https://media-assets.swiggy.com/swiggy/image/upload/${item.imageId}`}
              alt=""
            />
          </Link>
        ))}
      </div>
      <hr className="border mt-6" />
      </div>
      <div className="w-[100%]  mt-5 overflow-hidden block md:hidden">
      <Top title={header} move={move} handleMoveLeft={handleMoveLeft} handleMoveRight={handleMoveRight} length={4} />
      <div
        style={{ translate: `-${move * 100}%` }}
        className={`flex duration-300`}
      >
        {item?.map((item, idx) => (
          <Link key={idx} className="min-w-32" to={`/restaurantMenu/${link[idx]?.cta?.link.split('/')[5]}`}>
            <img
              key={idx}
              className={``}
              src={`https://media-assets.swiggy.com/swiggy/image/upload/${item.imageId}`}
              alt=""
            />
          </Link>
        ))}
      </div>
      <hr className="border mt-6" />
      </div>
    </>
  );
};

export default Navbar;
