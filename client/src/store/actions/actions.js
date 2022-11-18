import { 
    GET_COUNTRYS,
    GET_COUNTRY_NAME,
    GET_COUNTRY_ID,
    ADD_ACTIVITIES,
    ORDER_NAME,
    FILTER_POR_CONTINENTES,
    GET_ACTIVITIES,
    FILTER_POR_ACTIVITIES,
    ORDER_POR_POBLACION
} from "./actions_type.js";

import axios  from 'axios';

export function getCountries(){
    return async function(dispacth){
        var json = await axios.get("http://localhost:3001/countries");
        return dispacth({
            type:GET_COUNTRYS,
            payload: json.data
        })
    }
}



export function getCountriesName(name){
  try{ return async function(dispacth){
        var json = await axios.get(`http://localhost:3001/countries?name=${name}`);
        return dispacth({
            type: GET_COUNTRY_NAME,
            payload: json.data
        }
        )
    }
    } catch(error){
        alert("NO EXISTE ESE PAIS")
    }
};

export function postActivities(payload){
    return async function(dispacth){
        var json = await axios.post("http://localhost:3001/activities",payload);
        return dispacth({
            type: ADD_ACTIVITIES,
            payload: json.data
        })
    }
};
export function getCountriesId(id){
    return async function(dispacth){
    var json = await axios.get(`http://localhost:3001/countries/`+id);
    return dispacth({
        type: GET_COUNTRY_ID,
        payload: json.data
    })
    }
};
export function filterPorContinentes(payload){
    return{
        type:FILTER_POR_CONTINENTES,
        payload
    }
}
export function orderA_Z(payload){
    return{
        type:ORDER_NAME,
        payload
    }
};

export function getActivities(payload){
    return async function(dispacth){
        var json = await axios.get("http://localhost:3001/activities")
        return dispacth({
            type: GET_ACTIVITIES,
            payload: json.data
        })
    }
};

export function filterPorActivities(payload){
    return{
        type:FILTER_POR_ACTIVITIES,
        payload
    }
}

export function OrdenarPorPoblacion(payload){
    return{
        type:ORDER_POR_POBLACION,
        payload
    }
}

export function ordenarmayor(payload){
    return{
        type:"ORDER_AREA",
        payload
    }
}





