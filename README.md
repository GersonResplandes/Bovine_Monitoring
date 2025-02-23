# Bovine Monitoring System 🐄

O **Bovine Monitoring System** é uma aplicação web desenvolvida para o rastreamento e gerenciamento de gado. Com funcionalidades como cadastro de animais, registro de pesagens e vacinações, e um dashboard analítico, o sistema é ideal para produtores rurais que desejam otimizar a gestão do rebanho.

---

## 🌄 Demonstração

### Tela Inicial && Dashboard
![Captura de tela 2025-02-23 152605](https://github.com/user-attachments/assets/4bf78dbb-0d32-4d07-91e4-4aa2e9e425f6)

### Cadastro de Animais
![Captura de tela 2025-02-23 152219](https://github.com/user-attachments/assets/aaf78013-2237-4d60-afe2-c4ac4d3f7b06)

### Visualização Detalhada
![Captura de tela 2025-02-23 152328](https://github.com/user-attachments/assets/986ec8ed-63e3-48d3-b9fe-b30ee62e308f)


---

## 🚀 Funcionalidades

- **Cadastro de Animais**:
  - Registro de informações como código do animal, data de nascimento, sexo, raça, peso e unidade de peso.
  - Relacionamento entre animais (pai e mãe).

- **Histórico de Pesagens**:
  - Registro de pesagens com data, peso e unidade de peso.
  - Relacionamento direto com o animal.

- **Histórico de Vacinações**:
  - Registro de vacinações com nome da vacina, data da vacinação e data da próxima dose.
  - Relacionamento direto com o animal.

- **Dashboard Analítico**:
  - Visualização de métricas como total de animais, percentual de vacinas em dia, distribuição por sexo, média de peso e histórico de pesagens e vacinações por período.

- **Busca de Animais**:
  - Consulta de animais por ID, exibindo informações detalhadas e históricos de pesagens e vacinações.

---

## 🛠️ Tecnologias Utilizadas

- **Backend**:
  - Node.js
  - Express
  - Sequelize (ORM para MySQL)
  - MySQL (Banco de dados)

- **Frontend**:
  - HTML, CSS e JavaScript
  - Fetch API (para comunicação com o backend)

- **Ferramentas**:
  - Dotenv (gerenciamento de variáveis de ambiente)
  - Nodemon (reinício automático do servidor durante o desenvolvimento)

---

## 📚 Como Executar o Projeto

### Pré-requisitos

- Node.js (v16 ou superior)
- MySQL (ou outro banco de dados compatível com Sequelize)
- Git (opcional)

### Passos para Execução

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/GersonScript/Bovine_Monitoring.git
   cd Bovine_Monitoring
   ```
2. **Instale as dependências**:
   ```bash
   npm install
   ```
3. **Configure o banco de dados**:
   - Crie um arquivo `.env` na raiz do projeto e configure as variáveis de ambiente:
     ```env
     DB_HOST=seu_host
     DB_PORT=sua_porta
     DB_USER=seu_usuario
     DB_PASSWORD=sua_senha
     DB_NAME=seu_banco_de_dados
     ```
4. **Sincronize o banco de dados**:
   ```bash
   npm run sync-db
   ```
5. **Inicie o servidor**:
   ```bash
   npm start
   ```
6. **Acesse a aplicação**:
   - Abra o navegador e acesse:
     ```
     http://localhost:3000
     ```

---

## 📛 Licença

Este projeto está licenciado sob a Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0). Para uso comercial, entre em contato com o autor.

---

## 🤝 Como Contribuir

Contribuições são bem-vindas! Siga os passos abaixo:

1. Faça um fork do projeto.
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`).
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`).
4. Faça push para a branch (`git push origin feature/nova-feature`).
5. Abra um Pull Request.

---

## 📞 Contato

- **Nome:** Gérson
- **E-mail:** sagerson@acad.ifma.edu.br
- **GitHub:** [GersonScript](https://github.com/GersonResplandes)

---

