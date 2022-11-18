import React, { Fragment } from "react";
import {useState , useEffect} from 'react';
import { useDispatch , useSelector} from "react-redux";
import {
    getCountries,
    orderA_Z ,
    filterPorContinentes,
    getActivities,
    filterPorActivities,
    OrdenarPorPoblacion
    } from '../../store/actions/actions'
import Card from '../card/Card'
import { Link } from "react-router-dom";
import Paginado from '../paginado/Paginado'
import Nav from "../nav/Nav";
import style from "./Home.module.css"

export function Home (){

const dispatch = useDispatch()
const allCountries = useSelector((state)=> state.countries);

console.log("AHHHHHHHHHHHHHHHHHHHHHH",allCountries)

const activitiesSelector = useSelector(state => state.allActivities)


useEffect(()=>{
    dispatch(getActivities())
    dispatch(getCountries())
},[dispatch]);

    const [order, setOrder] = useState("")



    let numberrr = 10

    let [countPage, setCountPage] = useState(1);

    const [countxPage, setCountXPage] = useState(numberrr);
    let lastofcount = (countPage * countxPage)-1;
    const firtofcount = lastofcount - countxPage;
///     countPage = 1
//      countxPage = 9
// last =  9 /// 2 => 2 * 10  = 19 // 3 *10 =30-1 = 29
// 19-10
// firt = 0 //  9 /// 20
    let allnow;
    if(countPage === 1 ){ allnow = allCountries.slice(0,9 )
    }
    else {
      allnow = allCountries.slice(firtofcount ,lastofcount )
    }  

    const paginado = (pageNumbers)=>{
        setCountPage(pageNumbers)
    }

    function handleSort(e){
        e.preventDefault()
     dispatch(orderA_Z(e.target.value));
     setCountPage(1)
     setOrder((`ordenado ${e.target.value}`))
    }

    function handlRefresh(e){
        e.preventDefault()
        dispatch(getCountries(e))
        setCountPage(1)
        setOrder((`ordenado ${e.target.value}`))
    }

    function handleFilter(e){
        e.preventDefault()
        dispatch(filterPorContinentes(e.target.value))
        setCountPage(1)
     setOrder((`ordenado ${e.target.value}`))
    }

    

    function handleFilterActivities(e){
        e.preventDefault(e)
        dispatch(filterPorActivities(e.target.value))
        setCountPage(1)
     setOrder((`ordenado ${e.target.value}`))
    }

    function OrderPoblacion(e){
        e.preventDefault()
        dispatch(OrdenarPorPoblacion(e.target.value))
        setCountPage(1)
        setOrder((`ordenado ${e.target.value}`))}
   
    
   
return(

    <div className={style.HomePrincipal}> 
        <Nav/>
        
            <div>
            <p className={style.veract}> Ve todas la actividades <Link  to="/AllActivities"><button className={style.enviarallact}>Aca</button></Link></p>
            </div>
            
            <div className="actividad">
            <p className={style.crearact}> Crea una actividad turistica para un pais<Link to="/Activities"><button className={style.buttonTop}> Crear la actividad </button></Link></p> 
            </div> 
            <button className={style.buttonTop} onClick={e=>handlRefresh(e)}>Refresh</button>
            <div className="elegir">
                <select onChange={e => handleSort(e)} >
                    <option>Ordenar de la A-Z y de la Z-A</option>
                    <option value="asc">Ascendente</option>
                    <option value="des">Descendente</option>
                </select>



                <select onChange={e => handleFilter(e)}>
                    <option value="All"> Todos los Continente</option>
                    <option value="Asia" >Asia</option>
                    <option value="Americas" >Americas</option>
                    <option value="Africa" >Africa</option>
                    <option value="Antarctic" >Antarctic</option>
                    <option value="Europe" >Europe</option>
                    <option value="Oceania" >Oceania</option>
                </select>
                
                <select onChange={e => OrderPoblacion(e)}>
                    <option>Ordenar por poblacions</option>
                    <option value="Menor">Menor Cantidad</option>
                    <option value="Mayor">Mayor Cantidad</option>
                </select> 

                {
                    activitiesSelector.length > 0 ?
                        <select defaultValue={'DEFAULT'} className={style.bar} onChange={(e)=>handleFilterActivities(e)}>
                            <option value='All'>All</option>
                            {activitiesSelector.map((el) =>
                                <option key={el.id} value={el.name}>
                                    {el.name}
                                </option>
                            )}
                        </select>
                        :
                        <select defaultValue={'DEFAULT'} className={style.bar}><option value="DEFAULT" disabled>No hay activities </option></select>
                }
            </div>
            
            <Paginado 
          
            countxPage={numberrr} 
            allCountries={allCountries.length} 
            paginado={paginado}
            ></Paginado>
            
            <div className={style.BoxdeCards}>
            
            {allnow?.map((e)=>{
            return(
                <div >
                
                <Card
                id={e.id}
                key={e.id}
                name={e.name}
                continentes={e.continentes}
                bandera={e.bandera}
                area={e.area}
                />
               
                </div>
            )
            })}
            </div>
    </div>
)
};
