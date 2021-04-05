export async function getGeoData(country, username) {
  const res = await fetch(
    `http://api.geonames.org/searchJSON?q=${country}&maxRows=1&username=${username}`
  );
  const data = await res.json();
  return data;
}
