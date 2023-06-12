const express = require('express');
const app = express();
const PORT = process.env.PORT;
const Tesseract = require('tesseract.js');
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/ssd', (req, res) => {

    const img1 = req.query.k;
     Tesseract.recognize(
        // this first argument is for the location of an image it can be a //url like below or you can set a local path in your computer
        img1,
        // this second argument is for the laguage 
        'eng',
        { logger: m => console.log(m) }
        ).then(({ data: { text } }) => {
        res.send(text);
        })

        
});

app.listen(PORT, () => {
    console.warn(`App listening on http://localhost:${PORT}`);
  });
/*fs.readFile(__dirname + '/' + 'movies.json', 'utf8', (err, data) => {
        res.send(data);
    });*/