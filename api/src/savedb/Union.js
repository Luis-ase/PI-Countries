
const axios = require("axios")

const { Country } = require('../db');


async function Dbcomplit(){
    try{
    const apideCountry = await axios.get('https://restcountries.com/v3.1/all');
    const datosdelaapi = await apideCountry.data.map(e => {
        return{
            id:e.ccd3,
            name: e.name.common,
            bandera : e.flags,
            continentes: e.continents,
            capital: e.capital,
            subregión: e.subregion,
            area: e.area,
            poblacion: e.population
        }
    });
    await CreateCountries(datosdelaapi)
    }catch(error){
        console.log(error)
    }
};

async function CreateCountries  (countries = []) {
    return await Country.bulkCreate(countries)
};


module.exports = {
    Dbcomplit
}