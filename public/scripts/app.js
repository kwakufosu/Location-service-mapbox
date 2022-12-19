mapboxgl.accessToken = pubKey;
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
    console.log(data)
    //load the route function
    map.on('load', function () {
      map.addSource('route', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: data.coordinates,
          },
        },
      });
      map.addLayer({
        id: 'route',
        type: 'line',
        source: 'route',
        layout: {
          'line-join': 'round',
          'line-cap': 'round',
        },
        paint: {
          'line-color': '#888',
          'line-width': 8,
        },
      });
    });
  })
  .catch((e) => console.log(e));
