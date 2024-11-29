import React, { useContext} from 'react'
import { Body, Cart, Header, RestaurantMenu } from './Components'
import { Route, Routes } from 'react-router-dom'
import { UserContext } from './context/Context'
import { useSelector } from 'react-redux'

const App = () => {
  const {isOpen} = useSelector(state => state.toggle)
  return (
    <div className={`h-[100vh] ${isOpen && 'overflow-hidden'}`}>
      <Header/>
      <Routes>
        <Route path="/" element={<Body />} />
        <Route path='/restaurantMenu/:id' element={<RestaurantMenu />} />
        <Route path='/cart' element={<Cart />} />
      </Routes>
      
    </div>
  )
}

export default App