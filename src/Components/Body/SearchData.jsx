import React, { useEffect, useState } from 'react'
import { IoStarSharp } from "react-icons/io5";
import SearchDataDetails from './SearchDataDetails';
import { LuDot } from "react-icons/lu";
import { useDispatch, useSelector } from 'react-redux';
import { checkRes, resetRes } from '../../utils/reducers/resSlice';
import { clearCart } from '../../utils/reducers/cartSlice';
import { HiOutlineShoppingBag } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';
import Shimmer from '../Shimmer/Shimmer';

const SearchData = ({ query }) => {
    const [dishes, setDishes] = useState([])
    const [resData, setResData] = useState([])
    const [activeBtn, setActiveBtn] = useState('Dishes')
    const { cord } = useSelector(state => state.cord)

    const { isSameRes } = useSelector(state => state.res)
    const { cartData } = useSelector(state => state.cart)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const btns = ["Restaurants", "Dishes"]

    const veg = "https://foodandfusion.in/assets/icons/veg-symbol.png";
    const nonVeg = "https://foodandfusion.in/assets/icons/non-veg-symbol.png";

    const getDishesData = async () => {
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}/restaurants/search/v3?lat=${cord.lat}&lng=${cord.lng}&str=${query}&trackingId=4836a39e-ca12-654d-dc3b-2af9d645f8d7&submitAction=ENTER&queryUniqueId=7abdce29-5ac6-7673-9156-3022b0e032f0`)
        const { data } = await res.json()
        setDishes(data?.cards[1]?.groupedCard?.cardGroupMap?.DISH?.cards)
    }

    const getResData = async () => {
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}/restaurants/search/v3?lat=${cord.lat}&lng=${cord.lng}&str=${query}&trackingId=4836a39e-ca12-654d-dc3b-2af9d645f8d7&submitAction=ENTER&queryUniqueId=7abdce29-5ac6-7673-9156-3022b0e032f0&selectedPLTab=RESTAURANT`)
        const { data } = await res.json()
        setResData(data?.cards[0]?.groupedCard?.cardGroupMap?.RESTAURANT?.cards)
    }

    const handleBtnClick = (btn) => {
        setActiveBtn(btn)
    }

    const resetCart = () => {
        dispatch(resetRes())
        dispatch(clearCart())
    }

    useEffect(() => {
        getDishesData()
        getResData()
    }, [query])
    return (
        <>
            {resData.length > 0 || dishes.length > 0 ? (
                <>
                    <div className='flex gap-2 mt-8 mb-2'>
                        {btns.map((btn, idx) => (
                            <button onClick={() => handleBtnClick(btn)} key={idx} className={`px-4 py-2 border border-zinc-400 rounded-full text-sm font-semibold  flex items-center ${activeBtn == btn && "bg-[#3E4152] text-white"}`}>
                                {btn}
                            </button>
                        ))}
                    </div>
                    <div className='h-full bg-[#F5F6F8] grid grid-cols-1 md:grid-cols-2 gap-4 px-4 py-6'>

                        {activeBtn == 'Dishes' ? dishes.map((item, idx) => (
                            idx != 0 && (
                                <SearchDataDetails key={idx} item={item} />
                            )
                        )) : resData.map((item, idx) => (
                            idx != 0 && (
                                <div key={idx} className='bg-white p-6 flex items-center gap-4 rounded-3xl'>
                                    <img className='w-24 rounded-xl' src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_264,h_288,c_fill/${item.card.card.info.cloudinaryImageId}`} alt="" />
                                    <div className='flex flex-col gap-[2px]'>
                                        <h1 className='text-zinc-600 font-bold'>{item.card.card.info.name}</h1>
                                        <div className='text-sm text-zinc-500 font-semibold flex items-center'>
                                            <IoStarSharp />
                                            <span>{item.card.card.info.avgRating}</span>
                                            <LuDot />
                                            <span>{item.card.card.info.sla.slaString}</span>
                                            <LuDot />
                                            <span>{item.card.card.info.costForTwoMessage}</span>
                                        </div>
                                        <h1 className='line-clamp-1 text-sm text-zinc-400'>{item.card.card.info.cuisines.join(",")}</h1>
                                    </div>
                                </div>
                            )
                        ))}

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
                </>
            ) : <div className='w-full px-2 md:w-[70%] h-[60vh] mt-4 flex flex-wrap mx-auto gap-8'>
                {Array(5)
                    .fill("")
                    .map((data, i) => (
                        <div key={i} className="w-full h-40 flex justify-between">
                            <div className="w-[60%] flex flex-col gap-5 h-full">
                                <div className="w-[100%] h-5 animate"></div>
                                <div className="w-[50%] h-5 animate"></div>
                                <div className="w-[30%] h-5 animate"></div>
                            </div>
                            <div className="w-[30%] rounded-xl h-full animate"></div>
                        </div>
                    ))}
            </div>}
        </>
    )
}

export default SearchData