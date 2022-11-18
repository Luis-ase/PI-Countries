import React from "react";
import  "./CardActivities.css"

export function CardActivities({name,difficulty,time,temporada,countries}){
    return(
        <div className="boxCardAct ">
            
            <h3 className="titulo"> Nombre de la actividad: {name}</h3>
           
            <h4>Nivel de la Dificultad: {difficulty}</h4>

            
            <h5>Duracion de la actividad: {`${time}hs`}</h5>
            <h5>En que epoca del año se realiza la temporada: {temporada}</h5>

            <h5>Paises que tienen esta actividad : {countries?.map((el) => (
                    <p key={el.id}> {el.name }</p>
                ))}</h5>
        </div>
    )
}