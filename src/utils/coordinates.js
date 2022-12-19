const coordinates = (Meridian) => {
  const [Longitude, Latitude] = Meridian[0].geometry.coordinates;

  return { Longitude, Latitude };
};

export default coordinates;
