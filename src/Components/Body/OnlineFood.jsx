import React, { useContext } from 'react'
import { UserContext } from '../../context/Context'
import Card from './Card'

const OnlineFood = () => {
    const {data,setData} = useContext(UserContext)
    const header = data[2]?.card?.card?.title
    const item = data[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants

  return (
    <div>
        <h1 className="font-bold text-2xl mb-6">{header}</h1>
        <div className='grid grid-cols-4 gap-8'>
            {item?.map(({info,cta},idx)=>(
                <Card key={idx} restaurant={info} cta={cta}/>
            ))}
        </div>
    </div>
  )
}

export default OnlineFood