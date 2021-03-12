import { selectFeature } from 'fm3/actions/mainActions';
import { RootState } from 'fm3/storeCreator';
import { useCallback } from 'react';
import { useMapEvent } from 'react-leaflet';
import { useDispatch, useSelector } from 'react-redux';

export function SelectionTool(): null {
  const dispatch = useDispatch();

  const selectionActive = useSelector(
    (state: RootState) => !!state.main.selection,
  );

  useMapEvent(
    'click',
    useCallback(() => {
      if (!window.preventMapClick && selectionActive) {
        dispatch(selectFeature(null));
      }
    }, [dispatch, selectionActive]),
  );

  return null;
}
