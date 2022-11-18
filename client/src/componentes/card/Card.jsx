import React from "react";
import{Link} from "react-router-dom"
import style from "./Card.module.css"

function Card({name,continentes,bandera,id,area}){
    return(

        <div className={style.container}>
            <img className={style.flag} src={bandera} alt="img not found"  />

            <div className={style.textContainer}>

                
                <h4 className={style.countryName}>{name}</h4>
       
                <h4>{continentes}</h4>
                <h4>{`${area.toLocaleString('en-US')}km²`}</h4>
                <Link to={"/home/"+id}>
                <button className={style.button}>Detalle</button>
                </Link>
            </div>
           
        </div>
    )
}

export default Card;