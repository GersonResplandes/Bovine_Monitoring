require("dotenv").config();
const sequelize = require("../config/database");
const {
  User,
  Animal,
  HistoricoPesagem,
  HistoricoVacinacao,
} = require("../models");

const seedDatabase = async () => {
  try {
    await sequelize.sync();

    await User.create({
      username: process.env.USER_ADM,
      password: process.env.USER_PASSWORD,
    });

    const animais = [];
    let machosInseridos = 0;

    for (let i = 1; i <= 20; i++) {
      const sexo = machosInseridos < 5 && i % 2 === 0 ? "Macho" : "Fêmea";

      animais.push({
        codigo_animal: `${i.toString().padStart(3, "0")}`,
        data_nascimento: new Date(2020 + i, i % 12, (i % 28) + 1),
        sexo: sexo, // Usa o sexo definido acima
        raca: i % 3 === 0 ? "Nelore" : i % 3 === 1 ? "Angus" : "Brahman",
        peso: 200 + i * 10,
        peso_unidade: "kg",
      });

      if (sexo === "Macho") {
        machosInseridos++;
      }
    }

    await Animal.bulkCreate(animais);
    const pesagens = [];
    for (let i = 1; i <= 20; i++) {
      pesagens.push({
        animal_id: i,
        data_pesagem: new Date(2023, i % 12, (i % 28) + 1),
        peso: 200 + i * 10,
        peso_unidade: "kg",
      });
    }
    await HistoricoPesagem.bulkCreate(pesagens);

    const vacinacoes = [];
    for (let i = 1; i <= 20; i++) {
      vacinacoes.push({
        animal_id: i,
        nome_vacina: i % 2 === 0 ? "Vacina A" : "Vacina B",
        data_vacinacao: new Date(2023, i % 12, (i % 28) + 1),
        proxima_dose: new Date(2024, i % 12, (i % 28) + 1),
      });
    }
    await HistoricoVacinacao.bulkCreate(vacinacoes);

    console.log("Dados iniciais inseridos com sucesso.");
  } catch (error) {
    console.error("Erro ao inserir dados iniciais:", error);
  } finally {
    await sequelize.close();
  }
};

seedDatabase();
