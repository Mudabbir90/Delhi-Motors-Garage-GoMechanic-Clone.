import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React,{useEffect,useState} from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import cart from '../src/image/cart.png';
import {useNavigation} from '@react-navigation/native';
import { useSelector } from 'react-redux';

const Header = ({lefticon, title, righticon, Onpress, CartOnPress ,styless}) => {
  const navigation = useNavigation();
  const CartData=useSelector((state)=>state.reducer)
  const [cartItems,setCartItems]=useState(0);

  useEffect(() => {
    setCartItems(CartData.length)
  }, [CartData])
  return (
    <View style={styles.Header}>
      <View style={styles.HeaderItems}>
        <TouchableOpacity onPress={Onpress}>
          <Image source={lefticon} style={styles.IconBack} />
        </TouchableOpacity>
        <Text style={[styles.HeaderText, styles.styless]}>{title}</Text>
        <View style={{marginLeft:'auto',marginRight:responsiveWidth(5)}}>
          <TouchableOpacity onPress={CartOnPress}>
            {/* <Image source={cart} style={styles.IconBack} /> */}
            <View style={styles.CartNum}>
             <Text  style={styles.CartNumText}>{cartItems}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  Header: {
    width: '100%',
    backgroundColor: 'white',
    height: responsiveHeight(7),
    justifyContent: 'center',
    paddingLeft: responsiveWidth(1),
    elevation: responsiveWidth(2),
  },
  HeaderText: {
    fontSize: responsiveFontSize(2.3),
    fontWeight: '600',
    color: 'black',
    paddingLeft: responsiveWidth(5),
  },
  IconBack: {
    width: responsiveWidth(7),
    height: responsiveWidth(7),
  },
  HeaderItems: {
    flexDirection: 'row',
  },
  CartNum:{
    // position:'absolute',
    // backgroundColor:'red',
    // marginLeft:responsiveWidth(1),
    // marginBottom:responsiveHeight(7)
  },
  CartNumText:{
    fontSize:responsiveFontSize(3)
  },
});
