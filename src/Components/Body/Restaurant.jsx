import React, { useContext, useState } from 'react'
import { Card, Top } from '../index'
import { UserContext } from '../../context/Context'

const Cards = () => {
  const { data } = useContext(UserContext)
  const header = data.find((item)=>item?.card?.card?.header?.title === 'Top restaurant chains in Kolkata')?.card?.card?.header?.title || "Top restaurant chains in Your area"
  const mainData = data.find((item) => item.card.card.id === 'restaurant_grid_listing')
  const item = mainData?.card?.card?.gridElements?.infoWithStyle?.restaurants
  const [move, setMove] = useState(0);

  const handleMoveRight = () => {
    if (move > 0) {
      setMove(move - 1);
    }
  };
  const handleMoveLeft = () => {
    if (move < 3) {
      setMove(move + 1);
    }
  };
  return (
    <>
      <div className='w-full my-8 overflow-hidden hidden md:block'>
        <Top title={header} move={move} handleMoveLeft={handleMoveLeft} handleMoveRight={handleMoveRight} length={3} />
        <div style={{ translate: `-${move * 50.60}%` }} className='flex gap-5 duration-300 mt-8'>
          {item?.map(({ info, cta }, index) => (
            <Card key={index} restaurant={info} cta={cta} />
          ))}
        </div>
        <hr className='border' />
      </div>

      <div className='w-full my-8 overflow-hidden block md:hidden'>
        <Top title={header} move={move} handleMoveLeft={handleMoveLeft} handleMoveRight={handleMoveRight} length={3} />
        <div style={{ translate: `-${move * 160}%` }} className='flex gap-5 duration-300 mt-8'>
          {item?.map(({ info, cta }, index) => (
            <Card key={index} restaurant={info} cta={cta} />
          ))}
        </div>
        <hr className='border' />
      </div>
    </>
  )
}
export default Cards