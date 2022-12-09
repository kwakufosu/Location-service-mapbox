import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import axios from 'axios';
import { srcGeocode, destGeocode } from './utils/geocoding.js';

const app = express();
const port = process.env.port || 3000;

const srcMeridian = await srcGeocode('spintex');
const [srcLongitude, srcLatitude] = srcMeridian[0].geometry.coordinates;

const destMeridian = await destGeocode('Tema');
const [destLongitude, destLatitude] = destMeridian[0].geometry.coordinates;

const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${srcLongitude},${srcLatitude};${destLongitude},${destLatitude}?alternatives=false&exclude=ferry&geometries=geojson&language=en&overview=simplified&steps=true&access_token=${process.env.MAPBOX_TOKEN}`;

// const fetchData = async () => {
//   try {
//     const response = await axios.get(url);
//       } catch (e) {
//     throw new Error(e);
//   }
// };

// fetchData();
const fetchData= await axios.get(url)
console.log(fetchData)

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
