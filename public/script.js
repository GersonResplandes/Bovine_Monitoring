document
  .getElementById("search-animal-btn")
  .addEventListener("click", async () => {
    const animalId = document.getElementById("animal-id-search").value;

    if (!animalId) {
      alert("Por favor, insira o ID do animal.");
      return;
    }

    try {
      console.log(`/get-animal/${animalId}`);
      const response = await fetch(`/get-animal/${animalId}`);
      if (!response.ok) {
        throw new Error(`Erro ao buscar o animal: ${response.statusText}`);
      }
      const data = await response.json();
      renderPDFView(data);
    } catch (error) {
      console.error("Erro na busca do animal:", error);
      alert(
        "Não foi possível buscar os dados do animal. Verifique o ID e tente novamente."
      );
    }
  });

function renderPDFView(data) {
  window.currentAnimalData = data;
  const container = document.getElementById("animal-info");
  container.innerHTML = `
    <div style="padding: 20px; border: 1px solid #ccc; border-radius: 8px;">
      <p><strong>Código do Animal:</strong> ${data.codigo_animal}</p>
      <p><strong>Data de Nascimento:</strong> ${data.data_nascimento}</p>
      <p><strong>Sexo:</strong> ${data.sexo}</p>
      <p><strong>Raça:</strong> ${data.raca}</p>
      <p><strong>ID do Pai:</strong> ${data.id_pai || "Não informado"}</p>
      <p><strong>ID da Mãe:</strong> ${data.id_mae || "Não informado"}</p>
      <p><strong>Peso:</strong> ${data.peso} ${data.peso_unidade}</p>
      <hr>
      <h4>Histórico de Pesagens</h4>
      ${
        data.HistoricoPesagems && data.HistoricoPesagems.length > 0
          ? data.HistoricoPesagems.map(
              (item) =>
                `<p>${item.data_pesagem} - ${item.peso} ${item.peso_unidade}</p>`
            ).join("")
          : "<p>Sem histórico de pesagens.</p>"
      }
      <hr>
      <h4>Histórico de Vacinações</h4>
      ${
        data.HistoricoVacinacaos && data.HistoricoVacinacaos.length > 0
          ? data.HistoricoVacinacaos.map(
              (item) =>
                `<p>${item.data_vacinacao} - ${item.nome_vacina}${
                  item.proxima_dose
                    ? ` (Próxima dose: ${item.proxima_dose})`
                    : ""
                }</p>`
            ).join("")
          : "<p>Sem histórico de vacinações.</p>"
      }
    </div>
  `;
}
document.addEventListener("DOMContentLoaded", async function () {
  try {
    const response = await fetch("/dashboard-data");
    const data = await response.json();

    // Atualizando totais
    document.getElementById("total-animais").textContent = data.totalAnimais;
    document.getElementById(
      "vacinas-em-dia"
    ).textContent = `${data.percentualVacinas}%`;

    // Gráfico 1: Distribuição de Machos e Fêmeas
    const sexoLabels = data.sexoContagem.map((s) => s.sexo);
    const sexoValores = data.sexoContagem.map((s) => s.quantidade);

    new Chart(document.getElementById("sexo-chart"), {
      type: "pie",
      data: {
        labels: sexoLabels,
        datasets: [
          {
            label: "Quantidade",
            data: sexoValores,
            backgroundColor: ["#3498db", "#e74c3c"],
          },
        ],
      },
    });

    // Gráfico 2: Média de Peso por Raça
    const racaLabels = data.pesoPorRaca.map((r) => r.raca);
    const pesoValores = data.pesoPorRaca.map((r) => r.peso_medio);

    new Chart(document.getElementById("peso-chart"), {
      type: "bar",
      data: {
        labels: racaLabels,
        datasets: [
          {
            label: "Peso Médio (kg)",
            data: pesoValores,
            backgroundColor: "#2ecc71",
          },
        ],
      },
    });

    // Gráfico 3: Evolução do Peso Médio ao Longo do Tempo
    const dataPesagem = data.evolucaoPesagem.map((p) => p.data_pesagem);
    const pesoMedio = data.evolucaoPesagem.map((p) => p.peso_medio);

    new Chart(document.getElementById("pesagem-chart"), {
      type: "line",
      data: {
        labels: dataPesagem,
        datasets: [
          {
            label: "Peso Médio",
            data: pesoMedio,
            borderColor: "#f1c40f",
            fill: false,
          },
        ],
      },
    });

    // Gráfico 4: Quantidade de Vacinas Administradas por Tipo
    const vacinaLabels = data.vacinasPorTipo.map((v) => v.nome_vacina);
    const vacinaValores = data.vacinasPorTipo.map((v) => v.quantidade);

    new Chart(document.getElementById("vacina-chart"), {
      type: "bar",
      data: {
        labels: vacinaLabels,
        datasets: [
          {
            label: "Doses Aplicadas",
            data: vacinaValores,
            backgroundColor: "#9b59b6",
          },
        ],
      },
    });
  } catch (error) {
    console.error("Erro ao carregar os dados do dashboard:", error);
  }
});

