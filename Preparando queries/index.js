const express = require('express');
const { engine } = require('express-handlebars');
const pool = require('./db/conn');

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
  pool.query(query, [tittle, pages], (err) => { 
    if (err) {
      console.error('Erro ao inserir dados:', err);
      res.status(500).send('Erro ao inserir dados');
      return;
    }
    res.redirect('/books');
  });
});

app.get('/books/:id', (req, res) => {
  const id = req.params.id;
  
  const query = 'SELECT * FROM books WHERE idbooks = ?';
  pool.query(query, [id], (err, results) => {
    if (err) {
      console.error('Erro ao buscar dados:', err);
      res.status(500).send('Erro ao buscar dados');
      return;
    }

    if (results.length > 0) {
      res.render('book', { book: results[0] });
    } else {
      res.status(404).send('Livro não encontrado');
    }
  });
});

app.get('/books', (req, res) => {
  const query = 'SELECT * FROM books';  

  pool.query(query, (err, results) => {
    if (err) {
      console.error('Erro ao buscar dados:', err);
      res.status(500).send('Erro ao buscar dados');
      return;
    }

    console.log('Livros encontrados:', results);
    console.log('Exemplo de livro:', results[0] ? {
      idbooks: results[0].idbooks,
      title: results[0].title,
      pages: results[0].pages
    } : 'Nenhum livro encontrado');

    res.render('books', { books: results });
  });
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});