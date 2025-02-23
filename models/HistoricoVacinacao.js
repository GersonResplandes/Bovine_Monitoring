const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const HistoricoVacinacao = sequelize.define("HistoricoVacinacao", {
  nome_vacina: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  data_vacinacao: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  proxima_dose: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
});

module.exports = HistoricoVacinacao;
