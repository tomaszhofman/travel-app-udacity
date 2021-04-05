export const getWeatherbitData = async (weatherApiKey, daysToGo, lat, lng) => {
  const isFuture = daysToGo < 7 ? 'hourly' : 'daily';
  const res = await fetch(
    `https://api.weatherbit.io/v2.0/forecast/${isFuture}}?lat=${lat}&lon=${lng}&key=${weatherApiKey}`
  );
  const data = await res.json();
  return data;
};

//
