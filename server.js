'use strict';
console.log('server.js is connected');

require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');

const superagent = require('superagent');

const PORT = process.env.PORT;

app.use(cors());
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));

app.get('/', (req,res) => {
  res.send(`Connected on Port: ${PORT}`);
});

function Location(searchedCity, display_name, lat, lon) {
  this.searchedCity = searchedCity;
  this.formatted_query = display_name;
  this.latitude = parseFloat(lat);
  this.longitude = parseFloat(lon);
}

function Weather(weather,valid_date) {
  this.forecast = weather;
  this.time = valid_date;
}

app.get('/location', (request,response) => {
  const apiKey = process.env.GEOCODE_API_KEY;
  const searchedCity = request.query.city;
  const url = `https://us1.locationiq.com/v1/search.php?key=${apiKey}&q=${searchedCity}&format=json`;

  superagent.get(url).then(apiReturned => {
    const returnedLocation = apiReturned.body[0];
    const newLocation = new Location(searchedCity, returnedLocation.display_name, returnedLocation.lat, returnedLocation.lon);
    response.status(200).send(newLocation);
  }).catch(error => {
    response.status(500).send(error);
  })
});


app.get('/weather', (request, response) => {
  const latitude = parseFloat(request.query.latitude);
  const longitude = parseFloat(request.query.longitude);
  const searchedCity = request.query.city;
  const apiKey = process.env.WEATHER_API_KEY;
  const url = `http://api.weatherbit.io/v2.0/forecast/daily`;
  const searchParameters = {
    key:apiKey, city:searchedCity, days:8
  };

  const weatherArr = [];
  superagent.get(url).query(searchParameters).then(returnData => {
    returnData.body.data.map( day => {
      weatherArr.push(new Weather(day.weather.description,day.valid_date));
    })
    response.status(200).send(weatherArray);
  }).catch(error => {
    response.status(500).send('There was an error');
  })
});

app.use('*', (req,res) => {
  res.status(500).send('Status: 500<br> Server has error');
});
