import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Offers, RestaurantDetails, Top } from "../index.js";
import { FaMagnifyingGlass } from "react-icons/fa6";
import MenuCard from "./MenuCard.jsx";
import Button from "./Button.jsx";
import { useDispatch, useSelector } from "react-redux";
import { HiOutlineShoppingBag } from "react-icons/hi2"
import { checkRes, resetRes } from "../../utils/reducers/resSlice.jsx";
import { clearCart } from "../../utils/reducers/cartSlice.jsx";
import Shimmer from "../Shimmer/Shimmer.jsx";

const RestaurantMenu = () => {
  const [size, setSize] = useState(0)
  const [menuData, setMenuData] = useState([]);
  const [resInfo, setResInfo] = useState([]);
  const [topData, setTopData] = useState(null)
  const [move, setMove] = useState(0);
  const [discountData, setDiscountData] = useState([]);
  const { cord } = useSelector(state => state.cord)
  const { cartData } = useSelector(state => state.cart)
  const { id } = useParams();
  const navigate = useNavigate()
  const mainId = id.split("-").at(-1).slice(4);

  const { isSameRes } = useSelector(state => state.res)
  const dispatch = useDispatch()

  const handleMoveRight = () => {
    if (move > 0) {
      setMove(move - 1);
    }
  };
  const handleMoveLeft = () => {
    if (move < size) {
      setMove(move + 1);
    }
  };

  const resetCart = () => {
    dispatch(resetRes())
    dispatch(clearCart())
  }

  const getDetails = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${cord.lat}&lng=${cord.lng}&restaurantId=${mainId}&catalog_qa=undefined&query=Biryani&submitAction=ENTER`
    );
    const jsonData = await response.json();
    console.log(jsonData?.data.cards);
    setResInfo(jsonData?.data?.cards[2].card.card.info);
    setDiscountData(
      jsonData?.data?.cards[3].card.card.gridElements?.infoWithStyle?.offers
    );
    const actualTop = jsonData?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.filter((item, idx) => item.card.card.title == 'Top Picks') || []
    console.log(actualTop)
    setTopData(actualTop[0]?.card?.card);
    setSize(actualTop[0]?.card?.card?.carousel?.length - 2)
    const mainData = jsonData?.data.cards?.find((item, idx) => item?.groupedCard?.cardGroupMap?.REGULAR)?.groupedCard?.cardGroupMap.REGULAR.cards
    console.log(mainData)
    const actualMenu =
      mainData.filter(
        (item, idx) => item.card?.card?.itemCards || item.card?.card?.categories
      );
    setMenuData(actualMenu);
  };

  useEffect(() => {
    getDetails();
  }, []);

  return (
    <>
      {menuData.length > 0 ?(
        <div className="pt-24">
          <div className="w-full px-2 md:w-[800px] mx-auto">
            <div className="mt-8 text-[14px]">
              <Link to={"/"} className="text-slate-500 hover:text-slate-800">
                Home{" "}
              </Link>{" "}
              /
              <Link className="text-slate-500 hover:text-slate-800">
                {" "}
                {resInfo?.city}{" "}
              </Link>
              /<Link> {resInfo?.name}</Link>
            </div>
            <RestaurantDetails resInfo={resInfo} />
            <div className="mt-8 px-3 relative">
              <Offers discountData={discountData} />

              <div>
                <h1 className="text-center mt-8 mb-4 text-lg text-zinc-600">
                  MENU
                </h1>
                <div className="w-full flex items-center rounded-xl overflow-hidden bg-zinc-200">
                  <input
                    className="w-[95%] p-2 text-xl text-center outline-none bg-transparent"
                    type="text"
                    placeholder="search for dishes"
                  />
                  <FaMagnifyingGlass className="text-xl text-zinc-600" />
                </div>
              </div>

              {topData != null && (
                <>
                  <div className="overflow-hidden mt-8 hidden md:block">
                    <Top title={'Top Picks'} move={move} handleMoveLeft={handleMoveLeft} handleMoveRight={handleMoveRight} length={topData?.carousel?.length - 2} />
                    <div style={{ translate: `-${move * 39.5}%` }}
                      className="flex duration-300 gap-4 mt-5">
                      {topData?.carousel?.map((item, idx) => (
                        <div key={idx} className="shrink-0">
                          <div className="relative">
                            <img className="rounded-2xl" src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_292,h_300/${item?.dish?.info?.imageId}`} alt="" />
                          </div>

                          <div className="absolute top-0 flex flex-col justify-between h-full w-[292px] p-4 text-zinc-200 bg-gradient-to-t from-transparent to-black/50 rounded-2xl">
                            <div>
                              <img className="w-5" src="https://foodandfusion.in/assets/icons/non-veg-symbol.png" />
                              <p className="text-xl font-medium mt-4">{item?.title}</p>
                            </div>

                            <div className="flex justify-between">
                              <p className="text-lg">₹{item?.dish?.info?.defaultPrice / 100 || item?.dish?.info?.price / 100}</p>
                              <button className="inline-block  font-bold text-xl bg-white rounded-xl shadow-xl text-emerald-600 hover:bg-zinc-200 border border-zinc-300">
                                <Button item={item.dish.info} resInfo={resInfo} />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="overflow-hidden mt-8 block md:hidden">
                    <Top title={'Top Picks'} move={move} handleMoveLeft={handleMoveLeft} handleMoveRight={handleMoveRight} length={size} />
                    <div style={{ translate: `-${move * 78}%` }}
                      className="flex duration-300 gap-4 mt-5">
                      {topData?.carousel?.map((item, idx) => (
                        <div key={idx} className="shrink-0">
                          <div className="relative">
                            <img className="rounded-2xl" src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_292,h_300/${item?.dish?.info?.imageId}`} alt="" />
                          </div>

                          <div className="absolute top-0 flex flex-col justify-between h-full w-[292px] p-4 text-zinc-200 bg-gradient-to-t from-transparent to-black/50 rounded-2xl">
                            <div>
                              <img className="w-5" src="https://foodandfusion.in/assets/icons/non-veg-symbol.png" />
                              <p className="text-xl font-medium mt-4">{item?.title}</p>
                            </div>

                            <div className="flex justify-between">
                              <p className="text-lg">₹{item?.dish?.info?.defaultPrice / 100 || item?.dish?.info?.price / 100}</p>
                              <button className="inline-block  font-bold text-xl bg-white rounded-xl shadow-xl text-emerald-600 hover:bg-zinc-200 border border-zinc-300">
                                <Button item={item.dish.info} resInfo={resInfo} />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}



              <MenuCard data={menuData} resInfo={resInfo} />

              {!isSameRes && (
                <div className="fixed bottom-10 w-full md:w-[800px] z-50">
                  <div className="w-[380px] md:w-[500px] bg-white md:mx-auto p-2 md:p-8 shadow-xl shadow-black/30 ">
                    <h1 className="font-medium text-xl mb-2">Items already in cart</h1>
                    <p className="text-sm text-zinc-600">Your cart contains items from other restaurant. Would you like to reset your cart for adding items from this restaurant?</p>
                    <div className="flex mt-6 font-semibold gap-6">
                      <button onClick={() => dispatch(checkRes(true))} className="px-10 md:px-20 py-4 border-2 border-[#60B246] text-[#60B246]">NO</button>
                      <button onClick={() => resetCart()} className="px-10 py-4 border-2 bg-[#60B246] text-white">YES START AFRESH</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {cartData.length > 0 && (
              <div className="fixed bottom-0 py-3 px-4 bg-[#60B246] w-[380px] md:w-[800px] text-white flex justify-between">
                <h1 className="font-bold text-sm">{cartData.length} items added</h1>
                <div onClick={() => navigate('/cart')} className="flex items-center gap-2 cursor-pointer">
                  <h1 className="font-bold">VIEW CART</h1>
                  <HiOutlineShoppingBag />
                </div>
              </div>
            )}
          </div>
        </div>
      ):<Shimmer/>}
    </>
  );
};

export default RestaurantMenu;
