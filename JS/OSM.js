const OSM_GEOCODE_ENDPOINT = "https://nominatim.openstreetmap.org/search?format=json&polygon=1&addressdetails=1&q=";

const osmGeocode = query => {
  fetch(`${OSM_GEOCODE_ENDPOINT}query`).then(response => {
    console.log(response.data);
  });
};
