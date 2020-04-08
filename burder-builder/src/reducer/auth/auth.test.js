import reducer from './index';
import * as actionTypes from '../../actions';

describe("auth reducer", () => {
  it('should return the initialState', () => {
    expect(reducer(undefined, {})).toEqual({
      token: null,
      userId: null,
      error: null,
      loading: false,
      authRedirectPath: '/'
    })
  })
  it('should store the token upon login', () => {
    expect(reducer({
      token: null,
      userId: null,
      error: null,
      loading: false,
      authRedirectPath: '/'
    }, {
      type: actionTypes.AUTH_SUCCESS,
      payload: {
        idToken: 'SomeToken',
        userId: "someUserId",
      },
    })).toEqual({
      token: "SomeToken",
      userId: "someUserId",
      error: null,
      loading: false,
      authRedirectPath: '/'
    })
  })
})