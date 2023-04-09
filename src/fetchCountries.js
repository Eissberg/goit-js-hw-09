const options = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
  },
};

const searchParams = new URLSearchParams({
  fields: 'name,capital,population,flags,languages',
});

const fetchCountries = name => {
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?${searchParams}`,
    options
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
};

export { fetchCountries };
