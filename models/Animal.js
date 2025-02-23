const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Animal = sequelize.define("Animal", {
  codigo_animal: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  data_nascimento: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  sexo: {
    type: DataTypes.ENUM("Macho", "Fêmea"),
    allowNull: false,
  },
  raca: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  id_pai: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  id_mae: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  peso: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
  peso_unidade: {
    type: DataTypes.ENUM("kg", "arroba"),
    allowNull: true,
  },
});

module.exports = Animal;
