import React, { useContext, useState } from 'react'
import { IoIosArrowDown } from "react-icons/io"
import { navLinks } from '../../utils/constant'
import { Link } from 'react-router-dom'
import { RxCross1 } from "react-icons/rx"
import { UserContext } from '../../context/Context'
import { useDispatch, useSelector } from 'react-redux'
import { setIsOpen } from '../../utils/reducers/toggleSlice'
import { setCord } from '../../utils/reducers/cordSlice'

const Header = () => {
  const [serachResultData, setSearchResultData] = useState([])
  const [address,setAddress] = useState("kolkata...")
  const {isOpen} = useSelector(state => state.toggle)
  const {cartData} = useSelector(state => state.cart)
  const dispatch = useDispatch()

  const getAreaDetails = async (query)=>{
    const res = await fetch(`/swiggy-api/dapi/misc/address-recommend?place_id=${query}`)
    const data = await res.json()
    dispatch(setCord(data.data[0].geometry.location))
    setAddress(data.data[0].formatted_address)
    dispatch(setIsOpen())
  }
  const getSearchResults = async (query) => {
    if(!query){
      setSearchResultData([])
      return 
    }
    const result = await fetch(`/swiggy-api/dapi/misc/place-autocomplete?input=${query}`)
    const data = await result.json()
    setSearchResultData(data.data)
  }
  return (
    <div className='relative'>

      <div>
        <div onClick={() => dispatch(setIsOpen())} className={`w-full h-[100vh] absolute top-0 left-0 bg-black/60 z-20 ${!isOpen && "hidden"}`}></div>

        <div className={`absolute top-0 left-0 px-12 z-50 bg-zinc-100 w-[580px] h-[100vh] ${!isOpen && "-translate-x-[100%]"} duration-500 ease-in-out`}>
          <div className='pl-28'>
            <div className='sticky top-0'>
              <RxCross1 className='text-xl my-8 cursor-pointer' onClick={() => dispatch(setIsOpen())} />
              <input onChange={(e) => getSearchResults(e.target.value)} className='w-full p-3 border border-zinc-400 outline-none shadow-xl font-medium text-lg' type='text' placeholder="search for area, street name" />
            </div>

            <ul className='h-full overflow-auto pl-4 pt-10'>
              {serachResultData?.map((item, idx) => (

                <li onClick={()=>getAreaDetails(item.place_id)} key={idx} className='py-4 cursor-pointer'>
                  <h1 className='hover:text-orange-600 font-semibold'>{item.structured_formatting.main_text}</h1>
                  <p className='text-zinc-500 text-sm'>{item.structured_formatting.secondary_text}</p>
                  <p>-------------------------------------------------------</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className='w-full fixed top-0 left-0 bg-white z-10 shadow-md flex justify-center h-24  items-center'>
        <div className='w-[83%] flex justify-between'>
          <div className='flex items-center gap-3'>
            <Link to={'/'}>
              <img className='w-24' src="https://logos-world.net/wp-content/uploads/2020/11/Swiggy-Emblem.png" alt="" />
            </Link>
            <h1 className='flex items-center  cursor-pointer' onClick={() => dispatch(setIsOpen())}>
              <p className='font-bold border-b-2 border-black hover:border-b-orange-500 hover:text-orange-500'>HOME</p>
              <p className='text-sm text-zinc-500 hover:text-zinc-400  ml-3 line-clamp-1 max-w-40'>{address}</p>
              <IoIosArrowDown className='text-xl mx-3 mt-1 text-orange-500 cursor-pointer' />
            </h1>
          </div>

          <ul className='flex items-center gap-10'>
            {navLinks.map((item, idx) => (
              <Link to={`${item.path}`} key={idx} className='flex relative items-center hover:text-orange-600 text-zinc-600'>
                <span className='text-xl'>{item.icons}</span>
                {item.name == 'cart' && <span className='relative top-1 right-0 rounded-full'>{cartData.length}</span>}
                <span className=' text-lg font-semibold ml-2'>{item.name}</span>
              </Link>
            ))}
          </ul>
        </div>
      </div>

    </div>
  )
}

export default Header