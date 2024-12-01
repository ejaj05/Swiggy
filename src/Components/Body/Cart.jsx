import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromCart } from '../../utils/reducers/cartSlice'
import toast from 'react-hot-toast'
import { IoMdStar } from 'react-icons/io'
import { setLoginStatus } from '../../utils/reducers/toggleSlice'

const Cart = () => {
    const { cartData } = useSelector(state => state.cart)
    const { userData } = useSelector(state => state.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const resInfo = JSON.parse(localStorage.getItem('resInfo')) || null
    let amounts = cartData?.reduce((acc, item) => acc + item.price || item.price, 0)

    const [toggle, setToggle] = useState(false);
    const veg = "https://foodandfusion.in/assets/icons/veg-symbol.png";
    const nonVeg = "https://foodandfusion.in/assets/icons/non-veg-symbol.png";


    const handleRemove = (id) => {
        dispatch(removeFromCart(id))
        toast.success("item removed successfully")
    }

    const handleOrder = () => {
        if (userData) {
            toast.success("Order placed successfully")
        } else {
            toast.error("Please login to place order")
            dispatch(setLoginStatus())
        }
    }

    if (cartData.length == 0) {
        return (
            <div className='h-[60vh]  pt-24 m-auto flex justify-end items-center flex-col'>
                <h1 className='text-2xl font-semibold text-zinc-700'>Your cart is empty</h1>
                <p className='text-sm text-zinc-500'>You can go to home page to view more restaurants</p>
                <Link to={'/'} className='px-4 py-2 bg-orange-600 text-white inline-block font-semibold mt-8 hover:shadow-lg'>SEE RESTAURANTS NEAR YOU</Link>
            </div>
        )
    } else
        return (
            <div className='w-[50%] h-[100vh] pt-24 m-auto'>

                <div className='flex mt-8 gap-4'>
                    <div className='w-44 h-44 rounded-lg overflow-hidden'>
                        <img src={`https://media-assets.swiggy.com/swiggy/image/upload/${resInfo?.cloudinaryImageId}`} alt="" />
                    </div>
                    <div>
                        <h1 className='text-4xl border-b-2 border-black pb-2'>{resInfo?.name}</h1>
                        <p className='mt-1 font-semibold'>{resInfo?.areaName}</p>
                    </div>
                </div>
    
                    {cartData.map((item, idx) => {
                        return <div key={idx} >
                            <div className="flex justify-between mt-[24px]">
                                <div className="w-[70%]">
                                    <img
                                        className="w-5"
                                        src={`${item?.itemAttribute?.vegClassifier === "VEG"
                                            ? veg
                                            : nonVeg
                                            }`}
                                        alt=""
                                    />
                                    <h2 className="font-bold text-xl text-zinc-600">
                                        {item.name}
                                    </h2>
                                    <h2 className="font-medium text-lg">
                                        ₹{item.price / 100 || item.defaultPrice / 100}
                                    </h2>
                                    <span className="flex items-center font-semibold text-emerald-700 my-1">
                                        <IoMdStar className="" />
                                        {item?.ratings?.aggregatedRating?.rating && <>
                                            <span className="ml-1">
                                                {item?.ratings?.aggregatedRating?.rating}
                                            </span>
                                            <span className="text-zinc-500">({item?.ratings?.aggregatedRating?.ratingCountV2})</span>
                                        </>
                                        }

                                    </span>
                                    <div>
                                        <p className="">{toggle ? item.description : item.description?.slice(0, 130)} </p>
                                        {item.description?.length > 130 && <span onClick={() => setToggle(!toggle)} className="font-bold text-zinc-600 cursor-pointer">{toggle ? "less" : " ...more"}</span>}
                                    </div>
                                </div>

                                <div className="w-[25%] h-40 relative">
                                    <img
                                        className="w-full h-full object-cover  rounded-2xl"
                                        src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,c_fit/${item.imageId}`}
                                        alt=""
                                    />
                                    <button onClick={() => handleRemove(item.id)} className="absolute bottom-[-18px] left-10 px-3 py-2 font-bold text-xl bg-red-600 rounded-xl shadow-xl text-white ">
                                        Remove
                                    </button>
                                </div>
                            </div>
                            {idx !== cartData.length-1 && <hr className="border border-zinc-300 my-8" />}
                        </div>
                    })}
                

                <hr className='border-2 border-black my-4' />

                <div className='flex justify-between'>
                    <h1>Total price</h1>
                    <h1 className='mr-20'>₹{amounts / 100}</h1>
                </div>

                <button onClick={handleOrder} className='py-2 px-4 bg-orange-500 text-white font-semibold mt-2'>order place</button>
            </div>
        )
}

export default Cart