// prepare src/cities.json

const { writeFileSync } = require('fs');

const citiesIn = require('./cities.json');

const citiesOut = citiesIn.map((city) => {
  return `${city.CityId}:${city.City}`;
});

writeFileSync('./src/cities.json', JSON.stringify(citiesOut));
