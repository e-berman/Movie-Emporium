// Citation for the following icons
// Date: 11/1/2021
// Source URL: https://react-icons.github.io/react-icons/

import { BsTags, BsHouseDoor, BsCart2 } from "react-icons/bs";
import { MdOutlineLocalMovies } from "react-icons/md";
import { BiCategoryAlt, BiUserCircle, BiDollarCircle } from "react-icons/bi";


export const NavbarData = [
    {
        title: "Home",
        path: '/',
        icon: <BsHouseDoor />,
        cName: 'nav-text',
    },
    {
        title: "Physical Movies",
        path: '/physical-movies',
        icon: <BsTags />,
        cName: 'nav-text',
    },
    {
        title: "Stream Movies",
        path: '/stream-movies',
        icon: <MdOutlineLocalMovies />,
        cName: 'nav-text',
    },
    {
        title: "Orders",
        path: '/orders',
        icon: <BsCart2 />,
        cName: 'nav-text',
    },
    {
        title: "Customers",
        path: '/customers',
        icon: <BiUserCircle />,
        cName: 'nav-text',
    },
    {
        title: "Categories",
        path: '/categories',
        icon: <BiCategoryAlt />,
        cName: 'nav-text',
    },
    {
        title: "Subscriptions",
        path: '/subscriptions',
        icon: <BiDollarCircle />,
        cName: 'nav-text',
    },

]


