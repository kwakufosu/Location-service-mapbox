const express = require('express');
require('dotenv').config();
const axios = require('axios');
const geocode = require('./utils/geocoding');
const app = express();
const port = process.env.port || 3000;

srcLongitude = -0.09019875;
srcLatitude = 5.628826512;
destLongitude = -0.182289882;
destLatitude = 5.677741181;

const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${srcLongitude},${srcLatitude};${destLongitude},${destLatitude}?alternatives=false&exclude=ferry&geometries=geojson&language=en&overview=simplified&steps=true&access_token=${process.env.MAPBOX_TOKEN}`;

const fetchData = async () => {
  try {
    const response = await axios.get(url);
    console.log(response.data.routes[0].geometry);
  } catch (e) {
    throw new Error(e);
  }
};
geocode();
fetchData();

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
