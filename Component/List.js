import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {
  responsiveFontSize,
  responsiveWidth,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useRoute} from '@react-navigation/native';
import Offer from '../src/image/Offer.png';
import {addToCart, removeToCart} from './redux/action';
import {useDispatch, useSelector} from 'react-redux';

const List = () => {
  const route = useRoute();
  const [del, setDel] = useState(false);
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [items, setItems] = useState([]);
  const [isLoading, setIsLodaing] = useState(true);
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.reducer);
  const [isAdded, setIsAdded] = useState(false);
  useEffect(() => {
    getItems();
  }, [isFocused]);

  useEffect(() => {
    setTimeout(() => {
      CheckLogin();
    }, 500);
  }, []);

  const handleAddToCart = item => {
    dispatch(addToCart(item));
  };

  const handleRemoveToCart = item => {
    dispatch(removeToCart(item.name));
  };

  useEffect(() => {
    // if (cartItems && cartItems.length) {
    //   cartItems.forEach(element => {
    //     if (element.name === items.name) {
    //       setIsAdded(true);
    //     }
    //     else{
    //       setIsAdded(false);
    //     }
    //   });
    // }

    let result = cartItems.filter((element) => {
      return element.name === items.name;
    });
    if (result.length) {
      setIsAdded(true);
    } else {
      setIsAdded(false);
    }
  
  }, [cartItems]);

  
  const CheckLogin = async () => {
    const email = await AsyncStorage.getItem('EMAIL');
    console.log(email);
    if (email !== null) {
      setDel(true);
    } else {
      setDel(false);
    }
  };

  const getItems = () => {
    firestore()
      .collection(route.params.name)
      .get()
      .then(querySnapshot => {
        console.log('Total users: ', querySnapshot.size);
        let tempData = [];
        querySnapshot.forEach(documentSnapshot => {
          console.log(
            'User ID: ',
            documentSnapshot.id,
            documentSnapshot.data(),
          );
          tempData.push({
            id: documentSnapshot.id,
            data: documentSnapshot.data(),
          });
        });
        setItems(tempData);
        setIsLodaing(false);
      });
  };
  return (
    <View style={styles.MainContainer}>
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={items}
          renderItem={({item, index}) => {
            return (
              <View style={styles.ItemView}>
                <View style={styles.nameView}>
                  <View
                    style={{
                      height: responsiveHeight(17),
                    }}>
                    <Text style={styles.NameText}>{item.data.name}</Text>
                    <Text style={styles.decText}>{item.data.description}</Text>
                    <View style={styles.PriceView}>
                      <Text style={styles.desPriceText}>
                        ₹{item.data.price}
                      </Text>
                      <Text style={[styles.PriceText, {color: 'black'}]}>
                        ₹{item.data.discountPrice}
                      </Text>
                      <Text style={styles.PriceText}>
                        {item.data.DiscountedPercent}% OFF
                      </Text>
                    </View>
                  </View>

                  <View style={styles.line}>
                    <Image source={Offer} style={styles.offerIcon} />
                    <Text style={styles.LineText}>
                      {' '}
                      Save ₹{item.data.SavePrice} On This Service
                    </Text>
                  </View>
                </View>
                <View style={styles.ListImage}>
                  <Image
                    source={{uri: item.data.imageUrl}}
                    style={styles.itemImage}
                  />
                  {isAdded ? (
                    <TouchableOpacity
                      style={styles.AddButton}
                      onPress={() => handleRemoveToCart(item)}>
                      <Text style={styles.AddButtonText}>Remove</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={styles.AddButton}
                      onPress={() => handleAddToCart(item)}>
                      <Text style={styles.AddButtonText}>ADD</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            );
          }}
        />
      )}
    </View>
  );
};

export default List;

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
  },

  ItemView: {
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    backgroundColor: 'white',
    elevation: responsiveWidth(1),
    marginTop: responsiveHeight(1.5),
    borderRadius: 10,
    borderColor: 'grey',
    marginBottom: 10,
    padding: 10,
  },
  itemImage: {
    width: responsiveWidth(29),
    height: responsiveWidth(30),
    borderRadius: 10,
    resizeMode: 'cover',
  },
  nameView: {
    margin: responsiveWidth(1),
  },

  NameText: {
    fontSize: responsiveFontSize(1.7),
    fontWeight: '600',
    color: 'black',
  },
  PriceView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  decText: {
    fontSize: responsiveFontSize(1.7),
    marginVertical: responsiveHeight(1),
  },

  PriceText: {
    marginLeft: responsiveWidth(2),
    fontSize: responsiveFontSize(1.7),
    color: 'green',
    fontWeight: '700',
  },
  desPriceText: {
    fontSize: responsiveFontSize(1.5),
    fontWeight: '600',
    textDecorationLine: 'line-through',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: responsiveWidth(6),
    height: responsiveWidth(6),
  },
  DelBtn: {
    backgroundColor: 'cyan',
  },
  ListImage: {
    marginLeft: 'auto',
    // backgroundColor:'red',
    height: responsiveHeight(18),
  },
  AddButton: {
    borderWidth: 1,
    borderColor: 'red',
    height: responsiveHeight(4),
    width: responsiveWidth(18),
    alignSelf: 'center',
    bottom: responsiveHeight(2),
    borderRadius: 10,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  AddButtonText: {
    color: 'red',
    fontWeight: '600',
    fontSize: responsiveFontSize(1.7),
  },
  offerIcon: {
    width: responsiveWidth(5),
    height: responsiveWidth(5),
    marginTop: responsiveHeight(0.5),
  },
  line: {
    marginTop: responsiveHeight(1.5),
    flexDirection: 'row',
    width: responsiveWidth(83),
    borderTopWidth: responsiveWidth(0.2),
    justifyContent: 'center',
  },
  LineText: {
    marginTop: responsiveHeight(0.5),
  },
});
