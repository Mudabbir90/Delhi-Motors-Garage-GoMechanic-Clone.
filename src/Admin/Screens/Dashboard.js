import { StyleSheet, Text, TouchableOpacity, View,Image } from 'react-native'
import React, { useState } from 'react'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import Order from '../../image/order.png'
import add from '../../image/add.png'
import bell from '../../image/bell.png'
import items from '../../image/items.png'
import transaction from '../../image/transaction.png'
import Items from '../Screens/tabs/Items'
import Transaction from '../Screens/tabs/Transaction'
import Add from '../Screens/tabs/Add'
import Orders from '../Screens/tabs/Orders'
import Bell from '../Screens/tabs/Bell'
const Dashboard = () => {
    const [selected,setSelected]=useState(0);
  return (
    <View style={styles.MainContainer}>
        {selected==0?<Items/>:selected==1?<Transaction/>:selected==2?<Add/>:selected==3?<Orders/>:<Bell/>}
      <View style={styles.BottomView}>
        <TouchableOpacity style={styles.BottomTab} onPress={()=>{setSelected(0)}}>
            <Image source={items} style={[styles.iconImage,{tintColor:selected==0?'red':'black'}]} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.BottomTab} onPress={()=>{setSelected(1)}}>
            <Image source={transaction} style={[styles.iconImage,{tintColor:selected==1?'red':'black'}]} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.BottomTab} onPress={()=>{setSelected(2)}}>
            <Image source={add} style={[{width:responsiveWidth(10),height:responsiveWidth(10)},{tintColor:selected==2?'red':'black'}]} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.BottomTab} onPress={()=>{setSelected(3)}}>
            <Image source={Order} style={[styles.iconImage,{tintColor:selected==3?'red':'black'}]} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.BottomTab} onPress={()=>{setSelected(4)}}>
            <Image source={bell} style={[styles.iconImage,{tintColor:selected==4?'red':'black'}]} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Dashboard

const styles = StyleSheet.create({
    MainContainer:{
        flex:1,
    },

    BottomView:{
        width:'100%',
        height:responsiveHeight(6),
        flexDirection:'row',
        justifyContent:'space-evenly',
        alignItems:'center',
        position: 'absolute',
        bottom:0,
        backgroundColor:'white',
        // overflow:'hidden'
    },
    BottomTab:{
        // height:'100%',
        // width:responsiveWidth(2),
        justifyContent:'center',
        alignItems:'center'
    },
    iconImage:{
        width:responsiveWidth(8),
        height:responsiveWidth(8)
    }
})