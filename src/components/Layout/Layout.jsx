import React from "react";
import css from './Layout.module.css'


const Layout = () => {
    return(
        <div className= {css.main}>
        <div className={css.overlay}></div>
    </div>
    )
}

export default Layout;