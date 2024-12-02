import { createContext, useEffect, useState } from "react"
import { useSelector } from "react-redux"

export const UserContext = createContext()
const Context = (props) => {
  const [data, setData] = useState([])
  const {cord} = useSelector(state => state.cord)
  const [isServiceable, setIsServiceable] = useState(true)

  async function fetchData() {
    const data = await fetch(
      `${import.meta.env.VITE_BASE_URL}/restaurants/list/v5?lat=${cord.lat}&lng=${cord.lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`
    );
    const jsonData = await data.json();
    setData(jsonData?.data?.cards)
    setIsServiceable(()=>jsonData.data.communication ? false : true);
  }
  useEffect(() => {
    fetchData();
  }, [cord]);
  
  return (
    <UserContext.Provider value={{ data, setData, isServiceable}}>
      {props.children}
    </UserContext.Provider>
  )
}
export default Context  
