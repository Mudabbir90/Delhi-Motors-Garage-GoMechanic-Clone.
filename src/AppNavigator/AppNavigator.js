import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../Screens/Login';
import SignUp from '../Screens/SignUp';
import Home from '../Screens/Home';
import Splash from '../Screens//Splash';
import BottomNavigation from './BottomNavigation';
import AllServices from '../Screens/AllServices';
import Add from '../Admin/Screens/tabs/Add';
import EditItems from '../Admin/Screens/EditItems';
import AdminLogin from '../Admin/AdminLogin';
import Dashboard from '../Admin/Screens/Dashboard';
import Emergency from '../Screens/Emergency';
const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          // options={{headerShown: false}}
        />
        <Stack.Screen
          name="BottomNavigation"
          component={BottomNavigation}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AllServices"
          component={AllServices}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Add"
          component={Add}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="EditItems"
          component={EditItems}
          // options={{headerShown: false}}
        />
        <Stack.Screen
          name="AdminLogin"
          component={AdminLogin}
          // options={{headerShown: false}}
        />
        <Stack.Screen
          name="Admin Dashboard"
          component={Dashboard}
          // options={{headerShown: false}}
        />
        <Stack.Screen
          name="Emergency"
          component={Emergency}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

const styles = StyleSheet.create({});
