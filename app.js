const express = require('express');
const https = require('https'); // require a http node module to get a http get request
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
  // to respond back to the client's request with the index.html, you must use res.sendFile()
});

app.post('/', (req, res) => {
  const query = req.body.cityName;
  const apiKey = '3c005018751f1dcc72c1d0f6c2e92f7b';
  const unit = 'imperial';
  const url = 'https://api.openweathermap.org/data/2.5/weather?appid=' + apiKey + '&q=' + query + '&units=' + unit;
  https.get(url, (response) => {
    console.log(response.statusCode);
    response.on('data', (data) => {
      //   const object = {
      //     name: 'Phillipe',
      //     favoriteDrink: 'water'
      //   };
      //   JSON.stringify(object);
      //   console.log(object);
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const weatherIcon = weatherData.weather[0].icon;
      const imageURL = 'http://openweathermap.org/img/wn/' + weatherIcon + '@2x.png';
      res.write('<p>The temperature for ' + query + ' is ' + temp + ' degrees Farenheit.</p>');
      res.write('<p>The weather outside looks about ' + weatherDescription + ' at the moment.</p>');
      res.write('<img src=' + imageURL + '>');
      res.send();
    });
  });
});

// this will perform a get request across the internet using the http protocol
// (https.get) pass the variable url (which is an actual url) and once receive a response back then log the status code
// [response.on('data', (data) {}] in addition, you can tap into the reaponse and convert it into a javascript object and respond back with that
// JSON.parse() will convert the response into a javascript object
// JSON.stringify() will convert the object into a string or opposit of JSON.parse()
// if you wanted to obtain a certain piece of data in a object, you use object-oriented javascript code
// if an object has a string(it's an array with one item) for its value and you want to specify index value then object
// to pass the data back with app.get, you have to use the response [app.get('/', (req, RES))]; the response is from our server that is sent to the user
// to send multiple responses you can use res.write() then use res.send() as a standalone function to send out the multiple responses
// to send an image, store the object into a variable, find the API URL that is needed and concatenate the variable in the right location for a new variable
// use res.write with a <img> tag and concatenate with the new variable in the src attribute
app.listen(3000, () => {
  console.log('Server is running on port 3000.');
});
