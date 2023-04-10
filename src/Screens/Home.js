import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import banner1 from '../image/banner1.png';
import banner2 from '../image/banner2.jpg';
import banner3 from '../image/banner3.jpg';
import {
  responsiveWidth,
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import Periodic from '../image/per.png';
import AC from '../image/AC.png';
import Batteries from '../image/Batteries.png';
import wheel from '../image/wheel.png';
import {SliderBox} from 'react-native-image-slider-box';
import {useNavigation} from '@react-navigation/native';
import search from '../image/search.png'
const Home = () => {
  const navigation = useNavigation();
  useEffect(() => {
    CheckLogin();
  }, []);
  const CheckLogin = async () => {
    const email = await AsyncStorage.getItem('EMAIL');
    const password = await AsyncStorage.getItem('PASSWORD');
    console.log(email);
    console.log(password);
  };

  const image = [banner1, banner2, banner3];

  return (
    <View style={styles.MainContainer}>
      <View style={styles.Container}>
        <ScrollView>
          <View style={styles.Search}>
            <Image source={search} style={styles.SearchPng} />
            <TextInput
              style={styles.SeachInput}
              placeholder="Search Services & Packages"
            />
          </View>

          <View style={styles.SlideBox}>
            <SliderBox
              images={image}
              style={styles.Banners}
              // sliderBoxHeight={2000}
              // onCurrentImagePressed={index =>
              //   console.warn(`image ${index} pressed`)
              // }
              dotColor="#FFEE58"
              inactiveDotColor="#90A4AE"
              // paginationBoxVerticalPadding={20}
              autoplay
              circleLoop
            />
          </View>

          <View style={styles.CarCat}>
            <Text style={styles.CarCatText}>Schecduled Services</Text>
            <View style={styles.CarCatImg}>
              <TouchableOpacity
                style={styles.CarCatImgTouch1}
                onPress={() => {
                  navigation.navigate('AllServices', {
                    name: 'Periodic Services',
                    service:'Scheduled Packages',
                  });
                }}>
                <Image source={Periodic} style={styles.CarCatImgTouch} />
                <Text style={styles.CarText}>Periodic Services</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.CarCatImgTouch1}
                onPress={() => {
                  navigation.navigate('AllServices', {
                    name: 'AC Service & Repair',
                  });
                }}>
                <Image source={AC} style={styles.CarCatImgTouch} />
                <Text style={styles.CarText}>AC Service & Repair</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.CarCatImgTouch1}
                onPress={() => {
                  navigation.navigate('AllServices', {
                    name: 'Batteries',
                  });
                }}>
                <Image source={Batteries} style={styles.CarCatImgTouch} />
                <Text style={styles.CarText}>Batteries</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.CarCatImgTouch1}
                onPress={() => {
                  navigation.navigate('AllServices', {
                    name: 'Tyre & Wheel Care',
                  });
                }}>
                <Image source={wheel} style={styles.CarCatImgTouch} />
                <Text style={styles.CarText}>Tyre & Wheel Care</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.CarCat}>
            <Text style={styles.CarCatText}>Value Added Services</Text>
            <View style={styles.CarCatImg}>
              <TouchableOpacity
                style={styles.CarCatImgTouch1}
                onPress={() => {
                  navigation.navigate('AllServices', {
                    name: 'Denting & Painting',
                  });
                }}>
                <Image
                  source={require('../image/pent.png')}
                  style={styles.CarCatImgTouch}
                />
                <Text style={styles.CarText}>Denting & Painting</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.CarCatImgTouch1}
                onPress={() => {
                  navigation.navigate('AllServices', {
                    name: 'Detailing Services',
                  });
                }}>
                <Image
                  source={require('../image/cleaning.png')}
                  style={styles.CarCatImgTouch}
                />
                <Text style={styles.CarText}>Detailing Services</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.CarCatImgTouch1}
                onPress={() => {
                  navigation.navigate('AllServices', {
                    name: 'Car Spa & Cleaning',
                  });
                }}>
                <Image
                  source={require('../image/spa.png')}
                  style={styles.CarCatImgTouch}
                />
                <Text style={styles.CarText}>Car Spa & Cleaning</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.CarCatImgTouch1}
                onPress={() => {
                  navigation.navigate('AllServices', {
                    name: 'Car Inspections',
                  });
                }}>
                <Image
                  source={require('../image/inspec.png')}
                  style={styles.CarCatImgTouch}
                />
                <Text style={styles.CarText}>Car Inspections</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.CarCat}>
            <Text style={styles.CarCatText}>Mechaincal Repairs</Text>
            <View style={styles.CarCatImg}>
              <TouchableOpacity
                style={styles.CarCatImgTouch1}
                onPress={() => {
                  navigation.navigate('AllServices', {
                    name: 'Windshield & Lights',
                  });
                }}>
                <Image
                  source={require('../image/glass.png')}
                  style={styles.CarCatImgTouch}
                />
                <Text style={styles.CarText}>Windshield & Lights</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.CarCatImgTouch1}
                onPress={() => {
                  navigation.navigate('AllServices', {
                    name: 'Suspension & Fitments',
                  });
                }}>
                <Image
                  source={require('../image/sus.png')}
                  style={styles.CarCatImgTouch}
                />
                <Text style={styles.CarText}>Suspension & Fitments</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.CarCatImgTouch1}
                onPress={() => {
                  navigation.navigate('AllServices', {
                    name: 'Clutch & Body Parts',
                  });
                }}>
                <Image
                  source={require('../image/body.png')}
                  style={styles.CarCatImgTouch}
                />
                <Text style={styles.CarText}>Clutch & Body Parts</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,backgroundColor:'white'
  },

  Container: {
    marginBottom: responsiveHeight(7.6),
  },

  Search: {
    width: '90%',
    alignSelf: 'center',
    marginTop: responsiveHeight(2),
    // borderWidth:responsiveWidth(0.5),
    backgroundColor: 'white',
    paddingLeft: responsiveWidth(2),
    borderRadius: responsiveWidth(5),
    elevation: responsiveWidth(1.5),
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },

  SearchPng: {
    width: responsiveWidth(5.5),
    height:responsiveWidth(5.5),
    // backgroundColor:'red',
    position: 'absolute',
    right: responsiveWidth(5),
  },
  SeachInput: {
    paddingLeft: responsiveWidth(2),
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  Banners: {
    width: responsiveWidth(95),
    height: responsiveWidth(50),
    resizeMode: 'stretch',
    borderRadius: 10,
    marginTop: 10,
    alignSelf: 'center',
  },

  BannersContainer: {
    marginHorizontal: responsiveWidth(2),
    elevation: 10,
  },

  CarCat: {
    marginTop: responsiveHeight(2),
  },

  CarCatText: {
    fontSize: responsiveFontSize(1.8),
    paddingLeft: responsiveWidth(3),
    color: 'black',
    fontWeight: '600',
  },
  CarCatImg: {
    flexDirection: 'row',
    marginTop: responsiveHeight(1),
  },
  CarCatImgTouch: {
    width: responsiveWidth(16),
    height: responsiveWidth(16),
  },
  CarCatImgTouch1: {
    // borderWidth:1,
    backgroundColor: '#e8f4fa',
    padding: responsiveWidth(2),
    flex: 1,
    marginHorizontal: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: responsiveWidth(1),
    elevation: responsiveWidth(1),
  },
  CarText: {
    color: 'black',
  },
});
