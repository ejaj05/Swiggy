import React, { useContext, useState } from 'react'
import { UserContext } from '../../context/Context'
import { IoOptionsOutline } from "react-icons/io5";
import Card from './Card'
import { RiArrowDropDownLine } from 'react-icons/ri';
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from 'react-redux';
import { setFilterVal } from '../../utils/reducers/filterSlice';

const OnlineFood = () => {
  const { data } = useContext(UserContext)
  const H1 = data[2]?.card?.card?.header?.title;
  const H2 = data.find((item)=>item?.card?.card?.id === 'popular_restaurants_title')?.card?.card?.title
  const header = H1 || H2
  const mainData = data.find((item) => item.card.card.id === 'restaurant_grid_listing')
  const mainData2 = data.find((item) => item?.card?.card?.id === 'top_brands_for_you')

  const item = mainData2?.card?.card?.gridElements?.infoWithStyle?.restaurants ||  mainData?.card?.card?.gridElements?.infoWithStyle?.restaurants
  
  const {filterVal} = useSelector(state => state.filter)

  const dispatch = useDispatch()

  const btns = ['Filter', 'Sort By', 'Fast Delivery', 'New on Swiggy', 'Ratings 4.0+', 'Pure Veg', 'Offers', 'Rs. 300-Rs. 600', 'Less than Rs. 300']
  const handleBtn = (name) => {
    dispatch(setFilterVal(filterVal == name ? null : name))
  }

  const filterData = item?.filter((data) => {
    switch(filterVal){
      case 'Fast Delivery':
        return data?.info?.sla?.deliveryTime <= 30
      case 'Ratings 4.0+':
        return data?.info?.avgRating > 4.5
      case 'Pure Veg':
        return data?.info?.veg
      case 'Rs. 300-Rs. 600':
        return data?.info?.costForTwo.split(" ")[0].slice(1) >= 300 && data?.info?.costForTwo.split(" ")[0].slice(1) <= 600
      case 'Less than Rs. 300':
        return data?.info?.costForTwo.split(" ")[0].slice(1) < 300
      default:
        return true
    }
  })
  
  return (
    <div>
      <h1 className="font-bold text-2xl">{header}</h1>
      <div className='flex  flex-wrap gap-4 my-6'>
        {btns.map((btn, idx) => (
          <button key={idx} onClick={() => handleBtn(btn)} className={`shrink-0 px-3 py-2 border rounded-full text-sm font-semibold text-zinc-600 flex items-center ${filterVal == btn ? ' border-black':'border-zinc-300 '}`}>
            <span>{btn}</span> 
            {btn === 'Filter' && <IoOptionsOutline className='mt-[2px] ml-2 text-lg'/>}
            {btn === 'Sort By' && <RiArrowDropDownLine className='text-xl'/>}
            <RxCross1 className={`${filterVal === btn ? 'block':'hidden'} text-lg ml-2`}/>
          </button>
        ))}
      </div>

      <div className='grid grid-col-1 sm:1 md:grid-cols-4 gap-8'>
        {filterData?.map(({ info, cta }, idx) => (
          <Card key={idx} restaurant={ info} cta={cta} />
        ))}
      </div>
    </div>
  )
}

export default OnlineFood