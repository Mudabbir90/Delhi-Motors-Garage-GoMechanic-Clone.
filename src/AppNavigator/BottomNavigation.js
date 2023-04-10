import {StyleSheet, Text, View,Image,TouchableOpacity} from 'react-native';
import React,{useState} from 'react';
import {
  responsiveHeight,
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Home from '../Screens/Home';
import Help from '../Screens/Help';
import Sos from '../Screens/Sos';
import Accessories from '../Screens/Accessories';
import Account from '../Screens/Account';
import home from '../image/home.png'
import help from '../image/help.png'
import sos from '../image/sos.png'
import seat from '../image/seat.png' 
import account from '../image/account.png'

const BottomNavigation = () => {
    const [selected,setSelected]=useState(0);
  return (
    <View style={styles.MainContainer}>
        {selected==0?<Home/>:selected==1?<Help/>:selected==2?<Sos/>:selected==3?<Accessories/>:<Account/>}
      <View style={styles.BottomView}>
      <TouchableOpacity style={styles.BottomTab} onPress={()=>{setSelected(0)}}>
            <Image source={home} style={[styles.iconImage,{tintColor:selected==0?'#009ade':'black'}]} />
            <Text style={[{color:selected==0?'#009ade':'black'}]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.BottomTab} onPress={()=>{setSelected(1)}}>
            <Image source={help} style={[styles.iconImage,{tintColor:selected==1?'#009ade':'black'}]} />
            <Text style={[{color:selected==1?'#009ade':'black'}]}>Help</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.BottomTab} onPress={()=>{setSelected(2)}}>
            <Image source={sos} style={[styles.iconImage,{tintColor:selected==2?'#009ade':'black'}]} />
            <Text style={[{color:selected==2?'#009ade':'black'}]}>SOS</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.BottomTab} onPress={()=>{setSelected(3)}}>
            <Image source={seat} style={[styles.iconImage,{tintColor:selected==3?'#009ade':'black'}]} />
            <Text style={[{color:selected==3?'#009ade':'black'}]}>Accessories</Text>
        </TouchableOpacity> */}
        <TouchableOpacity style={styles.BottomTab} onPress={()=>{setSelected(4)}}>
            <Image source={account} style={[styles.iconImage,{tintColor:selected==4?'#009ade':'black'}]} />
            <Text style={[{color:selected==4?'#009ade':'black'}]}>Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BottomNavigation;

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
  },

  BottomView: {
    width: '100%',
    height: responsiveHeight(7),
    backgroundColor:'white',
    position:'absolute',
    bottom:0,
    flexDirection:'row',
    justifyContent:'space-evenly',
    // justifyContent: 'space-around',
    elevation:10,
    alignItems:'center',
  },
  BottomTab:{
    justifyContent:'center',
    alignItems:'center'
  },
  iconImage:{
    width:responsiveWidth(6),
    height:responsiveWidth(6),
}
});
