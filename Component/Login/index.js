import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {
  Card,
  CardItem,
  Body,
  Text,
  Left,
  Button,
  Right,
  Item,
  Input,
  View,
  H2,
} from 'native-base';
import firebase from 'firebase';
import ChangePass from './ChangePass';

const Login = ({setIsLogin}) => {
  const [login, setLogin] = useState('');
  const [error, seterror] = useState(false);
  const [isChangePass, setIsChangePass] = useState(false);

  const handleChange = value => {
    setLogin(value);
  };
  const handleLogin = () => {
    firebase
      .database()
      .ref('login')
      .on('value', value => {
        if (value.toJSON() === login) {
          setIsLogin(true);
          setLogin('');
        } else {
          seterror(true);
          setLogin('');
        }
      });
  };

  return (
    <>
      {!isChangePass ? (
        <View style={Styles.cardCenter}>
          <Card style={{flex: 0, width: '100%', marginTop: -60}}>
            <CardItem>
              <H2
                style={{
                  color: '#00b386',
                  textAlign: 'center',
                  display: 'flex',
                  width: '100%',
                }}>
                Login
              </H2>
            </CardItem>
            <CardItem>
              <Body>
                <Item rounded error={error}>
                  <Input
                    style={{paddingLeft: 20}}
                    autoFocus
                    secureTextEntry={true}
                    value={login}
                    onBlur={() => handleChange(login)}
                    onChangeText={value => handleChange(value)}
                    placeholder="Enter Password"
                  />
                </Item>
              </Body>
            </CardItem>
            <CardItem>
              <Left>
                <Button
                  transparent
                  textStyle={{color: '#87838B'}}
                  onPress={() => setIsChangePass(true)}>
                  <Text>reset Password</Text>
                </Button>
              </Left>
              <Right>
                <Button
                  primary
                  disabled={login.length > 4 ? false : true}
                  textStyle={{color: '#87838B'}}
                  onPress={handleLogin}>
                  <Text>Login</Text>
                </Button>
              </Right>
            </CardItem>
          </Card>
        </View>
      ) : (
        <ChangePass setIsChangePass={setIsChangePass} />
      )}
    </>
  );
};

const Styles = StyleSheet.create({
  cardCenter: {
    display: 'flex',
    width: '100%',
    height: '100%',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightblue',
  },
});

export default Login;
