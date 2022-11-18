const { Router } = require('express');
//const { response, route } = require('../app');
//const Country = require('../models/Country');
const axios = require("axios")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Country , Sightseeing } = require('../db');
const {Op}= require('sequelize')
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

async function findCountries() {
    let newCountries;
    let toSavedCountries;
    try {
        await axios.get('https://restcountries.com/v3/all')
            .then(resp => newCountries = [...resp.data]);
            
        toSavedCountries = newCountries.map(country => {
            return ({
                id: country.cca3,
                name: country.name.common,
                bandera: country.flags[1],
                continentes: country.region,
                capital: country.capital ? country.capital[0] : 'Unknow',
                subregion: country.subregion,
                area: country.area,
                poblacion: country.population,
                // maps: country.maps.googleMaps,
                // timezones: country.timezones[0],
                // fifa: country.fifa? country.fifa : "No tiene clasificacion",
                // car: country.car.side,
                // independent: country.independent,
                // languages: country.languages? mapearcosa(toSavedCountries) : "Unknow"
              })
        });
        // let  cositas = await mapearcosa(toSavedCountries)

        await createCountries(toSavedCountries);
        
    } catch (error) {
        console.log(error);
    }
}

async function createCountries(countries = []) {
    try {
        await Country.bulkCreate(countries)
    } catch (error) {
        console.log(error);
    }
};

// async function mapearcosa(cosas){
//     let a ="";
//     let l = cosas.map(e => {
//         if(typeof(e.languages) === "object"){
//             a = "";
//             for (let idiomas in e.languages) {
//                 a = a + e.languages[idiomas] +",";
//             }
//         }
//         return {...e,languages :a }
//     })
//     return l;
// }


// /cosasa = country.languagees 
// let idioma= "";
// let i =  country.languages.map(e =>e{
//     for(let key  in languages){
//       idioma
//}
//
//})






 router.get("/countries",async(req,res)=>{
     const name = req.query.name
     
     try{
        if(name){
            let nombresiestan = await Country.findAll({ 
              where: { name: { [Op.iLike]: `%${name}%` } }
            })
            nombresiestan.length ? res.status(200).json(nombresiestan) : res.status(404).send('No se encontro el Pais');
        }else   
      
         await findCountries();

         let trae = await Country.findAll({
          include:{
            model:Sightseeing,
            attributes:["name"],
            through:{attributes:[]}
        }
         })
      
         res.status(200).json(trae)
  
     }catch(error){
        console.log(error)
     }
 });



router.get("/countries/:id", async(req, res)=>{
    let {id} = req.params
    console.log(id)
    try{
        if(id){
            let buscarid = await Country.findByPk(id,{
                include:{
                    model:Sightseeing,
                    attributes:["name","difficulty","time","temporada"],
                    through:{attributes:[]}
                }
            });
            console.log(buscarid)
            res.status(200).json(buscarid)
        }else{
            res.status(400).send("No se exite ese Pais")
        }
    }catch(error){
        throw new error
    }
});





router.post('/activities', async (req, res) => {
    const { name, difficulty, time, temporada, pais} = req.body;
    let nameCheck = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    
    try{
      const [activity, created] = await Sightseeing.findOrCreate({
        where: {
          name: nameCheck,
        },
        defaults: {

          difficulty,
          time,
          temporada,
        },
      });

      pais.forEach(async (el) => {
        let pais = await Country.findOne({
          where: {
            name: el
          },
        });

       await pais?.addSightseeing(activity); 
      });
      res.status(200).json(activity)
     
    } catch(error){
      throw new Error("Algo salio mal")
    }
  });




router.get("/activities", async(req,res)=>{
    try{
        let allSightseeing = await Sightseeing.findAll({
            include: {
                model: Country
              }
        })
        console.log(allSightseeing)

        res.status(200).json(allSightseeing)

    }catch(error){
        res.status(400).send("Algo fallo")
    }
});





module.exports = router;
