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

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [skipisLoading, setSkipisLoading] = useState(false);

  useEffect(()=>{
    setTimeout(() => {
      setSkipisLoading(false)
    }, 2000);
  },[skipisLoading])


  const storeData = async () => {
    try {
      await AsyncStorage.setItem('EMAIL', email);
      await AsyncStorage.setItem('PASSWORD', password);
      navigation.navigate('BottomNavigation');
    } catch (e) {
      // saving error
      console.log(e);
    }
  };

  const LoginUser = () => {
    if (!password || password.length < 8) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
    if (!email || !email.includes('@')) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }

    if (!email || !email.includes('@') || !password || password.length < 8) {
      return false;
    }

    setIsLoading(true);

    auth()
      .signInWithEmailAndPassword(email, password)
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
            <Text style={styles.LoginText}>Login</Text>

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
                onChangeText={text => setEmail(text)}
                value={email}
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
                onChangeText={text => setPassword(text)}
                value={password}
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

            <Pressable
              style={styles.Skip}
              onPress={() => {
                setSkipisLoading(true)
                navigation.navigate('BottomNavigation')
                
              }}>
              <Text style={styles.SkipText}>
                {!skipisLoading ? 'Skip' : <ActivityIndicator color={'#fff'} />}
              </Text>
            </Pressable>

            <View style={styles.Register}>
              <Text style={styles.NewRegisterText}>
                New to Delhi-Motors-Garage?{' '}
              </Text>
              <Pressable onPress={() => navigation.navigate('SignUp')}>
                <Text style={styles.RegisterText}>Register</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Login;

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
    // color: '#328a48',
    color: 'black',
    fontWeight: '700',
    // textAlign:'center'
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

  Register: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: responsiveHeight(3),
    justifyContent: 'center',
  },
  NewRegisterText: {
    fontWeight: '500',
  },

  RegisterText: {
    color: '#009ade',
    fontWeight: '700',
  },

  Skip: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: responsiveHeight(3),
    backgroundColor: '#ff8f81',
    width: responsiveWidth(20),
    borderRadius: responsiveWidth(2),
    alignSelf: 'center',
    padding: responsiveWidth(1.7),
    width: responsiveWidth(25),
  },

  SkipText: {
    fontSize: responsiveFontSize(2),
    color: 'white',
    fontWeight: '600',
  },
});
