const express = require('express');
const { engine } = require('express-handlebars');
const mysql = require('mysql2');

const app = express();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.render('home');
});

app.post('/books/insertbooks', (req, res) => {
  console.log('Dados recebidos:', req.body);

  const tittle = req.body.tittle;
  const pages = req.body.pages;

  const query = 'INSERT INTO books (tittle, pages) VALUES (?, ?)';
  conn.query(query, [tittle, pages], (err) => { 
    if (err) {
      console.error('Erro ao inserir dados:', err);
      res.status(500).send('Erro ao inserir dados');
      return;
    }
    res.redirect('/');
  });
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