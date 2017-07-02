import queryString from 'query-string';

import { getMapStateFromUrl, getMapStateDiffFromUrl } from 'fm3/urlMapUtils';
import { getTrasformedParamsIfIsOldEmbeddedFreemapUrl, getInfoPointDetailsIfIsOldEmbeddedFreemapUrlFormat2 } from 'fm3/oldFreemapUtils';

import { setEmbeddedMode } from 'fm3/actions/mainActions';
import { mapRefocus } from 'fm3/actions/mapActions';
import { routePlannerSetParams } from 'fm3/actions/routePlannerActions';
import { trackViewerDownloadTrack } from 'fm3/actions/trackViewerActions';
import { infoPointAdd, infoPointChangeLabel } from 'fm3/actions/infoPointActions';

export default function handleLocationChange(store, location) {
  const query = queryString.parse(location.search);

  if (/car|walk|bicycle/.test(query.transport) && /^\d+(\.\d+)?\/\d+(\.\d+)?(,\d+(\.\d+)?\/\d+(\.\d+)?)+$/.test(query.points)) {
    const points = query.points.split(',').map(point => point.split('/').map(coord => parseFloat(coord)));

    const { start, finish, midpoints, transportType } = store.getState().routePlanner;

    if (points.length > 1 && points.every(point => point.length === 2)) {
      const latLons = points.map(([lat, lon]) => ({ lat, lon }));
      const nextStart = latLons[0];
      const nextMidpoints = latLons.slice(1, latLons.length - 1);
      const nextFinish = latLons[latLons.length - 1];
      if (query.transport !== transportType
          || !latLonEquals(start, nextStart)
          || !latLonEquals(finish, nextFinish)
          || midpoints.length !== nextMidpoints.length
          || midpoints.some((midpoint, i) => !latLonEquals(midpoint, nextMidpoints[i]))) {
        store.dispatch(routePlannerSetParams(nextStart, nextFinish, nextMidpoints, query.transport));
      }
    }
  }

  const trackUID = query['track-uid'];
  if (trackUID && store.getState().trackViewer.trackUID !== trackUID) {
    store.dispatch(trackViewerDownloadTrack(trackUID));
  }

  const ipLat = query['info-point-lat'];
  const ipLon = query['info-point-lon'];
  if (ipLat && ipLon) {
    const lat = parseFloat(ipLat);
    const lon = parseFloat(ipLon);
    if (!isNaN(lat) && !isNaN(lon)) {
      store.dispatch(infoPointAdd(lat, lon, query['info-point-label']));
    }
  }

  if (query.image) {
    // TODO
  }

  if (query.embed === 'true') {
    store.dispatch(setEmbeddedMode());
  }

  if (getTrasformedParamsIfIsOldEmbeddedFreemapUrl(location)) {
    const { lat, lon } = getTrasformedParamsIfIsOldEmbeddedFreemapUrl(location);
    store.dispatch(setEmbeddedMode());
    store.dispatch(infoPointAdd(lat, lon));
  }

  if (getInfoPointDetailsIfIsOldEmbeddedFreemapUrlFormat2(location)) {
    const { lat, lon, label } = getInfoPointDetailsIfIsOldEmbeddedFreemapUrlFormat2(location);
    store.dispatch(setEmbeddedMode());
    store.dispatch(infoPointAdd(lat, lon));
    if (label) {
      store.dispatch(infoPointChangeLabel(label));
    }
  }

  const diff = getMapStateDiffFromUrl(getMapStateFromUrl(location), store.getState().map);

  if (diff && Object.keys(diff).length) {
    store.dispatch(mapRefocus(diff));
  }
}

function latLonEquals(ll1, ll2) {
  return !ll1 && !ll2 || ll1 && ll2 && ll1.lat === ll2.lat && ll1.lon === ll2.lon;
}
