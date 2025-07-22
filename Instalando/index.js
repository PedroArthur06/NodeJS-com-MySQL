const express = require('express');
const { engine } = require('express-handlebars');
const mysql = require('mysql2');

const app = express();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('home');
});

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'PedroMari19@',
  database: 'nodemysql'
});

conn.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conectado ao banco de dados MySQL!');
  app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
  });
});