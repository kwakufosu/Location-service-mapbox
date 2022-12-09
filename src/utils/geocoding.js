import mbxClient from '@mapbox/mapbox-sdk';
import geocodingClient from '@mapbox/mapbox-sdk/services/geocoding.js';

import dotenv from 'dotenv';
dotenv.config();
const baseClient = mbxClient({ accessToken: process.env.MAPBOX_TOKEN });
const geocodingService = geocodingClient(baseClient);

export const geocode = async (source, dest) => {
  const result = await geocodingService
    .forwardGeocode({
      query: `${source}, ${dest}`,
      countries: ['GH'],
      limit: 2,
    })
    .send()
    .then((response) => {
      const match = response.body;
      return match.features;
    });

  return result;
};
