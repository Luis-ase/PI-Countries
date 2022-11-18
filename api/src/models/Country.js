const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('country', {
    id:{
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bandera : {
      type: DataTypes.STRING,
      allowNull: false,
    },
    continentes: {
      type: DataTypes.STRING,
      allowNull:  false,
    },
    capital:{
      type: DataTypes.STRING,
      allowNull: false
    },
    subregion:{
      type: DataTypes.STRING,
      allowNull: true
    },
    area:{
      type: DataTypes.FLOAT,
      allowNull: true
    },
    poblacion:{
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // maps:{
    //   type:  DataTypes.STRING,
    //   allowNull: true
    // },
    // timezones:{
    //   type: DataTypes.STRING,
    //   allowNull: true
    // },
    // fifa:{
    //   type: DataTypes.STRING,
    //   allowNull: true
    // },
    // car:{
    //   type: DataTypes.STRING,
    //   allowNull: true
    // },
    // independent:{
    //   type: DataTypes.BOOLEAN,
    //   allowNull: true
    // },
    // languages:{
    //   type: DataTypes.STRING,
    //   allowNull: true
    // }
  });
};
