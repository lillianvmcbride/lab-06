'use strict';
console.log('server.js is connected');

require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const {respons} = require('express');

const PORT = process.env.PORT || 3000;

app.use(express.static('/public'));
app.use(cors());
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));

function Location(searchedCity, display_name, lat, lon) {
  this.searchedCity = searchedCity;
  this.formatted_query = display_name;
  this.latitude = parseFloat(lat);
  this.longitude = parseFloat(lon);
}

app.get('/location', (request,response) => {
  const locationDataArray = require('./data/location.json');
  const dataObject = locationDataArray[0];
  const searchedCity = request.query.city;

  const newLocation = new Location(searchedCity, 
    dataObject.display_name,
    dataObject.lat,
    dataObject.lon);

  response.send(newLocation);
});

function Weather(weather,valid_date) {
  this.forecast = weather;
  this.time = valid_date;
}

app.get('/weather', (request, response) => {
  const weatherDataArray = require('./data/weather.json');
  const dataObject = weatherDataArray.data[0];

  const newWeather = new Weather(dataObject.weather.description,dataObject.valid_date);
  response.send(newWeather);
});

//default error reporting
app.use('*', (request, response) => {
  response.send('Invalid request, something went wrong.');
});
