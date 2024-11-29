import { IoBagOutline } from "react-icons/io5"
import { CiSearch } from "react-icons/ci"
import { BiSolidOffer } from "react-icons/bi";
import { MdHelpOutline } from "react-icons/md";
import { VscAccount } from "react-icons/vsc";
import { FaShoppingCart } from "react-icons/fa";


export const navLinks = [
    {icons:<IoBagOutline/>,name:'search corporate',path:'/search-companies'},
    {icons:<CiSearch/>,name:'search','path':'/search'},
    {icons:<BiSolidOffer/>,name:'special offers',path:'/special-offers'},
    {icons:<MdHelpOutline/>,name:'Help',path:'/help'},
    {icons:<VscAccount/>,name:'sign in',path:'/sign'},
    {icons:<FaShoppingCart/>,name:'cart',path:'/cart'},
]