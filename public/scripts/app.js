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
    map.flyTo({
      center: data.coordinates[0],
      essential: true, // this animation is considered essential with respect to prefers-reduced-motion
    });
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
      // get the sidebar and add the instructions
      const instructions = document.getElementById('instructions');
      const steps = data.steps;

      let tripInstructions = '';
      for (const step of steps) {
        tripInstructions += `<li>${step.maneuver.instruction}</li>`;
      }
      instructions.innerHTML = `<p><strong>Trip duration: ${Math.floor(
        data.duration / 60
      )} min 🚘 </strong></p><ol>${tripInstructions}</ol>`;
    });
  })
  .catch((e) => console.log(e));
