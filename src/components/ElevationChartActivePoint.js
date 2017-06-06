import React from 'react';
import { connect } from 'react-redux';
import { Tooltip } from 'react-leaflet';

import MarkerWithInnerLabel from 'fm3/components/leaflet/MarkerWithInnerLabel';
import * as FmPropTypes from 'fm3/propTypes';

function ElevationChartActivePoint({ elevationChartActivePoint }) {
  return (
    elevationChartActivePoint.lat &&
      <MarkerWithInnerLabel
        faIcon="info"
        faIconLeftPadding="2px"
        color="grey"
        interactive={false}
        position={L.latLng(elevationChartActivePoint.lat, elevationChartActivePoint.lon)}
      >
        <Tooltip className="compact" offset={new L.Point(9, -25)} direction="right" permanent>
          <span>
            {(elevationChartActivePoint.distanceFromStartInMeters / 1000).toFixed(1)}km, {elevationChartActivePoint.ele.toFixed(0)} m.n.m
          </span>
        </Tooltip>
      </MarkerWithInnerLabel>
  );
}

ElevationChartActivePoint.propTypes = {
  elevationChartActivePoint: FmPropTypes.elevationChartProfilePoint,
};

export default connect(
  state => ({
    elevationChartActivePoint: state.elevationChart.activePoint,
  }),
)(ElevationChartActivePoint);