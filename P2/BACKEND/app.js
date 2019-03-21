// Bibliotecas...
const express = require('express');
const consign = require('consign') // Carrega multiplos modulos sem necessidade de recarregar importacoes...
const cors = require('cors') // Lida com "apontador" de endpoints

// Construindo uma instância de Express
const app = express();

// Configurando parametros de conexao (tratamentos de requisicioes)
let port = 1337

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())

// Linkando modulos...
consign()
  .include('./routes')
  .into(app)

// Iniciando o servidor!
app.listen(port, () => {
  console.log(`Server started at ${port}`)
})