import React from "react";
import "../../Style/Navigation/Nav.css";
import Logo from "../../Images/racing.png";

const NavBar = ()=>{
    return(
        <React.Fragment>
            <nav>
                <div className="logo">
                    <img src={Logo} alt="Logo" />
                    <b>Wheels On travel</b>
                </div>
            </nav>
        </React.Fragment>
    );
}

export default NavBar;