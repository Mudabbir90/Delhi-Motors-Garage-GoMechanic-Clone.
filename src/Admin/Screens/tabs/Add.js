import {
  PermissionsAndroid,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useCallback} from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
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
const Add = () => {
  const [selected, setSelected] = useState('');
  const [ImageData, setImageData] = useState(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [discountPrice, setDiscountPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const [value, setValue] = useState(null);

  let DiscountedPercent = price - discountPrice;
  DiscountedPercent = (DiscountedPercent / price) * 100;
  let TrunkDiscounted = Math.floor(DiscountedPercent);
  console.log(TrunkDiscounted);

  let SavePrice=TrunkDiscounted/100*price;
  let FloorDiscounted=Math.floor(SavePrice);
  console.log(FloorDiscounted)

  let StrPrice=price
  let ConvertedStrPrice=StrPrice.toString();
  console.log(ConvertedStrPrice)
  console.log(typeof(ConvertedStrPrice))

  let StrDisPrice=discountPrice
  let ConvertedStrDisPrice=StrDisPrice.toString();

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
        OpenGallery();
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const OpenGallery = async () => {
    const result = await launchImageLibrary({mediaType: 'photo'});
    if (result.didCancel) {
    } else {
      console.log(result);
      setImageData(result);
    }
  };
  const uploadImage = async () => {
    const reference = storage().ref(ImageData.assets[0].fileName);
    const pathToFile = ImageData.assets[0].uri;
    // uploads file
    await reference.putFile(pathToFile);
    const url = await storage()
      .ref(ImageData.assets[0].fileName)
      .getDownloadURL();
    console.log(url);
    uploadItem(url);
  };
  const uploadItem = url => {
    firestore()
      .collection(value)
      // .orderBy('', 'asc')
      .add({
        name: name,
        price: ConvertedStrPrice,
        description: description,
        discountPrice: ConvertedStrDisPrice,
        DiscountedPercent: TrunkDiscounted,
        SavePrice:FloorDiscounted,
        imageUrl: url,
      })
      .then(() => {
        console.log('Item added!');
        setLoading(false);
      });
  };

  return (
    <ScrollView>
      <View style={styles.MainContainer}>
        {ImageData !== null ? (
          <Image
            source={{uri: ImageData.assets[0].uri}}
            style={styles.ImageDataa}
          />
        ) : null}
        <View>
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

          <TextInput
            placeholder="Enter Service Name"
            style={styles.InputStyle}
            value={name}
            onChangeText={text => setName(text)}
          />
          <TextInput
            placeholder="Enter Item Price"
            style={styles.InputStyle}
            value={price}
            onChangeText={text => setPrice(parseInt(text))}
          />
          <TextInput
            placeholder="Enter Item Discount Price"
            style={styles.InputStyle}
            value={discountPrice}
            onChangeText={text => setDiscountPrice(parseInt(text))}
          />
          <TextInput
            placeholder="Enter Item Description"
            multiline
            style={[styles.InputStyle, {height: responsiveHeight(10)}]}
            value={description}
            onChangeText={text => setDescription(text)}
          />
          <TextInput
            placeholder="Enter Item URL"
            style={styles.InputStyle}
            value={imageUrl}
            onChangeText={text => setImageUrl(text)}
          />
          <Text
            style={{alignSelf: 'center', marginVertical: responsiveHeight(3)}}>
            OR
          </Text>
          <TouchableOpacity
            onPress={() => {
              setSelected(1), requestCameraPermission();
            }}
            style={[
              styles.pickPic,
              {borderColor: selected == 1 ? 'blue' : 'black'},
            ]}>
            <Text>Pick Image From Gallery</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.UploadItem}
            onPress={() => {
              uploadImage(), setLoading(true);
            }}>
            {/* <Text style={{color:'white'}}>Upload Item</Text> */}
            <Text style={{color: 'white'}}>
              {!isLoading ? (
                'Upload Item'
              ) : (
                <ActivityIndicator color={'#fff'} />
              )}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Add;

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    // backgroundColor:'grey'
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

  Header: {
    width: '100%',
    backgroundColor: 'white',
    height: responsiveHeight(7),
    elevation: responsiveWidth(2),
    justifyContent: 'center',
  },
  HeadText: {
    fontSize: responsiveFontSize(2.5),
    fontWeight: '700',
    color: 'black',
    paddingLeft: responsiveWidth(4),
  },

  InputStyle: {
    borderWidth: 1,
    width: '90%',
    height: responsiveHeight(7),
    borderRadius: responsiveWidth(2),
    paddingLeft: responsiveWidth(4),
    marginTop: responsiveHeight(3),
    alignSelf: 'center',
  },
  pickPic: {
    borderWidth: responsiveWidth(0.2),
    width: '90%',
    height: responsiveHeight(7),
    alignSelf: 'center',
    borderRadius: responsiveWidth(3),
    justifyContent: 'center',
    alignItems: 'center',
  },

  UploadItem: {
    marginTop: responsiveHeight(2),
    backgroundColor: '#6c75d9',
    width: '90%',
    height: responsiveHeight(7),
    alignSelf: 'center',
    borderRadius: responsiveWidth(3),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: responsiveHeight(7),
  },

  ImageDataa: {
    width: '90%',
    height: responsiveHeight(30),
    borderRadius: responsiveWidth(2),
    alignSelf: 'center',
    marginTop: responsiveHeight(2),
  },
});
