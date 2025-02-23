const registerAnimalBtn = document.getElementById("register-animal-btn");
const recordVaccinationBtn = document.getElementById("record-vaccination-btn");
const recordWeightBtn = document.getElementById("record-weight-btn");
const viewAnimalDetailsBtn = document.getElementById("view-animal-details-btn");
const home = document.getElementById("home");
const animalDetailsContainer = document.getElementById(
  "animal-details-container"
);
const animalRegistrationContainer = document.getElementById(
  "animal-registration-container"
);
const weightRecordingContainer = document.getElementById(
  "weight-recording-container"
);
const vaccinationRecordingContainer = document.getElementById(
  "vaccination-recording-container"
);
const dashboard = document.querySelector(".container-dashboard");
function hideAllContainers() {
  animalDetailsContainer.style.display = "none";
  animalRegistrationContainer.style.display = "none";
  weightRecordingContainer.style.display = "none";
  vaccinationRecordingContainer.style.display = "none";
  dashboard.style.display = "grid";
}
// Exibe o contêiner de detalhes do animal
viewAnimalDetailsBtn.addEventListener("click", () => {
  hideAllContainers();
  animalDetailsContainer.style.display = "block";
  dashboard.style.display = "none";
});

// Exibe o contêiner de registro de animal
recordWeightBtn.addEventListener("click", () => {
  hideAllContainers();
  weightRecordingContainer.style.display = "block";
  dashboard.style.display = "none";
});

// Exibe o contêiner de registro de pesagem
recordVaccinationBtn.addEventListener("click", () => {
  hideAllContainers();
  vaccinationRecordingContainer.style.display = "block";
  dashboard.style.display = "none";
});
// Exibe o contêiner de registro de vacinação
registerAnimalBtn.addEventListener("click", () => {
  hideAllContainers();
  animalRegistrationContainer.style.display = "block";
  dashboard.style.display = "none";
});
home.addEventListener("click", () => {
  hideAllContainers();
});
function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("closed");
}
