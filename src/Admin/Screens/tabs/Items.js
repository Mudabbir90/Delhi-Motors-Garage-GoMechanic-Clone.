import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState,useRoute} from 'react';
import firestore from '@react-native-firebase/firestore';
import {
  responsiveFontSize,
  responsiveWidth,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import edit from '../../../image/edit.png';
import delete1 from '../../../image/delete.png';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import {Dropdown} from 'react-native-element-dropdown';


const data = [
  {label: 'Periodic Services', value: 'Periodic Services'},
  {label: 'AC Service & Repair', value: 'AC Service & Repair'},
  {label: 'Batteries', value: 'Batteries'},
  {label: 'Tyre & Wheel Care', value: 'Tyre & Wheel Care'},
  {label: 'Denting & Painting', value: 'Denting & Painting'},
  {label: 'Car Spa & Cleaning', value: 'Car Spa & Cleaning'},
  {label: 'Car Inspection', value: 'Car Inspection'},
  {label: 'WindShield & Lights', value: 'WindShield & Lights'},
  {label: 'Suspension & Fitments', value: 'Suspension & Fitments'},
  {label: 'Clutch & Body Parts', value: 'Clutch & Body Parts'},
];

const Items = () => {
  // const route = useRoute();
  const isFocused=useIsFocused();
  const navigation =useNavigation();
  const [items, setItems] = useState([]);
  const [isFocus, setIsFocus] = useState(false);
  const [value, setValue] = useState('Periodic Services');
  useEffect(() => {
    getItems();
  }, [isFocused,value]);

console.log(value);
  const getItems = () => {
    firestore()
      .collection(value)
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
        // setIsLodaing(false); 
      });
  };

  console.log(items);
  const deleteItems = docId => {
    firestore()
      .collection(value)
      .doc(docId)
      .delete()
      .then(() => {
        console.log('User deleted!');
        getItems();
      });
  };
  return (
    <View style={styles.MainContainer}>
      <Dropdown
            style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={data}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'Select Services' : '...'}
            searchPlaceholder="Search..."
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setValue(item.value);
              setIsFocus(false);
            }}
          />
      <FlatList
        data={items}
        renderItem={({item, index}) => {
          return ( 
            <View style={styles.ItemView}>
              <Image
                source={{uri: item.data.imageUrl}}
                style={styles.itemImage}
              />
              <View style={styles.nameView}>
                <Text style={styles.NameText}>{item.data.name}</Text>
                <Text style={styles.decText}>{item.data.description}</Text>
                <View style={styles.PriceView}>
                  <Text style={styles.PriceText}>
                    ₹{item.data.discountPrice}
                  </Text>
                  <Text style={styles.desPriceText}>₹{item.data.price}</Text>
                </View>
              </View>
              <View style={{margin: responsiveWidth(2)}}>
                <TouchableOpacity onPress={()=>{
                  navigation.navigate('EditItems',{
                    data:item.data,
                    id:item.id,
                    value:value
                  })
                }}>
                  <Image source={edit} style={styles.icon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{
                  deleteItems(item.id)
                }}>
                  <Image
                    source={delete1}
                    style={[styles.icon, {marginTop: responsiveHeight(3)}]}
                  />
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default Items;

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
  },

  ItemView: {
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    backgroundColor: 'white',
    elevation: 4,
    marginTop: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  itemImage: {
    width: 90,
    height: 90,
    borderRadius: 10,
    margin: 5,
  },
  nameView: {
    width: '57%',
    margin: responsiveWidth(1),
  },

  NameText: {
    fontSize: responsiveFontSize(2.5),
    fontWeight: '700',
    color: 'black',
  },
  PriceView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  decText: {
    fontSize: responsiveFontSize(1.8),
    fontWeight: '600',
  },

  PriceText: {
    fontSize: responsiveFontSize(3),
    color: 'green',
    fontWeight: '700',
  },
  desPriceText: {
    fontSize: responsiveFontSize(2.5),
    fontWeight: '600',
    textDecorationLine: 'line-through',
    marginLeft: responsiveWidth(2),
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: responsiveWidth(6),
    height: responsiveWidth(6),
  },
  dropdown: {
    margin: responsiveWidth(4),
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
