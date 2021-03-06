import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Container, Header, Left, Button, Icon, Body, Title, Right, Content, Footer, FooterTab,Badge} from 'native-base';
export  class HomePage extends React.Component {

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
            <Title>Scooby</Title>
          </Body>
          <Right>
            <Button transparent
            onPress={() => this.props.navigation.navigate('Locations')}>
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
