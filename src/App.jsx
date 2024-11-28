import React, { useContext} from 'react'
import { Body, Header, RestaurantMenu } from './Components'
import { Route, Routes } from 'react-router-dom'
import { UserContext } from './context/Context'
import { ToastContainer } from 'react-toastify'

const App = () => {
  const {isOpen} = useContext(UserContext)
  return (
    <div className={`h-[100vh] ${isOpen && 'overflow-hidden'}`}>
      <Header/>
      <Routes>
        <Route path="/" element={<Body />} />
        <Route path='/restaurantMenu/:id' element={<RestaurantMenu />} />
      </Routes>
      
    </div>
  )
}

export default App