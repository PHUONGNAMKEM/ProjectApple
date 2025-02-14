const express = require('express')
const path = require('path');

const app = express()
const port = 8081

// config template engine
app.set('views', path.join(__dirname, 'views')); // chỉ định folder chứa các view cần thiết, không sử dụng đường dẫn tương đối để tránh sai đường dẫn -> tuyệt đối
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  res.send('Hello World!')
  // res.status(404).send('Not Found');
  // res.json({ message: 'Hello World!' });
})

app.get('/api', (req, res) => {
  res.send('<h1 style="color:red; text-align:center">Call API</h1>');
})

app.get('/iFanIT', (req, res) => {
  res.render('sample.ejs');
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})