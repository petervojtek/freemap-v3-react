import React, { ReactElement } from 'react';
import { GeoJSON } from 'react-leaflet';
import { useSelector } from 'react-redux';
import { RootState } from 'fm3/storeCreator';
import { LatLng, marker } from 'leaflet';
import { Feature } from 'geojson';
import { createMarkerIcon } from './RichMarker';

const ptl = (_: Feature, latLng: LatLng) =>
  marker(latLng, { icon: createMarkerIcon() });

export function SearchResults(): ReactElement | null {
  const selectedResult = useSelector(
    (state: RootState) => state.search.selectedResult,
  );

  return !selectedResult ? null : (
    <GeoJSON
      key={selectedResult.id}
      data={selectedResult.geojson}
      style={{ weight: 5 }}
      pointToLayer={ptl}
    />
  );
}
