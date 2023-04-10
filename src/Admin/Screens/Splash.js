import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions";

const Splash = ({navigation}) => {
  useEffect(()=>{
    setTimeout(()=>{
      navigation.navigate('AdminLogin')
    },3000)
  },[])
  return (
    <View style={styles.MainContainer}>
      <Text style={styles.Logo}>FoodApp</Text>
    </View>
  )
}

export default Splash

const styles = StyleSheet.create({
  MainContainer:{
    flex:1,
    justifyContent:'center',
    alignItems:"center",
  },

  Logo:{
    fontSize:responsiveFontSize(5),
    fontWeight:'800',
    color:'red'
  },
})