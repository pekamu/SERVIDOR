const express = require("express");
const path = require("path");
const os = require("os");

const app = express();
const PORTA = 80;

// Serve todos os arquivos da pasta "public" (HTML, CSS, JS, imagens)
app.use(express.static(path.join(__dirname, "public")));

// Ao acessar apenas http://<ip>/ abre a Home
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "Home.html"));
});

// Aceita também /Project.html (singular)
app.get(["/Project.html", "/project.html"], (req, res) => {
  res.sendFile(path.join(__dirname, "public", "Projects.html"));
});

// "0.0.0.0" permite acesso de outros computadores da rede
app.listen(PORTA, "0.0.0.0", () => {
  console.log(`Servidor rodando na porta ${PORTA}`);
  console.log("Acesse por um destes endereços:");

  const interfaces = os.networkInterfaces();
  for (const nome in interfaces) {
    for (const info of interfaces[nome]) {
      if (info.family === "IPv4" && !info.internal) {
        console.log(`  http://${info.address}/Home.html`);
        console.log(`  http://${info.address}/Projects.html`);
      }
    }
  }
});