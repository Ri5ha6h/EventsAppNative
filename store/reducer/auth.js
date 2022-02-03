import {
  AUTHENTICATE,
  LOGOUT,
  SET_DID_TRY_AL,
  SKIP,
} from '../action/auth';

const initialState = {
  token: null,
  gUser: null,
  fUser: null,
  expoToken: null,
  didTryAutoLogin: false,
  skip: false,
};

export default authReducer = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        token: action.token,
        gUser: action.gUser,
        fUser: action.fUser,
        expoToken: action.expo,
        didTryAutoLogin: true,
      };
    case SET_DID_TRY_AL:
      return {
        ...state,
        didTryAutoLogin: true,
      };
    case LOGOUT:
      return {
        ...initialState,
        didTryAutoLogin: true,
      };
    case SKIP:
      return {
        ...state,
        skip: action.detail.skip,
        expoToken: action.detail.expoToken,
      };
    default:
      return state;
  }
};
