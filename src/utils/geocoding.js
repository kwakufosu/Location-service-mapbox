const mbxClient = require('@mapbox/mapbox-sdk');
const geocodingClient = require('@mapbox/mapbox-sdk/services/geocoding');

require('dotenv').config();
const baseClient = mbxClient({ accessToken: process.env.MAPBOX_TOKEN });
const geocodingService = geocodingClient(baseClient);

//const geocodingUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json?proximity=ip&types=place%2Cpostcode%2Caddress&access_token=${process.env.MAPBOX_TOKEN}`;
const geocode = async () => {
  geocodingService
    .forwardGeocode({
      query: 'Paris, France',
      limit: 2,
    })
    .send()
    .then((response) => {
      const match = response.body;
      console.log(match);
      return match;
    });
};

module.exports = geocode;
