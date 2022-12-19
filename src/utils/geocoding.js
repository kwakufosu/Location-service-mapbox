import mbxClient from '@mapbox/mapbox-sdk';
import geocodingClient from '@mapbox/mapbox-sdk/services/geocoding.js';

import dotenv from 'dotenv';
dotenv.config();
const baseClient = mbxClient({ accessToken: process.env.MAPBOX_TOKEN });
const geocodingService = geocodingClient(baseClient);

export const srcGeocode = async (source) => {
  source = source.trim().toUpperCase();

  const result = await geocodingService
    .forwardGeocode({
      query: `${source}`,
      countries: ['GH'],
      limit: 1,
    })
    .send()
    .then((response) => {
      const match = response.body;

      return match.features;
    });

  return result;
};

export const destGeocode = async (dest) => {
  dest = dest.trim().toLowerCase();

  const result = await geocodingService
    .forwardGeocode({
      query: `${dest}`,
      countries: ['GH'],
      limit: 1,
    })
    .send()
    .then((response) => {
      const match = response.body;
      return match.features;
    });

  return result;
};
