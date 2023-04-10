import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Header from '../../Component/Header';
import {useNavigation} from '@react-navigation/native';
import SosData from '../../utils/SosData';

const Sos = () => {
  const data = SosData;
  const navigation = useNavigation();
  return (
    <View style={styles.MainConatiner}>
      <Header title={'Choose your Emergency Service'} />

      <View style={styles.Conatiner}>
        <FlatList
          numColumns={3}
          data={data}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                style={styles.AllServices}
                onPress={() => {
                  navigation.navigate('Emergency', {
                    name: item.title,
                    icon: item.imagee,
                    item: item,
                  });
                }}>
                <View>
                  <View style={styles.Services}>
                    <Image source={item.imagee} style={styles.IconImage} />
                    <Text style={styles.IconImageText}>{item.title}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </View>
  );
};

export default Sos;

const styles = StyleSheet.create({
  MainConatiner: {
    flex: 1,
    backgroundColor:'white',
  },
  Header: {
    width: '100%',
    backgroundColor: 'white',
    height: responsiveHeight(7),
    justifyContent: 'center',
    paddingLeft: responsiveWidth(3),
    elevation: responsiveWidth(0.4),
  },
  HeaderText: {
    fontSize: responsiveFontSize(2.3),
    fontWeight: '600',
    color: 'black',
  },
  IconImage: {
    width: responsiveWidth(20),
    height: responsiveWidth(20),
    resizeMode: 'contain',
  },
  Services: {
    margin: responsiveWidth(1),
    justifyContent: 'center',
    alignItems: 'center',
  },
  IconImageText: {
    fontWeight: '500',
    color: 'black',
  },

  AllServices: {
    margin: responsiveWidth(1),
    backgroundColor: '#e8f4fa',
    borderRadius: 10,
    width: responsiveWidth(32),
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: responsiveWidth(1),
  },
  Conatiner: {
    width: '99%',
    alignSelf: 'center',
  },
});
