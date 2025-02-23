const Animal = require("./Animal");
const HistoricoPesagem = require("./HistoricoPesagem");
const HistoricoVacinacao = require("./HistoricoVacinacao");
const User = require("./User");

Animal.hasMany(HistoricoPesagem, { foreignKey: "animal_id" });
HistoricoPesagem.belongsTo(Animal, { foreignKey: "animal_id" });

Animal.hasMany(HistoricoVacinacao, { foreignKey: "animal_id" });
HistoricoVacinacao.belongsTo(Animal, { foreignKey: "animal_id" });

Animal.belongsTo(Animal, { as: "Pai", foreignKey: "id_pai" });
Animal.belongsTo(Animal, { as: "Mae", foreignKey: "id_mae" });

module.exports = {
  Animal,
  HistoricoPesagem,
  HistoricoVacinacao,
  User,
};
