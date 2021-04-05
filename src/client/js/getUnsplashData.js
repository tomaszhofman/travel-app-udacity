export const getUnsplashData = async (countryName, key) => {
  const res = await fetch(
    `https://api.unsplash.com/search/photos?query=${countryName}&client_id=${key}`
  );
  const data = await res.json();
  return data;
};
