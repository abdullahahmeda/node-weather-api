const path = require('path');
const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;


const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views')

app.set('view engine', 'pug');
app.set('views', viewsPath);
app.use(express.static(publicDirPath))

app.get('/', (request, response) => {
  response.render('index', {
    title: 'Weather app',
    name: 'Abdullah Ahmed'
  });
});

app.get('/products', (request, response) => {
  if(!request.query.search) {
    return response.send({
      error: 'You must provide a search term'
    })
  }
  console.log(request.query.search)
  response.send({
    products: []
  });
  
})

app.get('/help', (request, response) => {
  response.render('help', {
    title: 'Help',
    helpText: 'Some helpful text'
  })
});

app.get('/about', (request, response) => {
  response.render('about', {
    title: 'About Me',
    name: 'Abdullah Ahmed'
  });
});

app.get('/weather', (request, response) => {
  const address = request.query.address;
  if(!address) {
    return response.send({
      error: 'Please provide an address.'
    })
  }
  geocode(address, (err, {latitude, longitude, location} = {}) => {
    if(err) {
      return response.send({error: err});
    }
    forecast(latitude, longitude, (err, forecastData) => {
      if(err) return response.send({error: err});
        return response.send({
        forecast: forecastData,
        location,
        address: address
      });
    });
  })
});

app.get('/help/*', (request, response) => {
  response.render('404', {
    err_msg: 'Help Article not found'
  });
})

app.get('*', (request, response) => {
  response.render('404', {
    err_msg: 'Page not Found'
  });
})

app.listen(PORT, () => {
  console.log('The server is running')
});