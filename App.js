import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import MainScreen from './screens/MainScreen'
import VinScreen from './screens/VinScreen';
import AdminScreen from './screens/AdminScreen';
import AdminAddScreen from "./screens/AdminAddScreen"
export default function App() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
    <Stack.Navigator screenOptions={{
      
    }}>
    {/*
      Çe sont les Pages de L'application plaçées içi pour la navigation dans le Stack
    */}
    <Stack.Screen name="Login" component={LoginScreen}/>
    <Stack.Screen name="Register" component={RegisterScreen}/>
    <Stack.Screen name="MainPage" component={MainScreen}/>
    <Stack.Screen name="BouteillePage" component={VinScreen}/>
    <Stack.Screen name="Admin" component={AdminScreen}/>
    <Stack.Screen name="AdminAdd" component={AdminAddScreen}/>
    </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
