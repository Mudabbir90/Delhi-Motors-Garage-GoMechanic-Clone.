import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
        CheckLogin()
    }, 2000);
  }, []);

  const CheckLogin = async () => {
    const email = await AsyncStorage.getItem('EMAIL');
    console.log(email)
    if(email!==null){
        navigation.navigate('BottomNavigation')
    }
    else{
        navigation.navigate('Login')
    }
  };
  return (
    <View style={styles.MainContainer}>
      <Text style={styles.SplashText}>Delhi Motors Garage</Text>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  SplashText: {
    fontSize: 30,
    fontWeight: '700',
    color: 'red',
  },
});
