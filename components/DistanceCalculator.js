import React from 'react';

const DistanceCalculator = ({ userLatitude, userLongitude, castles, maxDistance }) => {
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Promień Ziemi w kilometrach
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Odległość w kilometrach
    return distance;
  };

  const calculateDistanceToCastle = (userLat, userLon, castleLocation) => {
    const [castleLatitude, castleLongitude] = castleLocation.split(',').map(parseFloat);
    return calculateDistance(userLat, userLon, castleLatitude, castleLongitude);
  };

  const filteredCastles = castles.filter((castle) => {
    const distance = calculateDistanceToCastle(
      userLatitude,
      userLongitude,
      castle.castleLocation // Zakładam, że lokalizacja zamku jest w polu "castleLocation"
    );
    return distance <= maxDistance;
  });

  return filteredCastles;
};

export default DistanceCalculator;
