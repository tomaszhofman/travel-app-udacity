export const renderHTML = (
  latitude,
  longitude,
  CountryName,
  leavingDate,
  weatherData,
  img

  //   desc: "Broken clouds"
  // hightTemp: 23.9
  // icon: "c03d"
  // lowTemp: 13.8
  // precip: 0
  // uv: 4.6882334
  // windSpeed: 7.6015625
) => {
  return `
    <div class="card">
    <div
      style="
        background-image: url(${img});
      "
      class="card__header"
    >
      <h4 class="country">${CountryName}</h4>
    </div>
    <div class="card__main">
      <div>
        <div class="flex">
          <img
            src="https://www.weatherbit.io/static/img/icons/${weatherData.icon}.png"
          />
          <span class="w-title">${weatherData.hightTemp}°</span>
        </div> 

        <p class="card-text">
          Cloudy with scattered showers
          <br />
          ${weatherData.windSpeed} MPH winds
        </p>
      </div>
      <div class="card__main-sunrise">
        <div class="flex mb-10">
          <i
            class="fas fa-smog"
            style="font-size: 14px; margin-right: 6px; color: grey"
          ></i>
          <p>
            <span class="mr-5 font-bold">${weatherData.uv}</span
            ><span class="text-gray text-sm">UV</span>
          </p>
        </div>
        <div class="flex mb-10">
          <i
            class="fas fa-cloud-rain"
            style="font-size: 14px; margin-right: 6px; color: grey"
          ></i>
          <p>
            <span class="font-bold mr-5">${weatherData.precip}%</span
            ><span class="text-sm text-gray">Precip</span>
          </p>
        </div>
      </div>
    </div>

    <div class="card__footer">
      <div class="card__footer-item">
        <p>
          <span class="text-gray text-sm mr-5">Days to Trip:</span>
          <span class="font-bold">${leavingDate} </span>
        </p>
      </div>
    </div>
  </div>`;
};
