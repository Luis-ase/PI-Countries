import React from "react";
import { useHistory } from "react-router-dom";
import { useState , useEffect} from "react";
import {postActivities,getCountries,getActivities} from "../../../store/actions/actions"
import { useDispatch, useSelector } from "react-redux";
import "./Activities.css"
import { Link } from "react-router-dom";


export function Activities(){

const history = useHistory()
const dispatch = useDispatch();
const allCountries = useSelector((state)=> state.countries);
const activitiesState = useSelector((state)=> state.allActivities)
const [input,setInput]= useState({
  name:"",
  difficulty:0,
  time:0,
  temporada:"",
  pais:[]    
});

useEffect(()=>{
    dispatch(getCountries())
    dispatch(getActivities())
},[dispatch])


const [error,setError] =useState({
    name:"",
    difficulty:0,
    time:0,
    temporada:"",
    pais:[] 
})


function validate(state){
    const errors ={}
    const validname = /^[a-zA-Z\s]*$/
    if(!state.name){
        errors.name = "Falta el nombre de la actividad"
    }else if(state.name.length >= 90){
        errors.name = "El nombre de la actividad es muy largo"
    }else if (activitiesState.find(el => el.name === state.name)){
        errors.name = "El nombre de la actividad ya exite"
    }else if(!validname.test(state.name)){
        errors.name = "EL nombre de la actividad no debe tener simbolos"
    }else if( state.name[0] === " " ){
        errors.name = "La actividad necesita comenzar con una letra "
    }else if(state.name.length >= 4){
        error.name = "No existe Actividades que tengo 3 letras ya lo busque"
    }

    if(!state.difficulty){
        errors.difficulty = "Falta la dificultad de la actividad "
    }else if (state.difficulty < 0 || state.difficulty > 5 ){
        errors.difficulty = "El nivel de la dificultad debe de estar entre el 1 y el 5"
    }
    if(!state.time){
        errors.time = "Falta el tiempo de la Actividad"
    }else if(state.time < 0 || state.time > 24){
        errors.time = "La duracion de la Actividad debe de estar, entre las 0hs a 24hs"
    }
    if(!state.temporada){
        errors.temporada = "Eligi la temporada"
    }else if (!state.temporada){
    }
    if(!state.pais){
        errors.pais = "Elige un Pais por favor"
    }
    if(state.pais.length >5){
        errors.pais ="La actividad no puede estar en mas de 5 Paises"
    }
    else if (!state.name && !state.difficulty &&!state.time &&!state.temporada &&!state.pais ){
        errors.completar = "Falta informacion de la Actividad"
    }
    if(state.pais.length === 0){
        errors.pais = "Falta agregar Pais"
    }
    return errors;

}


function onInputChange(evento){
    setInput((prevent)=>{
      const newState= {...input,
        [evento.target.name]:evento.target.value
    } 
    setError(validate(newState))
    return newState
    })
};

function handleSubmit(e){
    e.preventDefault()
        dispatch(postActivities(input))
        alert("Actividad Creada")
        

    setInput({
        name:"",
        difficulty:"",
        time:"",
        temporada:"",
        pais:[]
    })
    history.push("/home")
}

console.log(input.pais)

function handleSelect(e){
    setInput({
        ...input,
        temporada: e.target.value
    })
    setError(validate({
        ...input,
        temporada: e.target.value
    }))
}


function handleSelectPais(e){
    if (!input.pais.includes(e.target.value)){
    setInput({
        ...input,
       pais: [...input.pais, e.target.value ]
    })
    setError(validate({
        ...input,
        pais: [...input.pais, e.target.value ]
    }))
}
}
function eliminarPais(e){
    setInput({
        ...input,
        pais: input.pais.filter(posicion => posicion !== e )
    })
}

return(
    <div className="formxxxxxxxx">
        <h1 className="tituloformulario" >Crea una actividad turistica  </h1>
        <form onSubmit={handleSubmit}>
            <div>
                <label>Nombre de la actividad:</label>
                    <input type={"text"} 
                    value={input.name} 
                    placeholder="Nombre de la actividad" 
                    onChange={onInputChange} 
                    name="name"/>
                    <p className="denegar">{error.name || ""}</p>
            </div>
            <br/>
            <div>
                <label>Dificultad:</label>
                    <input type={"number"} 
                    value={input.difficulty}
                    placeholder="Del 1 al 5 que tan dificil es tu actividad"
                    onChange={onInputChange} 
                    name="difficulty" />
                    <p className="denegar">{error.difficulty || ""}</p>
            </div>
            <br/>
            <div> <label>Duracion:</label>
                    <input type={"number"} 
                    value={input.time} 
                    placeholder="Cuanto tiempo dura la actividad" 
                    onChange={onInputChange} 
                    name="time"/>
                    <br/>
                    <p className="denegar">{error.time || ""}</p>        
            </div>
            <br/>
            <div><label>Temporada:</label>
                    <select name={"temporada"}  onChange={onInputChange}>
                        <option>elige</option>
                        <option value="verano" >Verano</option>
                        <option value="otoño">Otoño</option>
                        <option value="primavera">Primavera</option>
                        <option value="invierno">Invierno</option>
                    </select>
                    <p className="denegar">{error.temporada || ""}</p>
            </div>
            <br/>
            <div><label>Nombre del pais donde queres crear la actividad:</label>
                    <select onChange={e => handleSelectPais(e)}>
                        {allCountries.length? allCountries.map(e=>(
                            <option value={e.name} >{e.name}</option>
                        )):<p>no hay nada</p>}
                    </select>
                    <br/>
                    <p className="denegar">{error.pais || ""}</p>
            </div>
            <br/>
            {input.pais.map(e =>
                <div> 
                    <p key={e}>{e}</p><button type={"button"} value={e} onClick={() => eliminarPais(e)}>X</button>
                </div>
            )}
            <button type="submit" disabled={Object.entries(error).length ? true : false}>Crear Actividad </button>
            
        </form>
    </div>
)
}
