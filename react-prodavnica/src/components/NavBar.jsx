import React from 'react'

function NavBar(){
    return(
        <div className="navBar">
        <a>My store</a> 
        <div className="cart-items"> 
            <p className="cart-num">0</p>
        </div>
        </div>
    );
}

export default NavBar