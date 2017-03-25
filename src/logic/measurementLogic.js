import { createLogic } from 'redux-logic';

export default createLogic({
  type: 'MEASUREMENT_ADD_POINT',
  transform({ getState, action }, next) {
    const { points } = getState().measurement;
    let position = points.length;
    next({ ...action, payload: { ...action.payload, position } });
  }
});