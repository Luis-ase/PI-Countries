import React from "react";
import Buscador from "../buscador/Buscador";
import style from "./nav.module.css"

function Nav(){
    return(
        <div className={style.BoxdeNav}>
            <h1 className={style.TituloNav}>Bienvenidos a la App de Países</h1>
            <p className={style.bus}>Busca un Pais</p>
            <Buscador></Buscador>
        </div>
    )
}


export default Nav;