import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
// import AppNavigator from './src/Screens/AppNavigator';
// import BottomNavigation from './src/Screens/BottomNavigation';
import AppNavigator from './src/AppNavigator/AppNavigator';
// import {Provider} from 'react-redux';
// import {Store} from './src/redux/Store';

const App=()=>{
  return (
    <View style={styles.MainContainer}>
        <AppNavigator />
    </View>
  );
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
  },
});

export default App;
