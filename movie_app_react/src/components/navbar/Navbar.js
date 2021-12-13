import React, { useState } from "react";
import "./Navbar.css";
import { ImMenu } from "react-icons/im";
import { AiOutlineCloseSquare } from "react-icons/ai";
import { Link } from "react-router-dom";
import { NavbarData } from "./NavbarData";
import { IconContext } from "react-icons";

function Navbar() {

    const [sidebar, setSidebar] = useState(false);

    return(
        <>
        <IconContext.Provider value={{color: "#fff"}}>
            <div className="navbar">
                <Link to="#" className="menu-bars">
                    <ImMenu onClick={() => setSidebar(!sidebar)}/>
                </Link>
                <title className="home-title">Movie Emporium</title>
            </div>
            <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
                <ul className="nav-menu-items" onClick={() => setSidebar(!sidebar)}>
                    <li className="navbar-toggle">
                        <Link to="#" className="menu-bars">
                            <AiOutlineCloseSquare />
                        </Link>
                    </li>
                    {NavbarData.map((item, index) => {
                        return (
                            <li key={index} className={item.cName}>
                                <Link to={item.path}>
                                    {item.icon}
                                    <span>{item.title}</span>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        </IconContext.Provider>
        </>
    );
}

export default Navbar;