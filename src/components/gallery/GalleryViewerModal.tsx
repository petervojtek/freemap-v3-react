/* eslint-disable react/display-name */

import React, {
  useCallback,
  ReactElement,
  useRef,
  useState,
  useEffect,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactStars from 'react-stars';

import { useTranslator } from 'fm3/l10nInjector';

import { FontAwesomeIcon } from 'fm3/components/FontAwesomeIcon';
import {
  GalleryEditForm,
  PictureModel,
} from 'fm3/components/gallery/GalleryEditForm';

import Modal from 'react-bootstrap/lib/Modal';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import Button from 'react-bootstrap/lib/Button';
import Label from 'react-bootstrap/lib/Label';
import InputGroup from 'react-bootstrap/lib/InputGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';

import { toastsAdd } from 'fm3/actions/toastsActions';

import {
  galleryClear,
  galleryRequestImage,
  galleryShowOnTheMap,
  gallerySetComment,
  gallerySubmitComment,
  gallerySubmitStars,
  galleryEditPicture,
  galleryDeletePicture,
  gallerySetEditModel,
  gallerySavePicture,
  gallerySetItemForPositionPicking,
} from 'fm3/actions/galleryActions';

import 'fm3/styles/gallery.scss';
import { RootState } from 'fm3/storeCreator';
import { getType } from 'typesafe-actions';
import { OpenInExternalAppMenuButton } from '../OpenInExternalAppMenuButton';

export function GalleryViewerModal(): ReactElement {
  const t = useTranslator();

  const dispatch = useDispatch();

  const imageIds = useSelector((state: RootState) => state.gallery.imageIds);

  const image = useSelector((state: RootState) => state.gallery.image);

  const activeImageId2 = useSelector(
    (state: RootState) => state.gallery.activeImageId,
  );

  const comment = useSelector((state: RootState) => state.gallery.comment);

  const editModel = useSelector((state: RootState) => state.gallery.editModel);

  const saveErrors = useSelector(
    (state: RootState) => state.gallery.saveErrors,
  );

  const user = useSelector((state: RootState) => state.auth.user);

  const allTags = useSelector((state: RootState) => state.gallery.tags);

  const language = useSelector((state: RootState) => state.l10n.language);

  const expertMode = useSelector((state: RootState) => state.main.expertMode);

  const [loading, setLoading] = useState(true);

  const [isFullscreen, setIsFullscreen] = useState(false);

  const [imgKey, setImgKey] = useState(0);

  const [activeImageId, setActiveImageId] = useState<number | null>(null);

  const imageElement = useRef<HTMLImageElement>();

  const fullscreenElement = useRef<HTMLDivElement>();

  if (activeImageId2 !== activeImageId) {
    setLoading(true);
    setActiveImageId(activeImageId2);
  }

  useEffect(() => {
    function handleFullscreenChange() {
      setIsFullscreen(document.fullscreenElement === fullscreenElement.current);
      setImgKey((imgKey) => imgKey + 1);
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const setImageElement = (element: HTMLImageElement) => {
    imageElement.current = element;

    if (element) {
      element.addEventListener('load', () => {
        setLoading(false);
      });
    }
  };

  const setFullscreenElement = (element: HTMLDivElement) => {
    fullscreenElement.current = element;
  };

  const handleEditModelChange = useCallback(
    (editModel: PictureModel) => {
      dispatch(gallerySetEditModel(editModel));
    },
    [dispatch],
  );

  const handleIndexChange = useCallback(
    (e: React.FormEvent<FormControl>) => {
      if (imageIds) {
        const idx = parseInt((e.target as HTMLSelectElement).value, 10);

        if (isNaN(idx)) {
          throw new Error();
        }

        dispatch(galleryRequestImage(imageIds[idx]));
      }
    },
    [dispatch, imageIds],
  );

  const handleCommentFormSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      dispatch(gallerySubmitComment());
    },
    [dispatch],
  );

  const handleFullscreen = useCallback(() => {
    if (!document.exitFullscreen || !fullscreenElement.current) {
      // unsupported
    } else if (document.fullscreenElement === fullscreenElement.current) {
      document.exitFullscreen();
    } else {
      fullscreenElement.current.requestFullscreen();
    }
  }, []);

  const handleSave = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      dispatch(gallerySavePicture());
    },
    [dispatch],
  );

  const index = imageIds
    ? imageIds.findIndex((id) => id === activeImageId)
    : -1;

  const {
    title = '...',
    description = undefined,
    createdAt = undefined,
    takenAt = undefined,
    tags = undefined,
    comments = undefined,
    rating = undefined,
    myStars = undefined,
    lat,
    lon,
  } = image || {};

  const nextImageId = imageIds && imageIds[index + 1];

  const prevImageId = index > 0 && imageIds && imageIds[index - 1];

  // TODO const loadingMeta = !image || image.id !== activeImageId;

  const dateFormat = new Intl.DateTimeFormat(language, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const getImageUrl = (id: number) =>
    `${process.env.API_URL}/gallery/pictures/${id}/image?width=${Math.round(
      window.devicePixelRatio *
        (isFullscreen
          ? window.innerWidth
          : window.matchMedia('(min-width: 992px)').matches
          ? 868
          : 568),
    )}`;

  const handlePositionPick = useCallback(() => {
    dispatch(gallerySetItemForPositionPicking(-1));
  }, [dispatch]);

  const handleStarsChange = useCallback(
    (stars: number) => {
      dispatch(gallerySubmitStars(stars));
    },
    [dispatch],
  );

  const close = useCallback(() => {
    dispatch(galleryClear());
  }, [dispatch]);

  return (
    <Modal show onHide={close} bsSize="large" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>
          {t('gallery.viewer.title')}{' '}
          {imageIds && (
            <FormControl
              componentClass="select"
              value={index}
              onChange={handleIndexChange}
              style={{ width: 'auto', display: 'inline-block' }}
            >
              {imageIds.map((_, i) => (
                <option key={i} value={i}>
                  {i + 1}
                </option>
              ))}
            </FormControl>
          )}
          {imageIds ? ` / ${imageIds.length} ` : ''}
          {title && `- ${title}`}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div
          ref={setFullscreenElement}
          className={isFullscreen ? 'fullscreen' : ''}
        >
          <div className="carousel">
            <div className="item active">
              {!!activeImageId && (
                <img
                  key={imgKey}
                  ref={setImageElement}
                  className={`gallery-image ${loading ? 'loading' : ''}`}
                  src={getImageUrl(activeImageId)}
                  alt={title ?? undefined}
                />
              )}
              {!!nextImageId && !loading && (
                <img
                  key={`next-${imgKey}`}
                  style={{ display: 'none' }}
                  src={getImageUrl(nextImageId)}
                  alt="next"
                />
              )}
              {!!prevImageId && !loading && (
                <img
                  key={`prev-${imgKey}`}
                  style={{ display: 'none' }}
                  src={getImageUrl(prevImageId)}
                  alt="prev"
                />
              )}
            </div>
            {imageIds && (
              <a
                className={`left carousel-control ${
                  index < 1 ? 'disabled' : ''
                }`}
                onClick={(e) => {
                  e?.preventDefault();
                  dispatch(galleryRequestImage('prev'));
                }}
              >
                <Glyphicon glyph="chevron-left" />
              </a>
            )}
            {imageIds && (
              <a
                className={`right carousel-control ${
                  index >= imageIds.length - 1 ? 'disabled' : ''
                }`}
                onClick={(e) => {
                  e?.preventDefault();
                  dispatch(galleryRequestImage('next'));
                }}
              >
                <Glyphicon glyph="chevron-right" />
              </a>
            )}
          </div>
          <br />
          {image && (
            <div className="footer">
              {isFullscreen && imageIds && (
                <>{`${index + 1} / ${imageIds.length}`} ｜ </>
              )}
              {isFullscreen && title && <>{title} ｜ </>}
              {t('gallery.viewer.uploaded', {
                username: () => <b key={image.user.name}>{image.user.name}</b>,
                createdAt: () =>
                  createdAt && (
                    <b key={createdAt.getTime()}>
                      {dateFormat.format(createdAt)}
                    </b>
                  ),
              })}
              {takenAt && (
                <>
                  {' ｜ '}
                  {t('gallery.viewer.captured', {
                    takenAt: () => (
                      <b key={takenAt.getTime()}>
                        {dateFormat.format(takenAt)}
                      </b>
                    ),
                  })}
                </>
              )}
              {' ｜ '}
              <ReactStars
                className="stars"
                size={22}
                value={rating}
                edit={false}
              />
              {description && ` ｜ ${description}`}
              {tags && tags.length > 0 && ' ｜ '}
              {tags &&
                tags.map((tag) => (
                  <React.Fragment key={tag}>
                    {' '}
                    <Label>{tag}</Label>
                  </React.Fragment>
                ))}
              {!isFullscreen && editModel && (
                <form onSubmit={handleSave}>
                  <hr />
                  <h5>{t('gallery.viewer.modify')}</h5>

                  <GalleryEditForm
                    t={t}
                    model={editModel}
                    allTags={allTags}
                    errors={saveErrors}
                    onPositionPick={handlePositionPick}
                    onModelChange={handleEditModelChange}
                  />
                  <Button bsStyle="primary" type="submit">
                    <Glyphicon glyph="save" /> {t('general.save')}
                  </Button>
                </form>
              )}
              {!isFullscreen && (
                <>
                  <hr />
                  <h5>{t('gallery.viewer.comments')}</h5>
                  {comments &&
                    comments.map((c) => (
                      <p key={c.id}>
                        {dateFormat.format(c.createdAt)} <b>{c.user.name}</b>:{' '}
                        {c.comment}
                      </p>
                    ))}
                  {user && (
                    <form onSubmit={handleCommentFormSubmit}>
                      <FormGroup>
                        <InputGroup>
                          <FormControl
                            type="text"
                            placeholder={t('gallery.viewer.newComment')}
                            value={comment}
                            onChange={(e) => {
                              dispatch(
                                gallerySetComment(
                                  (e.target as HTMLInputElement).value,
                                ),
                              );
                            }}
                            maxLength={4096}
                          />
                          <InputGroup.Button>
                            <Button type="submit" disabled={comment.length < 1}>
                              {t('gallery.viewer.addComment')}
                            </Button>
                          </InputGroup.Button>
                        </InputGroup>
                      </FormGroup>
                    </form>
                  )}
                  {user && (
                    <div>
                      {t('gallery.viewer.yourRating')}{' '}
                      <ReactStars
                        className="stars"
                        size={22}
                        half={false}
                        value={myStars ?? 0}
                        onChange={handleStarsChange}
                      />
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        {image && user && (user.isAdmin || user.id === image.user.id) && (
          <>
            <Button
              onClick={() => {
                dispatch(galleryEditPicture());
              }}
              active={!!editModel}
            >
              <Glyphicon glyph="edit" />
              <span className="hidden-xs">
                {' '}
                {t('general.modify')} <kbd>M</kbd>
              </span>
            </Button>
            <Button
              onClick={() => {
                dispatch(
                  toastsAdd({
                    id: 'gallery.deletePicture',
                    messageKey: 'gallery.viewer.deletePrompt',
                    style: 'warning',
                    cancelType: [
                      getType(galleryClear),
                      getType(galleryRequestImage),
                    ],
                    actions: [
                      {
                        nameKey: 'general.yes',
                        action: galleryDeletePicture(),
                        style: 'danger',
                      },
                      { nameKey: 'general.no' },
                    ],
                  }),
                );
              }}
              bsStyle="danger"
            >
              <Glyphicon glyph="trash" />
              <span className="hidden-xs"> {t('general.delete')}</span>
            </Button>
          </>
        )}
        <Button
          onClick={() => {
            dispatch(galleryShowOnTheMap());
          }}
        >
          <FontAwesomeIcon icon="dot-circle-o" />
          <span className="hidden-xs hidden-sm">
            {' '}
            {t('gallery.viewer.showOnTheMap')} <kbd>S</kbd>
          </span>
        </Button>
        {document.exitFullscreen && (
          <Button onClick={handleFullscreen}>
            <Glyphicon glyph="fullscreen" />
            <span className="hidden-xs hidden-sm">
              {' '}
              {t('general.fullscreen')}
            </span>
          </Button>
        )}
        {lat !== undefined && lon !== undefined && (
          <OpenInExternalAppMenuButton
            lat={lat}
            lon={lon}
            mapType={'X'}
            zoom={14}
            expertMode={expertMode}
            placement="top"
            includePoint
            pointTitle={title ?? undefined}
            pointDescription={description ?? undefined}
            url={`${process.env.API_URL}/gallery/pictures/${activeImageId}/image`}
          >
            <FontAwesomeIcon icon="external-link" />
            <span className="hidden-sm hidden-xs">
              {' '}
              {t('gallery.viewer.openInNewWindow')}
            </span>
          </OpenInExternalAppMenuButton>
        )}
        <Button onClick={close}>
          <Glyphicon glyph="remove" />
          <span className="hidden-xs hidden-sm">
            {' '}
            {t('general.close')} <kbd>Esc</kbd>
          </span>
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
