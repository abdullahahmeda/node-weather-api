const weatherForm = document.querySelector('.location-form'),
      search      = document.querySelector('.location-form__input');

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  document.querySelector('.location-form__button').disabled = true;
  document.querySelector('.location').textContent = 'Loading...';
  fetch('http://localhost:3000/weather?address=' + search.value).then(response => {
    document.querySelector('.location-form__button').disabled = false;
    response.json().then(data => {
      if(data.error) {
        document.querySelector('.location').textContent = '';
        document.querySelector('.result--error').textContent = data.error;
        document.querySelector('.result--success').textContent = '';
      } else {
        document.querySelector('.location').textContent = data.location;
        document.querySelector('.result--success').textContent = data.forecast;
        document.querySelector('.result--error').textContent = '';
      }
    })
  }).catch(error => {
    console.log(error);
  })
})