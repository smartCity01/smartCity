import {Container, Header, Left, Button, Icon, Body, Title, Right, Content, Footer, FooterTab,Badge} from 'native-base';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react'; 
export class BottomTab extends React.Component{
render(){
   return (   
   <Footer>
         <FooterTab>
           <Button badge vertical
           active={this.isActive(0)}
           onPress={() => this.activate("Home")}>
             <Badge><Text>2</Text></Badge>
             <Icon name="home"
             active={this.isActive(0)} />
             <Text>Home</Text>
           </Button>

           <Button vertical
           active={this.isActive(1)}
           onPress={() => this.activate("Locations")}>
             <Icon
             active={this.isActive(1)}
             name="book" />
             <Text>Around Me</Text>
           </Button>

           <Button vertical
           active={this.isActive(2)}
           onPress={() => this.activate("SignUp")}>
             <Icon 
             active={this.isActive(2)}
             name="settings" />
             <Text>Sign up</Text>
           </Button>

           <Button vertical>
             <Icon name="person" />
             <Text>Profile</Text>
           </Button>
         </FooterTab>
       </Footer>
   );
}

activate(buttonName){
 this.getNavigationProps().navigation.navigate(buttonName);
}

getNavigationProps(){
 return this.props.navigator;
}

isActive(buttonIndex){
 return this.getNavigationProps().navigationState.index === buttonIndex;
}

}
