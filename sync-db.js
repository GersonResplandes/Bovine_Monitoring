const sequelize = require("./config/database");
const {
  User,
  Animal,
  HistoricoPesagem,
  HistoricoVacinacao,
} = require("./models");

sequelize
  .sync({ force: true })
  .then(() => {
    console.log("Banco de dados sincronizado com sucesso.");
  })
  .catch((error) => {
    console.error("Erro ao sincronizar o banco de dados:", error);
  });
