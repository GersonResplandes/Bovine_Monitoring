require("dotenv").config();
const express = require("express");
const path = require("path");
const {
  Animal,
  HistoricoPesagem,
  HistoricoVacinacao,
  User,
} = require("./models");
const { Op, Sequelize } = require("sequelize");

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Rota de login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Usuário e senha são obrigatórios" });
  }

  try {
    const user = await User.findOne({ where: { username, password } });
    if (user) {
      res.sendFile(path.join(__dirname, "/public/pages/main.html"));
    } else {
      res.status(401).json({ error: "Usuário ou senha incorretos!" });
    }
  } catch (error) {
    console.error("Erro na consulta ao banco de dados:", error);
    res.status(500).json({ error: "Erro no servidor" });
  }
});
app.get("/dashboard-data", async (req, res) => {
  try {
    const totalAnimais = await Animal.count();

    const sexoContagem = await Animal.findAll({
      attributes: [
        "sexo",
        [Sequelize.fn("COUNT", Sequelize.col("sexo")), "quantidade"],
      ],
      group: ["sexo"],
    });

    const pesoPorRaca = await Animal.findAll({
      attributes: [
        "raca",
        [Sequelize.fn("AVG", Sequelize.col("peso")), "peso_medio"],
      ],
      group: ["raca"],
    });

    const evolucaoPesagem = await HistoricoPesagem.findAll({
      attributes: [
        "data_pesagem",
        [Sequelize.fn("AVG", Sequelize.col("peso")), "peso_medio"],
      ],
      group: ["data_pesagem"],
      order: [["data_pesagem", "ASC"]],
    });

    const vacinasPorTipo = await HistoricoVacinacao.findAll({
      attributes: [
        "nome_vacina",
        [Sequelize.fn("COUNT", Sequelize.col("nome_vacina")), "quantidade"],
      ],
      group: ["nome_vacina"],
    });

    const totalVacinacoes = await HistoricoVacinacao.count();
    const vacinasEmDia = await HistoricoVacinacao.count({
      where: {
        proxima_dose: { [Op.gte]: new Date() },
      },
    });
    const percentualVacinas =
      totalVacinacoes > 0
        ? ((vacinasEmDia / totalVacinacoes) * 100).toFixed(2)
        : 0;

    res.json({
      totalAnimais,
      sexoContagem,
      pesoPorRaca,
      evolucaoPesagem,
      vacinasPorTipo,
      percentualVacinas,
    });
  } catch (error) {
    console.error("Erro ao buscar dados do dashboard:", error);
    res.status(500).json({ error: "Erro ao buscar dados do dashboard" });
  }
});
// Rota para buscar um animal pelo ID
app.get("/get-animal/:id", async (req, res) => {
  const animalId = req.params.id;

  try {
    const animal = await Animal.findByPk(animalId, {
      include: [
        { model: HistoricoPesagem, as: "HistoricoPesagems" },
        { model: HistoricoVacinacao, as: "HistoricoVacinacaos" },
      ],
    });

    if (!animal) {
      return res.status(404).json({ error: "Animal não encontrado." });
    }

    res.json(animal);
  } catch (error) {
    console.error("Erro ao buscar animal:", error);
    res.status(500).json({ error: "Erro no servidor." });
  }
});

// Rota para registrar um animal
app.post("/register-animal", async (req, res) => {
  const {
    codigoAnimal,
    birthDate,
    gender,
    breed,
    fatherId,
    motherId,
    weight,
    weightUnit,
  } = req.body;

  if (!codigoAnimal || !birthDate || !gender || !breed || isNaN(weight)) {
    return res
      .status(400)
      .json({ error: "Todos os campos obrigatórios devem ser preenchidos." });
  }

  try {
    const animal = await Animal.create({
      codigo_animal: codigoAnimal,
      data_nascimento: birthDate,
      sexo: gender,
      raca: breed,
      id_pai: fatherId || null,
      id_mae: motherId || null,
      peso: weight,
      peso_unidade: weightUnit,
    });

    res.status(201).json({
      message: "Animal cadastrado com sucesso!",
      id: animal.id,
    });
  } catch (error) {
    console.error("Erro ao cadastrar animal:", error);
    res.status(500).json({ error: "Erro ao cadastrar animal." });
  }
});

// Rota para registrar uma pesagem
app.post("/register-weight", async (req, res) => {
  const { animalId, weightDate, recordedWeight, weightUnit } = req.body;

  if (!animalId || !weightDate || !recordedWeight || !weightUnit) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios." });
  }

  try {
    const pesagem = await HistoricoPesagem.create({
      animal_id: animalId,
      data_pesagem: weightDate,
      peso: recordedWeight,
      peso_unidade: weightUnit,
    });

    res.status(201).json({
      message: "Pesagem registrada com sucesso!",
      id: pesagem.id,
    });
  } catch (error) {
    console.error("Erro ao registrar pesagem:", error);
    res
      .status(500)
      .json({ error: "Erro ao registrar pesagem no banco de dados." });
  }
});

// Rota para registrar uma vacinação
app.post("/register-vaccination", async (req, res) => {
  const { animalId, vaccineName, vaccinationDate, nextDoseDate } = req.body;

  if (!animalId || !vaccineName || !vaccinationDate) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios." });
  }

  try {
    const vacinacao = await HistoricoVacinacao.create({
      animal_id: animalId,
      nome_vacina: vaccineName,
      data_vacinacao: vaccinationDate,
      proxima_dose: nextDoseDate || null,
    });

    res.status(201).json({
      message: "Vacinação registrada com sucesso!",
      id: vacinacao.id,
    });
  } catch (error) {
    console.error("Erro ao registrar vacinação:", error);
    res
      .status(500)
      .json({ error: "Erro ao registrar vacinação no banco de dados." });
  }
});

// Inicializando o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
