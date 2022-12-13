

mapboxgl.accessToken =pubKey;
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v12',
  center: [-0.1945831, 5.6513286], // starting position
  zoom: 12,
});

fetch('http://localhost:3000/data')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    const allPoints = data.map((point) => ({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: point,
      },
    }));
    

    //load the route function
    map.on('load', function () {
      console.log('Fe')
      getRoute();

    });

    //get route takes start and end (lat,long)
    function getRoute() {
      
      map.addLayer({
        id: 'path',
        type: 'circle',
        source: {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: allPoints,
          },
        },
      });
    }
  })
  .catch((e) => console.log(e));
