'use strict';
import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import { createStore } from 'redux';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import WelcomePage from './src/Components/WelcomePage';
import AddTask from './src/Components/AddTask';

import Appreducer from './src/reducers';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

const store = createStore(Appreducer);

const mainStack = createStackNavigator ({
  Welcome : WelcomePage,
  AddTask :AddTask
},
{
  initialRouteName:'Welcome'
}
);

const MainApp = createAppContainer(mainStack);

class App extends Component {
  render(){
     return(
       <Provider store = {store}>
         <MainApp />
       </Provider>
     )
  }
}

const styles = StyleSheet.create ({
  container :{
    width :'100%',
    height:'100%',
    // backgroundColor: 'yellow'
  }
})

export default App;

