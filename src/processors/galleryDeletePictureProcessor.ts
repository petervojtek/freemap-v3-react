import {
  gallerySetImageIds,
  galleryRequestImage,
  gallerySetLayerDirty,
  galleryClear,
  galleryDeletePicture,
} from 'fm3/actions/galleryActions';
import { IProcessor } from 'fm3/middlewares/processorMiddleware';
import { httpRequest } from 'fm3/authAxios';

export const galleryDeletePictureProcessor: IProcessor = {
  actionCreator: galleryDeletePicture,
  errorKey: 'gallery.deletingError',
  handle: async ({ getState, dispatch }) => {
    const { image } = getState().gallery;
    if (!image) {
      return;
    }

    const { id } = image;

    await httpRequest({
      getState,
      method: 'DELETE',
      url: `/gallery/pictures/${id}`,
      expectedStatus: 204,
    });

    dispatch(gallerySetLayerDirty());

    const { imageIds, activeImageId } = getState().gallery;
    if (imageIds && activeImageId) {
      const idx = imageIds.findIndex(imgId => imgId === activeImageId);
      if (idx !== -1) {
        const newImageIds = imageIds.filter(imgId => imgId !== activeImageId);
        dispatch(gallerySetImageIds(newImageIds));
        if (!newImageIds.length) {
          dispatch(galleryClear());
        } else {
          const newActiveImageId =
            newImageIds.length > idx
              ? newImageIds[idx]
              : newImageIds[newImageIds.length - 1];
          dispatch(galleryRequestImage(newActiveImageId));
        }
      }
    } else if (activeImageId === id) {
      dispatch(galleryClear());
    }
  },
};