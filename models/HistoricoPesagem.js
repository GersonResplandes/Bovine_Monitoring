const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const HistoricoPesagem = sequelize.define("HistoricoPesagem", {
  data_pesagem: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  peso: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  peso_unidade: {
    type: DataTypes.ENUM("kg", "arroba"),
    allowNull: false,
  },
});

module.exports = HistoricoPesagem;
