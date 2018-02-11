import React from 'react';
import { StyleSheet, Text, View, TextInput} from 'react-native';
import {Container, Header, Left, Button, Icon, Body, Title, Right, Content, Footer, FooterTab,Badge, Form, Item, Label, Input} from 'native-base';

export class SignUp extends React.Component{
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
           <Title>Sign Up</Title>
       </Body>
      
       <Right>
           <Button transparent>
             <Icon name='menu' />
           </Button>
         </Right>
       </Header>

       <Content padder>
           <Form>
           <Item floatingLabel>
           <Label> Username </Label>
           <Input />
           </Item>
           <Item floatingLabel>
           <Label> Email </Label>
           <Input />
           </Item>
           <Item floatingLabel>
           <Label> Password  </Label>
           <Input />
           </Item>
           <Item floatingLabel last>
           <Label> Confirm Password  </Label>
           <Input />  
           </Item>
           </Form>
           <Text>
           {/* Okay so below "Button block light" is a temporary cheat to have some 
          space between the form and the sign up button */} </Text>
          <Button block light > 
           </Button>
           <Button block info>
           <Text> Sign Up! </Text>
           </Button>
           <View style={styles.container}>
            <Text>
            {'\n\n'} {/* To jump two lines..?  */}
            <Text > Already have an account?
            <View style={styles.container}>
            <Button small bordered>
            <Icon name='person' />
            <Text>Log In </Text>
               </Button>
               </View>
               </Text> </Text>
               </View>
        </Content>
  
   </Container>
   )
}
}
const styles = StyleSheet.create({
   container: {
     flex: 1,
     alignItems: 'center',
     justifyContent: 'center',
     width:800,
     height:50,
   },
 });
