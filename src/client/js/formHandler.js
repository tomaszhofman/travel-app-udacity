import { getApiKey } from './getAPIKey';
import { getGeoData } from './getGeoData';

import dayjs from 'dayjs'; // ES 2015
import { countdown } from '..';
dayjs().format();

const BASE_URL = 'https://api.meaningcloud.com/sentiment-2.1?key=';
const results = document.getElementById('results');
const date = document.getElementById('date');
const gridContainer = document.querySelector('.grid-container');
let formText = document.getElementById('name');

export async function handleSubmit(event) {
  event.preventDefault();
  gridContainer.innerHTML = '';

  try {
    //get keys from express
    const keys = await getApiKey();
    const keyGeoName = await keys.username;
    const WEATHER_KEY = await keys.weatherKey;
    const UNSPLASH_KEY = await keys.unsplashKey;
    console.log(UNSPLASH_KEY);

    //get time and format
    const formatedDate = dayjs(date.value).toDate();
    const daysToGo = Client.countdown(formatedDate);

    const geoNameData = await Client.getGeoData(formText.value, keyGeoName);

    const { lat, lng } = geoNameData.geonames[0];
    const { countryName } = geoNameData.geonames[0];

    //Get weather data
    const weatherbitData = await Client.getWeatherbitData(
      WEATHER_KEY,
      daysToGo,
      lat,
      lng
    );

    const unsplashData = await Client.getUnsplashData(
      countryName,
      UNSPLASH_KEY
    );

    const img = await unsplashData.results[0].urls.small;

    const weatherDataUpcomingDay = {
      hightTemp: weatherbitData.data[0].high_temp,
      lowTemp: weatherbitData.data[0].low_temp,
      desc: weatherbitData.data[0].weather.description,
      icon: weatherbitData.data[0].weather.icon,
      windSpeed: weatherbitData.data[0].wind_gust_spd,
      uv: weatherbitData.data[0].uv,
      precip: weatherbitData.data[0].precip,
    };

    const data = {
      latitude: lat,
      longitude: lng,
      CountryName: countryName,
      leavingDate: daysToGo,
      weatherData: weatherDataUpcomingDay,
      img: img,
    };

    PostData('http://localhost:9002/data', data)
      .then((res) => {
        const fragment = document.createDocumentFragment();
        res.map((item) => {
          const cardContainer = document.createElement('div');
          cardContainer.classList.add('card-container');
          cardContainer.innerHTML = Client.renderHTML(
            item.latitude,
            item.longitude,
            item.CountryName,
            item.leavingDate,
            item.weatherData,
            item.img
          );
          console.log(res);

          fragment.append(cardContainer);
        });
        gridContainer.appendChild(fragment);
      })
      .catch((err) => console.log(err));

    console.log(data);
  } catch (err) {
    console.log(err);
  }

  // check what text was put into the form field
  // results.innerHTML = '';

  // Client.checkForName(formText);

  // const getKey = async function (server) {
  //   try {
  //     const res = await fetch(server);
  //     const data = await res.json();
  //     console.log(data);
  //     return data;
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const getArticle = async function (url) {
  //   try {
  //     const res = await fetch(url);
  //     const data = await res.json();

  //     return data;
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const UpdateUI = async function (item) {
  //   const markup = `
  //   <h2 class="title-secondary">Form Results:</h2>
  //         <div class="grid-container">
  //         <div class="card">
  //             <p class="card__text">
  //                 Model
  //             </p>
  //             <h3 class="card__subtext">
  //                 ${item.model}
  //             </h3>
  //         </div>

  //         <div class="card">
  //             <p class="card__text">
  //                 Confidance
  //             </p>
  //             <h3 class="card__subtext">
  //                 ${item.confidence}

  //             </h3>
  //         </div>

  //         <div class="card">
  //             <p class="card__text">
  //                 Agreement
  //             </p>
  //             <h3 class="card__subtext">
  //                 ${item.agreement}

  //                </h3>
  //         </div>
  //         <div class="card">
  //             <p class="card__text">
  //                 Irony
  //             </p>
  //             <h3 class="card__subtext">
  //                 ${item.irony}

  //             </h3>
  //         </div>

  //     </div>
  //   `;
  //   results.insertAdjacentHTML('afterbegin', markup);
  // };
  // getKey('http://localhost:9002/api').then((res) =>
  //   getArticle(`${BASE_URL}${res.key}&lang=auto&url=${formText}`).then((res) =>
  //     UpdateUI(res)
  //   )
  // );

  // console.log('::: Form Submitted :::');
  // fetch('http://localhost:8081/test')
  //   .then((res) => res.json())
  //   .then(function (res) {
  //     document.getElementById('results').innerHTML = res.message;
  //   });
}

const PostData = async (url, dataCard) => {
  const res = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    // Body data type must match "Content-Type" header
    body: JSON.stringify(dataCard),
  });
  try {
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};
