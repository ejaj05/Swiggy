import React, { useState } from 'react'
import { IoIosArrowDown } from "react-icons/io"
import { navLinks } from '../../utils/constant'
import { Link, useNavigate } from 'react-router-dom'
import { RxCross1 } from "react-icons/rx"
import { useDispatch, useSelector } from 'react-redux'
import { setIsOpen, setLoginStatus } from '../../utils/reducers/toggleSlice'
import { setCord } from '../../utils/reducers/cordSlice'
import { addUserData, removeUserData } from '../../utils/reducers/authSlice'
import { signInWithPopup, signOut } from 'firebase/auth'
import { auth, provider } from '../../config/firebaseAuth'
import toast from 'react-hot-toast'

const Header = () => {
  const [serachResultData, setSearchResultData] = useState([])
  const [address, setAddress] = useState("kolkata...")
  const { isOpen } = useSelector(state => state.toggle)
  const { cartData } = useSelector(state => state.cart)
  const { userData } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const { loginStatus } = useSelector(state => state.toggle)
  const handleLogin = async () => {
    const { user } = await signInWithPopup(auth, provider)
    const userData = {
      displayName: user.displayName,
      photoURL: user.photoURL,
    }
    dispatch(addUserData(userData))
    dispatch(setLoginStatus())
    toast.success("Login successfully")
  }
  const handleLogout = () => {
    signOut(auth)
    dispatch(removeUserData())
    dispatch(setLoginStatus())
    toast.success("Logout successfully")
  }

  const getAreaDetails = async (query) => {
    const res = await fetch(`${import.meta.env.VITE_BASE_URL}/misc/address-recommend?place_id=${query}`)
    const data = await res.json()
    dispatch(setCord(data.data[0].geometry.location))
    setAddress(data.data[0].formatted_address)
    dispatch(setIsOpen())
  }
  const getSearchResults = async (query) => {
    if (!query) {
      setSearchResultData([])
      return
    }
    const result = await fetch(`${import.meta.env.VITE_BASE_URL}/misc/place-autocomplete?input=${query}`)
    const data = await result.json()
    setSearchResultData(data.data)
  }

  return (
    <div className='relative'>

      <div>
        <div onClick={() => dispatch(setIsOpen())} className={`w-full h-[100vh] fixed top-0 left-0 bg-black/60 z-20 ${!isOpen && "hidden"}`}></div>

        <div className={`fixed top-0 left-0 px-12 z-50 bg-zinc-100 w-full md:w-[580px] h-[100vh] ${!isOpen && "-translate-x-[100%]"} duration-500 ease-in-out`}>
          <div className='md:pl-28'>
            <div className='sticky top-0'>
              <RxCross1 className='text-xl my-8 cursor-pointer' onClick={() => dispatch(setIsOpen())} />
              <input onChange={(e) => getSearchResults(e.target.value)} className='w-full p-3 border border-zinc-400 outline-none shadow-xl font-medium text-lg' type='text' placeholder="search for area, street name" />
            </div>

            <ul className='h-full overflow-auto pl-4 pt-10'>
              {serachResultData?.map((item, idx) => (

                <li onClick={() => getAreaDetails(item.place_id)} key={idx} className='py-4 cursor-pointer'>
                  <h1 className='hover:text-orange-600 font-semibold'>{item.structured_formatting.main_text}</h1>
                  <p className='text-zinc-500 text-sm'>{item.structured_formatting.secondary_text}</p>
                  <p className='hidden md:block'>-------------------------------------------------------</p>
                  <p className='block md:hidden'>------------------------------------------</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className='w-full fixed top-0 left-0 bg-white z-10 shadow-md flex justify-center h-24  items-center pr-7'>
        <div className='w-full md:w-[70%] flex justify-between'>
          <div className='flex items-center gap-3'>
            <Link to={'/'}>
              <div className='w-16'>
                <img src="https://tse1.mm.bing.net/th?id=OIP.VqhHv7SOZIOH0WtpSAKt_AAAAA&pid=Api&P=0&h=180" alt="" />
              </div>
            </Link>
            <h1 className='flex items-center  cursor-pointer' onClick={() => dispatch(setIsOpen())}>
              <p className='font-bold border-b-2 border-black hover:border-b-orange-500 hover:text-orange-500'>HOME</p>
              <p className='text-sm text-zinc-500 hover:text-zinc-400  ml-3 line-clamp-1 max-w-40'>{address}</p>
              <IoIosArrowDown className='text-xl mx-3 mt-1 text-orange-500 cursor-pointer' />
            </h1>
          </div>

          <ul className='flex items-center gap-4 md:gap-10'>
            {navLinks.map((item, idx) => (
              item.name == 'sign in' ?
                <li onClick={() => dispatch(setLoginStatus())} key={idx} className='flex cursor-pointer relative items-center hover:text-orange-600 text-zinc-600'>

                  {userData ? <span className='font-semibold'>Logout</span> : <span className='text-xl'>{item.icons}</span>}
                  <span className='hidden md:block text-lg font-semibold ml-2'>{!userData && item.name}</span>
                </li>
                : <Link to={`${item.path}`} key={idx} className='flex relative items-center hover:text-orange-600 text-zinc-600'>
                  <span className='text-xl'>{item.icons}</span>
                  {userData && item.name == 'cart' && <span className='relative top-1 right-0 rounded-full'>{cartData.length}</span>}
                  <span className='hidden md:block text-lg font-semibold ml-2'>{item.name}</span>
                </Link>
            ))}
          </ul>
        </div>
      </div>

      <div>
        <div className={`w-full h-[100vh] fixed top-0 left-0 bg-black/60 z-20 ${!loginStatus && "hidden"}`}></div>

        <div className={`fixed top-0 right-0 px-10 py-3 z-50 bg-zinc-100 w-full md:w-[580px] h-[100vh] ${loginStatus ? " " : "translate-x-[100%]"} duration-500 ease-in-out`}>
          <RxCross1 onClick={() => dispatch(setLoginStatus())} className='text-xl my-5 cursor-pointer' />
          <div className='md:w-[380px] flex flex-col'>
            <div className='flex justify-between items-start'>
              <h1 className='text-3xl font-semibold border-b-2 pb-5 border-black'>Login</h1>
              <img className='w-28' src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/Image-login_btpq7r" alt="" />
            </div>
            
            {userData ?
              <button onClick={handleLogout} className='text-center py-3 bg-orange-600 text-white font-bold '>Logout</button>
              : <>
                <button onClick={handleLogin} className='text-center py-3 bg-orange-600 text-white font-bold '>Login with Google</button>
                <p className='text-[12px]  mt-1 text-zinc-500 font-semibold'>By clicking on Login, I accept the <span className='text-black cursor-pointer'>Terms & Conditions & Privacy <br /> Policy</span></p>
                </>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header