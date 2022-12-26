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

//global  variables
let field1, field2;
//Parsing middleware
app.use(express.urlencoded({ extended: true }));

//Parse application as JSON
app.use(express.json());
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
app.use(cors());

//Templating Engine
app.set('hbs', hbs);
app.set('views', viewsPath);

app.use(express.static(publicDirectoryPath));

app.get('/data', async (req, res) => {
  const srcMeridian = await srcGeocode(field1);

  const { Longitude: srcLongitude, Latitude: srcLatitude } =
    coordinates(srcMeridian);

  const destMeridian = await destGeocode(field2);
  const { Longitude: destLongitude, Latitude: destLatitude } =
    coordinates(destMeridian);

  const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${srcLongitude},${srcLatitude};${destLongitude},${destLatitude}?alternatives=false&exclude=ferry&geometries=geojson&language=en&overview=simplified&steps=true&access_token=${process.env.MAPBOX_TOKEN}`;

  try {
    const fetchData = await axios.get(url);
    // console.log(fetchData.data);
    res.json({
      coordinates: fetchData.data.routes[0].geometry.coordinates,
      steps: fetchData.data.routes[0].legs[0].steps,
      duration: fetchData.data.routes[0].duration,
    });
  } catch (e) {
    console.log(e);
  }
});

app.get('/map', (req, res) => {
  field1 = req.query.field1;
  field2 = req.query.field2;
  res.render('main.hbs');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
