import { createLogic } from 'redux-logic';

import { elevationChartSetTrackGeojson, elevationChartClose } from 'fm3/actions/elevationChartActions';

export default createLogic({
  type: 'TRACK_TOGGLE_ELEVATION_CHART',
  process({ getState }, dispatch, done) {
    if (getState().elevationChart.trackGeojson) {
      dispatch(elevationChartClose());
    } else {
      // this is bit confusing. TrackViewerMenu.props.trackGeojson is actually a feature set of geojsons
      // (thought typically contains only one geojson),
      // while in ElevationChart.props.trackGeojson we use first "real" feature, e.g. LineString
      dispatch(elevationChartSetTrackGeojson(getState().trackViewer.trackGeojson.features[0]));
    }
    done();
  },
});