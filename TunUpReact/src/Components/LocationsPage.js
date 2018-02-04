import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Container, Header, Left, Button, Icon, Body, Title, Right, Content, Footer, FooterTab,Badge} from 'native-base';
export  class LocationsPage extends React.Component {
  render() {
    const {goBack} = this.props.navigation;  
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent
            onPress={() => goBack()}>
              <Icon name='arrow-back' />
            </Button>
          </Left>  

          <Body>
            <Title>Around Me</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name='menu' />
            </Button>
          </Right>
        </Header>
        <Content/>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
