import React, { useEffect, useState } from 'react'
import { FaMagnifyingGlass } from 'react-icons/fa6'
import { Link, Outlet } from 'react-router-dom'
import SearchData from './SearchData'

const Searchbar = () => {
  const [query, setQuery] = useState('')
  const [suggestion, setSuggestion] = useState([])
  const [searchStatus, setSearchStatus] = useState(true)

  const getMenuDetails = async (query) => {
    const res = await fetch(`https://www.swiggy.com/dapi/restaurants/search/suggest?lat=22.530777&lng=88.4022104&str=${query}&trackingId=null&includeIMItem=true`)
    const { data } = await res.json()
    setSuggestion(data?.suggestions)
  }

  useEffect(() => {
    getMenuDetails(query)
  }, [query])
  return (
    <div className='pt-24 w-full p-2 md:w-[60%] h-[100vh] mx-auto'>
      <div className='flex items-center bg-white border  border-zinc-300 mt-12 px-4 rounded-md'>
        <input onClick={() => setSearchStatus(true)} value={query} onChange={(e) => setQuery(e.target.value)} type='text' placeholder='Search for restaurants and food' className='w-full py-3 outline-none font-semibold text-zinc-600' />
        <FaMagnifyingGlass className='text-xl text-zinc-500' />
      </div>

      <div className='relative'>
        
        {searchStatus ? (<ul className='pl-3 pt-8'>
          {suggestion?.map((item, idx) => (
            <Link key={idx} onClick={()=>setSearchStatus(!searchStatus)} className='py-4 cursor-pointer flex items-center gap-4 hover:bg-slate-200'>
              <img className='w-16 rounded-lg' src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_112,h_112,c_fill/${item?.cloudinaryId}`} alt="" />
              <div>
                <h1>{item?.text}</h1>
                <p className='text-zinc-500 text-sm'>{item?.type}</p>
              </div>
            </Link>
          ))}
        </ul>):<SearchData query={query}/>}
      </div>

    </div>
  )
}

export default Searchbar