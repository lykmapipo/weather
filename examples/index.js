import { fetchForecasts } from '../src';

const optns = { city: 'Dar Es Salaam' };
fetchForecasts(optns)
  .then((forecasts) => {
    console.log(forecasts);
  })
  .catch((error) => {
    console.log(error);
  });
