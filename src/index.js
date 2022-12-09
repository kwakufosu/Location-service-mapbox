import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import axios from 'axios';
import { geocode } from './utils/geocoding.js';

const app = express();
const port = process.env.port || 3000;

const srcLongitude = -0.09019875;
const srcLatitude = 5.628826512;
const destLongitude = -0.182289882;
const destLatitude = 5.677741181;

const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${srcLongitude},${srcLatitude};${destLongitude},${destLatitude}?alternatives=false&exclude=ferry&geometries=geojson&language=en&overview=simplified&steps=true&access_token=${process.env.MAPBOX_TOKEN}`;

const fetchData = async () => {
  try {
    const response = await axios.get(url);
    console.log(response.data.routes[0].geometry);
  } catch (e) {
    throw new Error(e);
  }
};
const meridians = await geocode('Spintex ', 'Tema ');
const srcMeridian= await meridians.filter((meridian)=> meridian.text=='Spintex')
const destMeridian= await meridians.filter((meridian)=> meridian.text=='Tema')
console.log(destMeridian[0].geometry.coordinates)
//fetchData();

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
