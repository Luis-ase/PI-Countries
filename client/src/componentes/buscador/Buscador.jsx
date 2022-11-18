import React from "react";
import {useState } from 'react'
import {useDispatch} from 'react-redux'
import {getCountriesName} from '../../store/actions/actions'
import style from "./Buscador.module.css"

function Buscador(){

    const dispatch = useDispatch()
    const [name, setName] = useState("")

    function handlSearch(e){
        e.preventDefault()
        setName(e.target.value)
        console.log(name)
    }
    function handleSub(e){
        e.preventDefault()
        dispatch(getCountriesName(name))
    }

    return(
        <div className={style.BoxofBuscador}>
                <form onSubmit={e => handleSub(e)}>
                <input type={style.Buscador}onChange={(e)=>handlSearch(e)} name="buscador" placeholder="buscar"/>
                <input type="submit" name="boton" className={style.BotondeBuscador}/>
                </form>
        </div>
    )
};
export default Buscador;