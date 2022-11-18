import React,{useEffect} from "react";
import { useDispatch, useSelector, } from "react-redux";
import {getCountriesId } from "../../store/actions/actions"
import style from './Details.module.css'

export function Details (props){
  const dispatch = useDispatch();
  

  useEffect(()=>{
    dispatch(getCountriesId(props.match.params.id))
   
  },[dispatch,props.match.params.id])

  const countri = useSelector((state)=>state.countriesId)
  
  return(
    <div className={style.fondo}>
      <div className={style.boxDetail}>
        {countri.length !== 0 ?
        <div>
          <img  className={style.bandera} src={countri.bandera} alt="Bandera del pais" />
          <h2>Detail del pais :{countri.name} </h2>
        
          <h3> En que contiente se encuentra el pais: {countri.continentes}</h3>
          <h4>Nombre de la capital {countri.capital}</h4>
          <p>Cuanto terreno ocupa : {`${countri.area.toLocaleString('en-US')} km²`}</p>
          <p>subregion:{countri.subregion}</p>
          <p>Cuantos personas vivien/residen en este pais {countri.poblacion.toLocaleString('en-US')}</p>

         <h2>Actividades del Pais</h2>
        {countri.sightseeings.length? countri.sightseeings.map(e=>
          <div>
            <h4>Nombre de la actividad:{e.name}</h4>
            <p>Dificultad de la actividad:{e.difficulty}</p>
            <p>Cuanto dura la :{e.time}</p>
            <p>En que temporada se realiza la actividad:{e.temporada}</p>
          </div>
          ):<div><h2>No tiene actividades</h2></div>}
      </div>
      :<p>no hay nada</p>
      }
      </div>
    
    </div>
  )
};