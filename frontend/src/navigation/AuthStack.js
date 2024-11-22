// src/navigation/AuthStack.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

import NewsList from '../screens/NewsList';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="News">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      
      <Stack.Screen name="News" component={NewsList} /> {/* Nova tela de notícias */}
    </Stack.Navigator>
  );
};

export default AuthStack;
