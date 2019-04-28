const request = require('request');

const forecast = (latitude, longitude, callback) => {
  request({url: 'https://api.darksky.net/forecast/1e2f31aeed2f62f9321d8dd1528fb604/' + latitude + ',' + longitude + '?units=si&', json: true}, (err, {body}) => {
    if(err) {
      return callback('Unable to connect to forecasting services', undefined)
    } else if(body.error) {
      return callback('Unable to get the forecast', undefined)
    } else {
      return callback(undefined, `${body.daily.data[0].summary} It's currently ${body.currently.temperature} and there's a ${body.currently.precipProbability}% to rain.`)
    }
  })
}

module.exports = forecast;