document
  .getElementById("animal-registration-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const animalData = {
      codigoAnimal: document.getElementById("animal-id").value,
      birthDate: document.getElementById("birth-date").value,
      gender: document.getElementById("gender").value,
      breed: document.getElementById("breed").value,
      fatherId: document.getElementById("father-id").value || null,
      motherId: document.getElementById("mother-id").value || null,
      weight: parseFloat(document.getElementById("weight").value),
      weightUnit: document.getElementById("weight-unit").value,
    };

    if (
      !animalData.codigoAnimal ||
      !animalData.birthDate ||
      !animalData.gender ||
      !animalData.breed ||
      isNaN(animalData.weight)
    ) {
      alert("Por favor, preencha todos os campos obrigatórios corretamente.");
      return;
    }

    try {
      const response = await fetch("/register-animal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(animalData),
      });

      if (!response.ok) throw new Error("Erro ao cadastrar o animal.");

      alert("Animal cadastrado com sucesso!");
      document.getElementById("animal-registration-form").reset();
    } catch (error) {
      console.error("Erro:", error);
      alert("Não foi possível cadastrar o animal.");
    }
  });

document
  .getElementById("weight-recording-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const weightData = {
      animalId: document.getElementById("animal-id-weight").value,
      weightDate: document.getElementById("weight-date").value,
      recordedWeight: parseFloat(
        document.getElementById("recorded-weight").value
      ),
      weightUnit: document.getElementById("weight-unit-recording").value,
    };

    if (
      !weightData.animalId ||
      !weightData.weightDate ||
      isNaN(weightData.recordedWeight) ||
      weightData.recordedWeight <= 0
    ) {
      alert("Por favor, preencha todos os campos obrigatórios corretamente.");
      return;
    }

    try {
      const response = await fetch("/register-weight", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(weightData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message ||
            "Erro ao registrar a pesagem: " + response.statusText
        );
      }

      alert("Pesagem registrada com sucesso!");

      document.getElementById("weight-recording-form").reset();
    } catch (error) {
      console.error("Erro:", error);
      alert(
        error.message ||
          "Não foi possível registrar a pesagem. Tente novamente."
      );
    }
  });
document
  .getElementById("vaccination-recording-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const vaccinationData = {
      animalId: document.getElementById("animal-id-vaccination").value,
      vaccineName: document.getElementById("vaccine-name").value,
      vaccinationDate: document.getElementById("vaccination-date").value,
      nextDoseDate: document.getElementById("next-dose-date").value || null,
    };

    if (
      !vaccinationData.animalId ||
      !vaccinationData.vaccineName ||
      !vaccinationData.vaccinationDate
    ) {
      alert("Por favor, preencha todos os campos obrigatórios corretamente.");
      return;
    }

    try {
      const response = await fetch("/register-vaccination", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(vaccinationData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message ||
            "Erro ao registrar a vacinação: " + response.statusText
        );
      }

      alert("Vacinação registrada com sucesso!");

      document.getElementById("vaccination-recording-form").reset();
    } catch (error) {
      console.error("Erro:", error);
      alert(
        error.message ||
          "Não foi possível registrar a vacinação. Tente novamente."
      );
    }
  });
