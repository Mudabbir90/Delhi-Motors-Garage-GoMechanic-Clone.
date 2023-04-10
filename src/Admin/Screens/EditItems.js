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
import React, {useState} from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import {useRoute} from '@react-navigation/native';
import {useIsFocused, useNavigation} from '@react-navigation/native';
const EditItems = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [selected, setSelected] = useState('');
  const [ImageData, setImageData] = useState({
    assets: [{uri: route.params.data.imageUrl}],
  });
  const [name, setName] = useState(route.params.data.name);
  const [price, setPrice] = useState(route.params.data.price);
  const [discountPrice, setDiscountPrice] = useState(
    route.params.data.discountPrice,
  );
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState(route.params.data.description);
  const [isLoading, setLoading] = useState(false);

  let DiscountedPercent = price - discountPrice;
  DiscountedPercent = (DiscountedPercent / price) * 100;
  let TrunkDiscounted = Math.floor(DiscountedPercent);

  let SavePrice=TrunkDiscounted/100*price;
  let FloorDiscounted=Math.floor(SavePrice);

  let StrPrice=price
  let ConvertedStrPrice=StrPrice.toString();

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
  const uploadItem = () => {
    firestore()
      .collection(route.params.value)
      .doc(route.params.id)
      .update({
        name: name,
        price: ConvertedStrPrice,
        description: description,
        discountPrice: ConvertedStrDisPrice,
        DiscountedPercent: TrunkDiscounted,
        SavePrice:FloorDiscounted,
        imageUrl: route.params.data.imageUrl,
      })
      .then(() => {
        console.log('User added!');
        navigation.goBack();
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
          <TextInput
            placeholder="Enter Item Name"
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
            style={[styles.InputStyle,{height:responsiveHeight(10)}]}
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
              uploadItem(),
              setLoading(true)
            }}>
            <Text style={{color: 'white'}}>{!isLoading ? (
                'Update Item'
              ) : (
                <ActivityIndicator color={'#fff'} />
              )}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default EditItems;

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    // backgroundColor:'grey'
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
    // margin:responsiveWidth(6),
    borderRadius: responsiveWidth(2),
    paddingLeft: responsiveWidth(4),
    marginTop: responsiveHeight(4),
    alignSelf: 'center',
  },
  pickPic: {
    // backgroundColor:'blue',
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
