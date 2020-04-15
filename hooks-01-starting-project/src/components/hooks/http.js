import { useReducer, useCallback } from "react";

const httpInitialState = {
  isLoading: false,
  error: null,
  data: null,
  meta: null
};

const httpReducer = (httpReducer, action) => {
  switch (action.type) {
    case "SEND":
      return {
        ...httpReducer,
        isLoading: true,
        meta: action.meta
      };
    case "RESPONSE":
      return {
        ...httpReducer,
        isLoading: false,
        data: action.responseData,
      };
    case "ERROR":
      return {
        ...httpReducer,
        isLoading: false,
        error: action.error,
      };
    case "CLEAR":
        return {
          ...httpInitialState
        };
    default:
      throw new Error("http Reducer Error");
  }
};

const useHttp = () => {
  const [httpState, dispatch] = useReducer(httpReducer, httpInitialState);

  const sendRequest = useCallback((url, method, body, meta) => {
    dispatch({type: 'CLEAR'})
    dispatch({
      type: "SEND",
      meta
    });
    fetch(url, {
      method,
      body,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((data) => data.json())
      .then((data) => dispatch({ type: "RESPONSE", responseData: data }))
      .catch((e) => {
        dispatch({
          type: "ERROR",
          error: e,
        });
      });
  }, []);

  const clear = useCallback(() => dispatch({type: 'CLEAR'}))
  return [httpState, sendRequest, clear]
};

export default useHttp;
