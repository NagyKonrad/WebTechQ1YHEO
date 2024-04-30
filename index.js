const express = require('express'); //Import
const path = require('path');   //Import

const app = express(); //Webszerver létrehozása

app.use(express.static(path.join(__dirname, 'public'))); //public mappát elérhetővé teszem

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html')); //index.html-t adja vissza
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);     // 3000-es porton elindul a szerver
});