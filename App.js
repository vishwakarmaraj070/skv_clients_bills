import React, {useEffect, useState} from 'react';
import {Container} from 'native-base';
import MyHeader from './Component/Header';
import MyContent from './Component/Content';
import {Provider} from 'react-redux';
import Store from './Component/Redux/Store';
import firebase from 'firebase';

const App = () => {
  const [isInitial, setIsInitial] = useState(false);
  useEffect(() => {
    const firebaseConfig = {
      apiKey: 'AIzaSyCagU65G4DtUWRYiQN3O6sejRWzJP9smyw',
      authDomain: 'skvclients-4dc67.firebaseapp.com',
      databaseURL: 'https://skvclients-4dc67.firebaseio.com',
      projectId: 'skvclients-4dc67',
      storageBucket: 'skvclients-4dc67.appspot.com',
      messagingSenderId: '514804081612',
      appId: '1:514804081612:web:0972bc0c98a3701c577369',
      measurementId: 'G-6HJBGSRBSF',
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    setIsInitial(true);
  }, []);

  return (
    <>
      {isInitial && (
        <Provider store={Store}>
          <Container>
            <MyHeader />
            <MyContent />
          </Container>
        </Provider>
      )}
    </>
  );
};

export default App;
