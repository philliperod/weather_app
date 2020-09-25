const express = require('express');
const https = require('https');

const app = express();

app.get('/', (req, res) => {
  const url =
    'https://api.openweathermap.org/data/2.5/weather?appid=3c005018751f1dcc72c1d0f6c2e92f7b&q=Dallas&units=imperial';
  https.get(url, (response) => {
    console.log(response);
  });
  res.send('Server is up and running.');
});
app.listen(3000, () => {
  console.log('Server is running on port 3000.');
});
