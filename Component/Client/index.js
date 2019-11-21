import React from 'react';
import {Dimensions} from 'react-native';
import ClientList from './ClientList';
import {useSelector} from 'react-redux';
import {Spinner, View, Text} from 'native-base';

const Client = () => {
  const {width, height} = Dimensions.get('window');
  const clients = useSelector(state => state.Clients);
  console.log('clients', clients);

  return (
    <>
      {!clients.length ? (
        <View
          style={{
            display: 'flex',
            width: width,
            height: height - 130,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {clients === false ? (
            <>
              <Text>No Client Added yet</Text>
              <Text>Add Client to show client data here</Text>
            </>
          ) : (
            <Spinner color="green" />
          )}
        </View>
      ) : (
        clients.map((client, index) => (
          <ClientList key={index} index={index} client={client} />
        ))
      )}
    </>
  );
};

export default Client;
