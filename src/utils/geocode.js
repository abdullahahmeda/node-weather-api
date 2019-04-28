const request = require('request');

const geocode = (address, callback) => {
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/+' + address + '.json?access_token=pk.eyJ1IjoiYWJkdWxsYWhhaG1lZGEiLCJhIjoiY2p1bzI2YWswMDlnaDQzbWsyMHEyMGdtdiJ9.n8E1n6wZqcsyixgGHNAk8A&limit=1';

  
  request({url, json: true}, (err, {body}) => {
    if(err) {
      return callback('Unable to connect to location services', undefined);
    } else if(body.features.length === 0) {
      return callback('Unable to find lcoation. try another search.', undefined)
    } else {
      return callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name
      });
    }
  })
}

module.exports = geocode;