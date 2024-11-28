import React, { useContext, useState } from 'react'
import { UserContext } from '../../context/Context';
import { FiMinus } from 'react-icons/fi';
import { FiPlus } from "react-icons/fi"
const Button = ({item}) => {
    const [quantity, setQuantity] = useState(0);
    const {cardData,setCardData} = useContext(UserContext)
    
    const addItem = () => {
        setQuantity(quantity + 1)
        setCardData([...cardData, item])
        localStorage.setItem('products', JSON.stringify([...cardData, item]))
      }
      const removeItem = () => {
        setQuantity(quantity - 1)
        if (quantity == 1) {
            if(item.type){
                setCardData((prevData)=>(
                    prevData.filter((data)=>{
                        if(data.type){
                            return data== item
                        }else{
                            return data
                        }
                    })
                ))
            }else{
                setCardData((prevData)=>(
                    prevData.filter((data)=>{
                        if(data.card){
                            return data!== item
                        }else{
                            return data
                        }
                    })
                ))
            }
        }
      }
    return (
        <>
            {quantity != 0 ? <h1 className='flex px-3 py-2 items-center gap-4'>
                <span onClick={removeItem} className=''><FiMinus /></span>
                <span className='font-semibold'>{quantity}</span>
                <span onClick={() => setQuantity(quantity + 1)}><FiPlus /></span>
            </h1> : <span className="inline-block px-8 py-2" onClick={addItem}>ADD</span>}
        </>
    )
}

export default Button