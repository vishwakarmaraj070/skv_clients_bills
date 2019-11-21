import React from 'react';
import {Header, Left, Button, Icon, Body, Title, Right} from 'native-base';

const MyHeader = () => {
  return (
    <>
      <Header noLeft>
        <Left>
          <Button transparent>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>SKV</Title>
        </Body>
        <Right>
          <Button transparent>
            <Icon name="menu" />
          </Button>
        </Right>
      </Header>
    </>
  );
};
export default MyHeader;
