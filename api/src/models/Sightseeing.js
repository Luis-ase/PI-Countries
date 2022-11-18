const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports= (sequelize)=>{
  sequelize.define('sightseeing',{
      name:{
        type: DataTypes.STRING,
        allowNull: true
      },
      difficulty:{
        type: DataTypes.INTEGER,
        allowNull: true,
        validate:{
          min:0,
          max:5,
        }
      },
      time:{
        type: DataTypes.INTEGER,
        allowNull: true
      },
      temporada:{
        type: DataTypes.ENUM("verano","otoño","primavera","invierno"),
        allowNull: true
      },
      fullname:{
        type: DataTypes.VIRTUAL,
        get(){
          return `${this.name} ${this.temporada}`
        },
      }
    })
};