import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Pressable,
  Alert,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Login2 from '../image/Login.png';
import emailpng from '../image/email.png';
import lock from '../image/padlock.png';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Add from './Screens/tabs/Add';

const AdminLogin = ({navigation}) => {
  const [adminemail, setAdminEmail] = useState('');
  const [adminpassword, setAdminPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const storeData = async () => {
    try {
      await AsyncStorage.setItem('ADMINEMAIL', adminemail);
      await AsyncStorage.setItem('ADMINPASSWORD', adminpassword);
      navigation.navigate('Admin Dashboard');
    } catch (e) {
      // saving error
      console.log(e);
    }
  };

  const LoginUser = () => {
    if (!adminpassword || adminpassword.length < 8) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
    if (!adminemail || !adminemail.includes('@')) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }

    if (!adminemail || !adminemail.includes('@') || !adminpassword || adminpassword.length < 8) {
      return false;
    }

    setIsLoading(true);

    auth()
      .signInWithEmailAndPassword(adminemail, adminpassword)
      .then(() => {
        console.log('signed in!');
        // console.log(auth()._user.email);
        setIsLoading(false);
        storeData();
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
          setEmailError(true);
          // Alert.alert('That email address is invalid!');
        } else if (error.code === 'auth/wrong-password') {
          setPasswordError(true);
          setIsLoading(false);
          console.log('That password is invalid!');
          // Alert.alert('That password is invalid!');
        } else if (error.code === 'auth/user-not-found') {
          console.log('user not found please enter valid details');
          setIsLoading(false);
          Alert.alert('User not found');
        } else if (error.code === 'auth/too-many-requests') {
          console.log(
            'Access to this account has been temporarily disabled due to many failed login attempts',
          );
          Alert.alert(
            'Access to this account has been temporarily disabled due to many failed login attempts',
          );
        }

        console.error(error);
      });
    // AddingDoc();
  };

  return (
    <View style={styles.MainContainer}>
      <ScrollView>
        <View style={styles.img}>
          <Image source={Login2} style={styles.img1} />

          <View style={styles.LoginDetails}>
            <Text style={styles.LoginText}>Admin-Login</Text>

            <View
              style={[
                styles.InputThings,
                {borderBottomColor: emailError ? 'red' : 'grey'},
              ]}>
              <Image
                source={emailpng}
                style={[
                  {width: responsiveWidth(6), height: responsiveWidth(6)},
                  {tintColor: emailError ? 'red' : 'black'},
                ]}
              />
              <TextInput
                style={styles.Input1}
                placeholder="Email Id"
                keyboardType="email-address"
                onChangeText={text => setAdminEmail(text)}
                value={adminemail}
              />
            </View>
            {emailError ? (
              <Text style={{color: 'red'}}>Please Enter Valid Email</Text>
            ) : null}
            <View
              style={[
                styles.InputThings,
                {borderBottomColor: passwordError ? 'red' : 'grey'},
              ]}>
              <Image
                source={lock}
                style={[
                  {width: responsiveWidth(6), height: responsiveWidth(6)},
                  {tintColor: passwordError ? 'red' : 'black'},
                ]}
              />
              <TextInput
                style={styles.Input1}
                placeholder="Password"
                secureTextEntry={true}
                keyboardType="default"
                onChangeText={text => setAdminPassword(text)}
                value={adminpassword}
              />
            </View>
            {passwordError ? (
              <Text style={{color: 'red'}}>Please Enter Valid Password</Text>
            ) : null}
            <TouchableOpacity style={styles.LoginButton} onPress={LoginUser}>
              <Text style={styles.LoginButtonText}>
                {!isLoading ? 'LOGIN' : <ActivityIndicator color={'#fff'} />}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default AdminLogin;

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  img1: {
    width: responsiveWidth(78),
    height: responsiveWidth(78),
    alignSelf: 'center',
  },

  img: {
    width: '90%',
    alignSelf: 'center',
  },

  LoginDetails: {
    marginTop: responsiveHeight(2),
  },

  LoginText: {
    fontSize: responsiveFontSize(4),
    color: 'black',
    fontWeight: '700',
  },

  InputThings: {
    marginTop: responsiveHeight(3),
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: responsiveWidth(0.05),
    borderColor: 'grey',
  },

  Input1: {
    paddingLeft: responsiveWidth(5),
    width: '90%',
  },

  LoginButton: {
    backgroundColor: '#009ade',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: responsiveHeight(4),
    height: responsiveHeight(7),
    borderRadius: responsiveWidth(3),
  },

  LoginButtonText: {
    fontSize: responsiveFontSize(2.5),
    color: 'white',
    fontWeight: '600',
  },
});
