import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Circle, Marker } from 'react-leaflet';

function LocationResult({ gpsLocation }) {
  return gpsLocation ? (
    <div>
      <Circle center={L.latLng(gpsLocation.lat, gpsLocation.lon)} radius={gpsLocation.accuracy / 2} />
      <Marker position={L.latLng(gpsLocation.lat, gpsLocation.lon)} />
    </div>
  ) : null;
}

LocationResult.propTypes = {
  gpsLocation: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lon: PropTypes.number.isRequired,
    accuracy: PropTypes.number.isRequired,
  }),
};

export default connect(
  state => ({
    gpsLocation: state.main.location,
  }),
)(LocationResult);
