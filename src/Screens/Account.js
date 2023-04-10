import {StyleSheet, Text, View, TouchableOpacity, Image,FlatList} from 'react-native';
import React,{useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Header from '../../Component/Header';
import admin from '../image/admin.png';
import account from '../image/account.png'
import order from '../image/order.png'
import cart from '../image/cart.png'
import editprofile from '../image/editprofile.png'
import privacy from '../image/privacy.png'
import phone_call from '../image/phone_call.png'
import refer from '../image/refer.png'
import logout from '../image/logout.png'

import AsyncStorage from '@react-native-async-storage/async-storage';

const data = [
  // {
  //   icon: home,
  //   title: 'Home',
  //   destination: 'Home',
  // },
  {
    icon: account,
    title: 'My Account',
  },
  {
    icon: order,
    title: 'Order History',
  },
  {
    icon: cart,
    title: 'Cart',
  },
  {
    icon: editprofile,
    title: 'Edit Profile',
  },
  {
    icon: privacy,
    title: 'Privacy Policy',
  },
  {
    icon: phone_call,
    title: 'Contact Us',
  },
  {
    icon: refer,
    title: 'Refer a Friend',
  },
  {
    icon: logout,
    title: 'Logout',
  },
];
const Account = () => {
  const navigation = useNavigation();

  const handleListItemPress = destination => {
    console.log(destination);
    navigation.navigate('BottomNavigation');
  };

  const CheckLogin = async () => {
    const email = await AsyncStorage.getItem('ADMINEMAIL');
    console.log(email)
    if(email!==null){
        navigation.navigate('Admin Dashboard')
    }
    else{
        navigation.navigate('AdminLogin')
    }
  };


  return (
    <View style={styles.MainContainer}>
      <Header title={'Menu'} />
      <View style={styles.Container}>
        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                style={styles.IconsButton}
                onPress={() => handleListItemPress(item.destination)}>
                <Image source={item.icon} style={styles.Icons} />
                <Text style={styles.IconsText}>{item.title}</Text>
              </TouchableOpacity>
            );
          }}
        />
        <TouchableOpacity
          style={styles.AdminLOG}
          onPress={() => {
            CheckLogin();
          }}>
          <Image source={admin} style={styles.AdminIcon} />
          <Text style={styles.AdminIconText}>Admin Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Account;

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: '#d3eaf5',
  },
  Header: {
    width: '100%',
    backgroundColor: 'white',
    height: responsiveHeight(7),
    // alignItems:'center',
    justifyContent: 'center',
    paddingLeft: responsiveWidth(3),
    elevation: responsiveWidth(2),
  },
  HeaderText: {
    fontSize: responsiveFontSize(2.3),
    fontWeight: '600',
    color: 'black',
  },
  Container: {
    width: '85%',
    // height: '80%',
    backgroundColor: 'white',
    alignSelf: 'center',
    marginTop: responsiveHeight(2),
    borderRadius: responsiveWidth(5),
    padding: responsiveWidth(4),
  },
  IconsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: responsiveHeight(1),
  },
  Icons: {
    width: responsiveWidth(7),
    height: responsiveWidth(7),
    tintColor: '#5f8cff',
  },
  IconsText: {
    marginLeft: responsiveWidth(3),
  },
  AdminIcon: {
    width: responsiveWidth(7),
    height: responsiveWidth(7),
  },
  AdminLOG: {
    // backgroundColor: 'orange',
    flexDirection: 'row',
    alignItems: 'center',
  },
  AdminIconText: {
    marginLeft: responsiveWidth(3),
  },
});
