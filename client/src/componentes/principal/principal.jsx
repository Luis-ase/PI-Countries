import React from "react";
import style from "./principal.module.css"
import {Link} from 'react-router-dom'



function Principal(){

    return(
        <div className={style.Lan}>
            
            <h1 className={style.titulo}>Paises </h1>
           
        <Link to="/Home" >
            <button className={style.button}> Bienvenidos a mi PI </button> 
        </Link>
        </div>
    )
};


export default Principal;