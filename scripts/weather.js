// select HTML elements in the document
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');

// OpenWeatherMap API URL with parameters
const url = 'https://api.openweathermap.org/data/2.5/weather?lat=49.749992&lon=6.637143&units=metric&appid=[a1d8907755d9924c819d1f7bf6207704]';

// Asynchronous function to fetch data from OpenWeatherMap
async function apiFetch() {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      console.log(data); // testing only
      displayResults(data); // uncomment to display on page
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.log(error);
  }
}

// Function to display fetched data on the page
function displayResults(data) {
  // Update the temperature
  currentTemp.innerHTML = `${data.main.temp}&deg;C`;
  
  // Update the weather icon
  const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
  let desc = data.weather[0].description;
  weatherIcon.setAttribute('src', iconsrc);
  weatherIcon.setAttribute('alt', desc);

  // Update the caption description
  captionDesc.textContent = `${desc}`;
}

// Invoke the API fetch function
apiFetch();
