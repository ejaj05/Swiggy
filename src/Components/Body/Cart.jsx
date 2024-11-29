import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromCart } from '../../utils/reducers/cartSlice'
import toast from 'react-hot-toast'

const Cart = () => {
    const {cartData} = useSelector(state => state.cart)
    const dispatch = useDispatch()
    let amounts = cartData?.reduce((acc, item) => acc + item.price || item.price, 0)

    const handleRemove = (id) => {
        dispatch(removeFromCart(id))
        toast.success("item removed successfully")
    }
    
    if (cartData.length == 0) {
        return (
            <div className='w-[70%] h-[60vh]  pt-24 m-auto flex justify-end items-center flex-col'>
                <h1 className='text-2xl font-semibold text-zinc-700'>Your cart is empty</h1>
                <p className='text-sm text-zinc-500'>You can go to home page to view more restaurants</p>
                <Link to={'/'} className='px-4 py-2 bg-orange-600 text-white inline-block font-semibold mt-8 hover:shadow-lg'>SEE RESTAURANTS NEAR YOU</Link>
            </div>
        )
    } else
        return (
            <div className='w-[50%] h-[100vh] pt-24 m-auto'>
                <div className='h-[50vh] overflow-auto'>
                    {cartData.map((item, idx) => {
                        return <div key={idx} className='flex justify-between items-center my-12'>
                            <h1 className='text-2xl font-semibold text-zinc-700'>{item.name}</h1>
                            <div className='relative'>
                                <img className='w-44' src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,c_fit/${item.imageId}`} alt="" />
                                <button onClick={() => handleRemove(item.id)} className="absolute bottom-[-18px] left-10  px-3 py-2 font-bold text-xl text-white rounded-xl  bg-red-700 hover:bg-red-600">
                                    {/* <Button item={item} /> */}
                                    Remove
                                </button>
                            </div>
                        </div>
                    })}
                </div>

                <hr className='border-2 border-black' />

                <div className='flex justify-between mt-6'>
                    <h1>Total price</h1>
                    <h1 className='mr-20'>₹{amounts / 100}</h1>
                </div>
            </div>
        )
}

export default Cart