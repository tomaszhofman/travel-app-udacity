const getApiKey = async function () {
  const res = await fetch('http://localhost:9002/api');
  const data = await res.json();

  return data;
};

export { getApiKey };
