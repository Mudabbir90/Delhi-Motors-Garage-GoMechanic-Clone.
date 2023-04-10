import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import React, {useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import List from '../../Component/List';
import Header from '../../Component/Header';
import ExportImage from '../../Component/ExportImage';
import {ScrollView} from 'react-native-gesture-handler';

const AllServices = () => { 
  const route = useRoute();
  const navigation = useNavigation();
  const [isLoading, setIsLodaing] = useState(true);
  return (
    <View style={styles.MainContainer}>
      <Header
        title={route.params.name}
        lefticon={ExportImage.backKey}
        Onpress={() => navigation.goBack()}
      />
        <Text style={styles.ServiceText}>{route.params.service}</Text>
        <List />
    </View>
  );
};

export default AllServices;

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
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
  ServiceText: {
    fontSize: responsiveFontSize(2.6),
    marginLeft: responsiveWidth(5),
    fontWeight: '600',
    color: 'black',
  },
});
