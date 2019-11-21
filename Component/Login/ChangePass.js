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

const ChangePass = ({setIsChangePass}) => {
  const [old, setOld] = useState('');
  const [error, seterror] = useState(false);

  const [newPass, setNewPass] = useState('');

  const handleOld = value => {
    setOld(value);
  };

  const handleNew = value => {
    setNewPass(value);
  };

  const handleReset = () => {
    firebase
      .database()
      .ref('login')
      .on('value', value => {
        if (value.toJSON() === old) {
          firebase
            .database()
            .ref('login')
            .set(newPass, () => {
              console.log(value.toJSON());
              setIsChangePass(false);
              setOld('');
              setNewPass('');
            });
        } else {
          setOld('');
          setNewPass('');
          seterror(true);
        }
      });
  };

  return (
    <>
      <View style={Styles.cardCenter}>
        <Card
          style={{
            flex: 0,
            width: '100%',
          }}>
          <CardItem>
            <H2
              style={{
                color: '#00b386',
                textAlign: 'center',
                display: 'flex',
                width: '100%',
              }}>
              Reset Password
            </H2>
          </CardItem>
          <CardItem>
            <Body>
              <Item rounded error={error}>
                <Input
                  autoFocus
                  secureTextEntry={true}
                  value={old}
                  onBlur={() => handleOld(old)}
                  onChangeText={value => handleOld(value)}
                  placeholder="Enter Old Password"
                />
              </Item>
              <Item rounded>
                <Input
                  disabled={old.length > 4 ? false : true}
                  secureTextEntry={true}
                  value={newPass}
                  onBlur={() => handleNew(newPass)}
                  onChangeText={value => handleNew(value)}
                  placeholder="Enter New Password"
                />
              </Item>
            </Body>
          </CardItem>
          <CardItem>
            <Left>
              <Button
                transparent
                textStyle={{
                  color: '#87838B',
                }}
                onPress={() => setIsChangePass(false)}>
                <Text>Login</Text>
              </Button>
            </Left>
            <Right>
              <Button
                primary
                disabled={newPass.length > 4 ? false : true}
                textStyle={{
                  color: '#87838B',
                }}
                onPress={handleReset}>
                <Text>Save</Text>
              </Button>
            </Right>
          </CardItem>
        </Card>
      </View>
    </>
  );
};

const Styles = StyleSheet.create({
  cardCenter: {
    display: 'flex',
    width: '100%',
    height: '85%',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ChangePass;
