import { createContext, useEffect, useState } from "react"

export const UserContext = createContext()
const Context = (props) => {
  const [data, setData] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [cord, setCord] = useState({ lat: 22.530777, lng: 88.4022104 })
  const [cardData, setCardData] = useState([])
  const [isServiceable, setIsServiceable] = useState(true)
  async function fetchData() {
    const data = await fetch(
      `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${cord.lat}&lng=${cord.lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`
    );
    const jsonData = await data.json();
    setData(jsonData?.data?.cards)
    setIsServiceable(()=>jsonData.data.communication ? false : true);
  }
  useEffect(() => {
    fetchData();
  }, [cord]);
  console.log(cardData)
  return (
    <UserContext.Provider value={{ data, setData, isOpen, setIsOpen,cord,setCord ,cardData, setCardData, isServiceable}}>
      {props.children}
    </UserContext.Provider>
  )
}
export default Context  
