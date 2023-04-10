import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Pressable,
  ScrollView,
  ActivityIndicator,
  Alert
} from 'react-native';
import React, {useState} from 'react';
import emailpng from '../image/email.png';
import lock from '../image/padlock.png';
import user from '../image/user.png';
import Signup from '../image/SignUp.png';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const SignUp = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const AddingDoc = () => {
    if (!name || name.length < 3) {
      setNameError(true);
    } else {
      setNameError(false);
    }
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

    if (
      !name ||
      name.length < 3 ||
      !email ||
      !email.includes('@') ||
      !password ||
      password.length < 8
    ) {
      return false;
    }

    setIsLoading(true)

    firestore()
      .collection('Users')
      .add({
        name: name,
        email: email,
        password: password,
      })
      .then(() => {
        
        console.log('User added!');
        SignUpUser();
      });
  };

  const SignUpUser = () => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        setIsLoading(false)
        console.log('User account created');
        Alert.alert('Account is Created Now Login')
        navigation.goBack();
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
          setIsLoading(false)
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
          // console.log(error.code[0])
          setEmailError(true)
          setIsLoading(false)
        }

        console.error(error);
      });
    // AddingDoc();
  };

  return (
    <View style={styles.MainContainer}>
      <ScrollView>
        <View style={styles.img}>
          <Image source={Signup} style={styles.img1} />

          <View style={styles.LoginDetails}>
            <Text style={styles.LoginText}>Sign up</Text>

            <View
              style={[
                styles.InputThings,
                {borderBottomColor: nameError ? 'red' : 'grey'},
              ]}>
              <Image
                source={user}
                style={[
                  {width: responsiveWidth(6), height: responsiveWidth(6)},
                  {tintColor: nameError ? 'red' : 'black'},
                ]}
              />
              <TextInput
                style={styles.Input1}
                placeholder="Full Name"
                onChangeText={text => setName(text)}
                value={name}
              />
            </View>
            {nameError ? (
              <Text style={{color: 'red'}}>
                Please Enter Valid Name Or must be 3 Character
              </Text>
            ) : null}
            <View
              style={[
                styles.InputThings,
                {borderBottomColor: nameError ? 'red' : 'grey'},
              ]}>
              <Image
                source={emailpng}
                style={[
                  {width: responsiveWidth(6), height: responsiveWidth(6)},
                  {tintColor: nameError ? 'red' : 'black'},
                ]}
              />
              <TextInput
                style={styles.Input1}
                placeholder="Email Id"
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
                {borderBottomColor: nameError ? 'red' : 'grey'},
              ]}>
              <Image
                source={lock}
                style={[
                  {width: responsiveWidth(6), height: responsiveWidth(6)},
                  {tintColor: nameError ? 'red' : 'black'},
                ]}
              />
              <TextInput
                style={styles.Input1}
                placeholder="Password"
                secureTextEntry={true}
                onChangeText={text => setPassword(text)}
                value={password}
              />
            </View>
            {passwordError ? (
              <Text style={{color: 'red'}}>
                Please Enter Valid Password Or should 8 length
              </Text>
            ) : null}
            <TouchableOpacity style={styles.LoginButton} onPress={AddingDoc}>
              <Text style={styles.LoginButtonText}>
                {!isLoading ? 'SIGN UP' : <ActivityIndicator color={'#fff'} />}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  img1: {
    //   width: responsiveWidth(78),
    height: responsiveWidth(78),
    alignSelf: 'center',
    resizeMode: 'contain',
    width: '100%',
  },

  img: {
    width: '90%',
    alignSelf: 'center',
    marginBottom:responsiveHeight(4)
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
    marginTop: responsiveHeight(1.7),
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
    color: 'blue',
    fontWeight: '700',
  },

  Skip: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: responsiveHeight(3),
    // borderWidth:responsiveWidth(0.1),
    backgroundColor: 'orange',
    width: responsiveWidth(20),
    borderRadius: responsiveWidth(2),
    alignSelf: 'center',
  },

  SkipText: {
    fontSize: responsiveFontSize(2),
    // color:'white',
    fontWeight: '600',
  },
});
