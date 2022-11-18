import React from "react";
import style from "./Paginado.module.css"


export default function Paginado({countxPage,allCountries,paginado }){
const pageNumbers = [];
for (let i = 1 ; i <= Math.ceil(allCountries === 250 ? (allCountries/countxPage )+1 : allCountries/countxPage  ); i++) {
    pageNumbers.push(i);
}
console.log(pageNumbers)
return(
    <div>
        <ul className={style.paginado}>
            {   pageNumbers.length ? 
                pageNumbers.map((num)=>{
                    return(
                       
                    <li className={style.numb} key={num}>
                        <button className={style.buttonP} onClick={()=> paginado(num)}  >{num}</button>
                    </li>
                     )
                    }) 
                    :<div className={style.loader}></div>
            }

        </ul>
    </div>
)}