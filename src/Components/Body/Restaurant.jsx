import React, { useContext, useState } from 'react'
import {Card, Top} from '../index'
import { UserContext } from '../../context/Context'

const Cards = () => {
  const {data,setData} = useContext(UserContext)
  const header = data[1]?.card?.card?.header?.title
  const item = data[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
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
    <div className='w-full my-8 overflow-hidden'>
     <Top title={header} move={move} handleMoveLeft={handleMoveLeft} handleMoveRight={handleMoveRight} length={3}/>
     <div style={{ translate: `-${move *50.60}%` }} className='flex gap-5 duration-300 mt-8'>
       {item?.map(({info,cta}, index) => (
         <Card key={index} restaurant={info} cta={cta}/>
       ))}
     </div>
     <hr className='border'/>
    </div>
  )
}
export default Cards