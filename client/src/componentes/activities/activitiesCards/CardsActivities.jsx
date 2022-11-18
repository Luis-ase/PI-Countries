import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getActivities } from "../../../store/actions/actions";
import { CardActivities } from "../activitiesCard/CardActivities";
import  "./CardsActivities.css"


export function CardsActivities(){
    
    
    const dispatch = useDispatch()

    const activitiesState = useSelector((state)=> state.allActivities)
    useEffect(()=>{
        dispatch(getActivities())
    },[dispatch]);
    

    
    return(
        <div className="boxCotenedorActivi"> 
            
            <h1 className="titulo">Estas son todas las Actividades</h1>
            <br></br>
             {activitiesState?.map(e =>{
                return(
            <div className="contend">
            <CardActivities
            
            name={e.name}
            difficulty={e.difficulty}
            time={e.time}
            temporada={e.temporada}
            countries={e.countries}
            />    
            </div> )   
            })} 
        </div>
    )
}