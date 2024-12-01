import React, { useState } from 'react'
import { FiMinus } from 'react-icons/fi';
import { FiPlus } from "react-icons/fi"
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../../utils/reducers/cartSlice';
import toast from 'react-hot-toast';
import { checkRes } from '../../utils/reducers/resSlice';

const Button = ({ item, resInfo = "" }) => {
    const [quantity, setQuantity] = useState(0);
    const { cartData } = useSelector(state => state.cart)
    
    const dispatch = useDispatch()

    const getResInfo = JSON.parse(localStorage.getItem('resInfo')) || [];

    const addItem = () => {
        const isAdded = cartData.find(data => data.id === item.id)
        if (!isAdded) {
            if (getResInfo.name == resInfo.name || getResInfo.length == 0) {
                setQuantity(quantity + 1)
                localStorage.setItem('resInfo', JSON.stringify(resInfo))
                dispatch(addToCart({...item}))
                toast.success("item added successfully")
            }
            else {
                dispatch(checkRes(false))
            }
        } else {
            toast.error("item already added")
        }
    }

    const removeItem = () => {
        setQuantity(quantity - 1)

        if (quantity == 1) {
            dispatch(removeFromCart(item.id))
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