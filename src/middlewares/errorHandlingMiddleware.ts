import { sendError } from 'fm3/globalErrorHandler';
import { Middleware, Dispatch } from 'redux';
import { RootAction } from 'fm3/actions';
import { RootState } from 'fm3/storeCreator';

export const errorHandlingMiddleware: Middleware<
  any,
  RootState,
  Dispatch<RootAction>
> = () => (next: Dispatch) => (action: RootAction): any => {
  try {
    // TODO
    // if (action.type === at.UNHANDLED_LOGIC_ERROR) {
    //   sendError({ kind: 'unhandledLogic', error: action.payload });
    //   return null;
    // }

    return next(action);
  } catch (error) {
    sendError({ kind: 'reducer', error, action });
    return null;
  }
};
