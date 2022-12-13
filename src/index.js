import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config();
import axios from 'axios';
import { srcGeocode, destGeocode } from './utils/geocoding.js';
import hbs from 'hbs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import cors from 'cors';

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

// const srcMeridian = await srcGeocode('spintex');
// const [srcLongitude, srcLatitude] = srcMeridian[0].geometry.coordinates;

// const destMeridian = await destGeocode('Tema');
// const [destLongitude, destLatitude] = destMeridian[0].geometry.coordinates;

// const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${srcLongitude},${srcLatitude};${destLongitude},${destLatitude}?alternatives=false&exclude=ferry&geometries=geojson&language=en&overview=simplified&steps=true&access_token=${process.env.MAPBOX_TOKEN}`;

// const fetchData = await axios.get(url);

app.get('/data', async (req, res) => {
  // if (!req.query.start || req.query.end) {
  //   return res.send({
  //     error: 'You must provide the required info',
  //   });
  // }

  const srcMeridian = await srcGeocode('Tema');
  const [srcLongitude, srcLatitude] = srcMeridian[0].geometry.coordinates;

  const destMeridian = await destGeocode('Spintex');
  const [destLongitude, destLatitude] = destMeridian[0].geometry.coordinates;

  const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${srcLongitude},${srcLatitude};${destLongitude},${destLatitude}?alternatives=false&exclude=ferry&geometries=geojson&language=en&overview=simplified&steps=true&access_token=${process.env.MAPBOX_TOKEN}`;

  try {
    const fetchData = await axios.get(url);
    //console.log(fetchData.data.routes[0].geometry.coordinates);
    res.json(fetchData.data.routes[0].geometry.coordinates);
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
