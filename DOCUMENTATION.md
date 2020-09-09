#### fetchPresentForecast(optns)

Fetch present forecast of a given city

##### Parameters

| Name       | Type     | Description     |        |
| ---------- | -------- | --------------- | ------ |
| optns      | `object` | Valid options   | &nbsp; |
| optns.city | `string` | Valid city name | &nbsp; |

##### Examples

```javascript

const optns = { city : 'Dar Es Salaam' };
fetchPresentForecast(optns)
  .then(forecast => { ... }) //=> { weather: 'Light Rain', ... }
  .catch(error => { ... });
```

##### Returns

- `Promise` promise resolve with present forecast on success or error on failure.

#### fetchWeekForecasts(optns)

Fetch week forecasts of a given city

##### Parameters

| Name       | Type     | Description     |        |
| ---------- | -------- | --------------- | ------ |
| optns      | `object` | Valid options   | &nbsp; |
| optns.city | `string` | Valid city name | &nbsp; |

##### Examples

```javascript

const optns = { city : 'Dar Es Salaam' };
fetchWeekForecasts(optns)
  .then(forecasts => { ... }) //=> [{ weather: 'Light Rain', ... }, ... ]
  .catch(error => { ... });
```

##### Returns

- `Promise` promise resolve with week forecasts on success or error on failure.

#### fetchForecasts(optns)

Fetch present and week forecasts of a given city

##### Parameters

| Name       | Type     | Description     |        |
| ---------- | -------- | --------------- | ------ |
| optns      | `object` | Valid options   | &nbsp; |
| optns.city | `string` | Valid city name | &nbsp; |

##### Examples

```javascript

const optns = { city : 'Dar Es Salaam' };
fetchForecasts(optns)
  .then(forecasts => { ... }) //=> [{ weather: 'Light Rain', ... }, ... ]
  .catch(error => { ... });
```

##### Returns

- `Promise` promise resolve with forecasts on success or error on failure.

_Documentation generated with [doxdox](https://github.com/neogeek/doxdox)._
