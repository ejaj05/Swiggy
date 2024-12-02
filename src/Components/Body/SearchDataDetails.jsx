import React from 'react'
import { IoIosArrowRoundForward } from 'react-icons/io'
import { IoStarSharp } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import Button from './Button'

const SearchDataDetails = ({item}) => {
    return (
        <div className='px-4 pb-10 pt-4 bg-white rounded-3xl'>
            <Link to={`/restaurantMenu/`} className='flex justify-between items-center'>
                <div>
                    <h1>By {item?.card?.card?.restaurant?.info?.name}</h1>
                    <div className='flex items-center  text-sm text-zinc-500'>
                        <IoStarSharp />
                        <p>{item?.card?.card?.restaurant?.info?.avgRating}</p>
                        <span>.</span>
                        <p>{item?.card?.card?.restaurant?.info?.sla?.slaString}</p>
                    </div>
                </div>
                <IoIosArrowRoundForward className='text-3xl' />
            </Link>
            <hr className='border border-zinc-200 my-4' />


            <div className='flex justify-between'>
                <div className='w-40'>
                    <h1 className='text-xl font-bold text-zinc-600'>{item?.card?.card?.info?.name}</h1>
                    <p className='font-semibold'>₹{item?.card?.card?.info?.price / 100}</p>
                </div>
                <div className='relative'>
                    <img className='w-40 h-40 object-cover object-center rounded-2xl' src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/${item?.card?.card?.info?.imageId}`} alt="" />
                    <button className="absolute -bottom-5 left-7 font-bold text-xl bg-white rounded-xl shadow-xl text-emerald-600 hover:bg-zinc-200 border border-zinc-300">
                        <Button item={item?.card?.card?.info} resInfo={item?.card?.card?.restaurant?.info}/>
                    </button>
                </div>
            </div>

        </div>
    )
}

export default SearchDataDetails