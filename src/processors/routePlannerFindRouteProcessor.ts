import {
  routePlannerSetResult,
  routePlannerPreventHint,
  routePlannerSetStart,
  routePlannerSetFinish,
  routePlannerSwapEnds,
  routePlannerAddMidpoint,
  routePlannerSetMidpoint,
  routePlannerRemoveMidpoint,
  routePlannerSetTransportType,
  routePlannerSetMode,
  routePlannerSetParams,
  IAlternative,
  IStep,
} from 'fm3/actions/routePlannerActions';
import { toastsAdd } from 'fm3/actions/toastsActions';
import storage from 'fm3/storage';
import { IProcessor } from 'fm3/middlewares/processorMiddleware';
import { httpRequest } from 'fm3/authAxios';
import { isActionOf } from 'typesafe-actions';

const updateRouteTypes = [
  routePlannerSetStart,
  routePlannerSetFinish,
  routePlannerSwapEnds,
  routePlannerAddMidpoint,
  routePlannerSetMidpoint,
  routePlannerRemoveMidpoint,
  routePlannerSetTransportType,
  routePlannerSetMode,
  routePlannerSetParams,
];

export const routePlannerFindRouteProcessor: IProcessor = {
  actionCreator: updateRouteTypes,
  errorKey: 'routePlanner.fetchingError',
  handle: async ({ dispatch, getState, action }) => {
    const {
      start,
      finish,
      midpoints,
      transportType,
      mode,
    } = getState().routePlanner;

    if (!start || !finish || !transportType) {
      return;
    }

    const allPoints = [
      [start.lon, start.lat].join(','),
      ...midpoints.map(mp => [mp.lon, mp.lat].join(',')),
      [finish.lon, finish.lat].join(','),
    ].join(';');

    const params = {
      alternatives: mode === 'route' || undefined,
      steps: true,
      geometries: 'geojson',
      roundtrip:
        mode === 'roundtrip' ? true : mode === 'trip' ? false : undefined,
      source: mode === 'route' ? undefined : 'first',
      destination: mode === 'trip' ? 'last' : undefined,
      // continue_straight: true,
      exclude:
        transportType === 'car-free'
          ? 'toll'
          : transportType === 'foot-stroller'
          ? 'stroller'
          : undefined,
    };

    let data: any;

    try {
      data = (await httpRequest({
        getState,
        method: 'GET',
        url: `https://routing.epsilon.sk/${
          mode === 'route' ? 'route' : 'trip'
        }/v1/${transportType.replace(/-.*/, '')}/${allPoints}`,
        params,
        expectedStatus: [200, 400],
        cancelActions: updateRouteTypes,
      })).data;
    } catch (err) {
      dispatch(
        routePlannerSetResult({
          timestamp: Date.now(),
          transportType,
          alternatives: [],
        }),
      );
      throw err;
    }

    // TODO assert
    const { code, trips, routes } = data;

    if (code === 'Ok') {
      const showHint =
        // TODO ??? !getState().routePlanner.shapePoints &&
        !storage.getItem('routePlannerPreventHint') &&
        !midpoints.length &&
        isActionOf([routePlannerSetStart, routePlannerSetFinish], action);

      if (showHint) {
        dispatch(
          toastsAdd({
            collapseKey: 'routePlanner.showMidpointHint',
            messageKey: 'routePlanner.showMidpointHint',
            style: 'info',
            actions: [
              { nameKey: 'general.ok' },
              {
                nameKey: 'general.preventShowingAgain',
                action: routePlannerPreventHint(),
              },
            ],
          }),
        );
      }

      const alts = (routes || trips).map(route => {
        const {
          legs,
          distance: totalDistance,
          duration: totalDuration,
          extra: totalExtra,
        } = route;
        const itinerary = [].concat(
          ...legs.map((leg, legIndex: number) =>
            leg.steps.map(
              ({
                name,
                distance,
                duration,
                mode: m,
                geometry,
                extra,
                maneuver: {
                  type,
                  modifier,
                  location: [lon, lat],
                },
              }) => ({
                maneuver: {
                  location: {
                    lat,
                    lon,
                  },
                  type,
                  modifier,
                },
                distance,
                duration,
                name,
                type,
                modifier,
                mode: m,
                shapePoints: geometry.coordinates.map(lonlat =>
                  lonlat.reverse(),
                ),
                legIndex,
                extra,
              }),
            ),
          ),
        );

        return {
          itinerary,
          distance: totalDistance / 1000,
          duration: totalDuration / 60,
          extra: totalExtra,
        };
      });

      const alternatives =
        transportType === 'imhd'
          ? alts.map(alt => addMissingSegments(alt))
          : alts;

      dispatch(
        routePlannerSetResult({
          timestamp: Date.now(),
          transportType,
          alternatives,
        }),
      );
    } else {
      dispatch(
        routePlannerSetResult({
          timestamp: Date.now(),
          transportType,
          alternatives: [],
        }),
      );
      dispatch(
        toastsAdd({
          collapseKey: 'routePlanner.routeNotFound',
          messageKey: 'routePlanner.routeNotFound',
          style: 'warning',
          timeout: 5000,
        }),
      );
    }
  },
};

function addMissingSegments(alt: IAlternative) {
  const routeSlices: IStep[] = [];
  for (let i = 0; i < alt.itinerary.length; i += 1) {
    const slice = alt.itinerary[i];
    const prevSlice = alt.itinerary[i - 1];
    const nextSlice = alt.itinerary[i + 1];

    const prevSliceLastShapePoint = prevSlice
      ? prevSlice.shapePoints[prevSlice.shapePoints.length - 1]
      : null;
    const firstShapePoint = slice.shapePoints[0];

    const lastShapePoint = slice.shapePoints[slice.shapePoints.length - 1];
    const nextSliceFirstShapePoint = nextSlice
      ? nextSlice.shapePoints[0]
      : null;

    const shapePoints = [...slice.shapePoints];

    if (slice.mode === 'foot') {
      if (
        prevSliceLastShapePoint &&
        (Math.abs(prevSliceLastShapePoint[0] - firstShapePoint[0]) >
          0.0000001 ||
          Math.abs(prevSliceLastShapePoint[1] - firstShapePoint[1]) > 0.0000001)
      ) {
        shapePoints.unshift(prevSliceLastShapePoint);
      }

      if (
        nextSliceFirstShapePoint &&
        (Math.abs(nextSliceFirstShapePoint[0] - lastShapePoint[0]) >
          0.0000001 ||
          Math.abs(nextSliceFirstShapePoint[1] - lastShapePoint[1]) > 0.0000001)
      ) {
        shapePoints.push(nextSliceFirstShapePoint);
      }
    }

    routeSlices.push({
      ...slice,
      shapePoints,
    });
  }

  return { ...alt, itinerary: routeSlices };
}