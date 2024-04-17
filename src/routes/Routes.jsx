import React, {createContext, useEffect, useState} from 'react';
import {getData} from '../utils/storage';
import AppRoutes from './AppRoutes';
import AuthRoutes from './AuthRoutes';
import {LoadingIndicator} from '../components';
import {avatarList} from '../utils/utls';

export const AuthContext = createContext();

const Routes = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [avatar, setAvatar] = useState(avatarList[1]);

  useEffect(() => {
    getData('userData')
      .then(response => {
        if (response != null) {
          setUserData(response);

          getData('avatar')
            .then(result => {
              if (result != null) {
                setAvatar(result);
              }
            })
            .catch(error => console.log(error));

          setIsAuthenticated(true);

          console.log('async data', response);
        } else {
          setUserData(response);
        }
      })
      .catch(error => {
        console.log(
          'error while fetching userdata for authentication in routes',
          error,
        );
        setIsAuthenticated(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [isAuthenticated]);

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        userData,
        setUserData,
        avatar,
        setAvatar,
      }}>
      {isAuthenticated ? <AppRoutes /> : <AuthRoutes />}
    </AuthContext.Provider>
  );
};

export default Routes;
