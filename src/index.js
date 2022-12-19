import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config();
import axios from 'axios';
import hbs from 'hbs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import cors from 'cors';
import { srcGeocode, destGeocode } from './utils/geocoding.js';
import coordinates from './utils/coordinates.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const port = process.env.port || 3000;

const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
app.use(cors());

//Templating Engine
app.set('hbs', hbs);
app.set('views', viewsPath);

app.use(express.static(publicDirectoryPath));

app.get('/data', async (req, res) => {
  // if (!req.query.start || req.query.end) {
  //   return res.send({
  //     error: 'You must provide the required info',
  //   });
  // }

  const srcMeridian = await srcGeocode('Tema');

  const { Longitude: srcLongitude, Latitude: srcLatitude } =
    coordinates(srcMeridian);

  const destMeridian = await destGeocode('Spintex');
  const { Longitude: destLongitude, Latitude: destLatitude } =
    coordinates(destMeridian);

  const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${srcLongitude},${srcLatitude};${destLongitude},${destLatitude}?alternatives=false&exclude=ferry&geometries=geojson&language=en&overview=simplified&steps=true&access_token=${process.env.MAPBOX_TOKEN}`;

  try {
    const fetchData = await axios.get(url);
    // console.log(fetchData.data.routes[0].legs[0].steps);
    res.json({
      coordinates: fetchData.data.routes[0].geometry.coordinates,
      steps: fetchData.data.routes[0].legs[0].steps,
    });
  } catch (e) {
    console.log(e);
  }
});

app.get('/map', (req, res) => {
  res.render('main.hbs');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
