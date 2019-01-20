import { TRY_AUTH, AUTH_SET_TOKEN, AUTH_REMOVE_TOKEN } from "./actionTypes";



export const authStoreToken = (token) => ({
  type : 'GET_AUTH_SAGA',
  payload : token
  /*
    return dispatch => {
      dispatch(authSetToken(token));
      AsyncStorage.setItem("problemator:auth:token", token);
    };
    */
  });

export const authSetToken = (token) => ({
        type: 'GET_AUTH_SAGA',
        payload : token,
});


export const authGetToken = () => {
    return (dispatch, getState) => {
      const promise = new Promise((resolve, reject) => {
        const token = getState().auth.token;
        if (!token) {
          let fetchedToken;
          AsyncStorage.getItem("problemator:auth:token")
            .catch(err => reject())
            .then(tokenFromStorage => {
              fetchedToken = tokenFromStorage;
              if (!tokenFromStorage) {
                reject();
                return;
              }
            })
            .catch(err => reject());
        } else {
          resolve(token);
        }
      });
      return promise
        .then(token => {
          if (!token) {
            throw new Error("No token found");
          } else {
            return token;
          }
        });
    };
  };
  
  

export const authLogout = () => {
    return dispatch => {
      dispatch(authClearStorage()).then(() => {
        App();
      });
      dispatch(authRemoveToken());
    };
  };
  
  export const authRemoveToken = () => {
    return {
      type: AUTH_REMOVE_TOKEN
    };
  };