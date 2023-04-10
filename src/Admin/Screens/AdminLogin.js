import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import firestore from '@react-native-firebase/firestore';

const AdminLogin = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading,setLoading]=useState(false)
  const UserLogin = async () => {
    const users = await firestore().collection('admin').get();
    if (
      email === users.docs[0]._data.email &&
      password === users.docs[0]._data.password
    ) {
      navigation.navigate('Dashboard');
    } else {
      alert('Invalid email or pass');
      // console.warn(email)
    }
    console.log(users.docs[0]._data);
  };
  return (
    <View style={styles.MainContainer}>
      <Text style={styles.AdminText}>Admin Login</Text>
      <TextInput
        placeholder="Enter Username"
        style={styles.TextInput}
        onChangeText={text => setEmail(text)}
        value={email}
      />
      <TextInput
        placeholder="Enter Password"
        style={styles.TextInput}
        onChangeText={text => setPassword(text)}
        value={password}
      />
      <TouchableOpacity
        style={styles.LoginButton}
        onPress={() => {
          if (email !== '' && password !== '') {
            setLoading(true)
            UserLogin();
          } else {
            alert('please Enter Details');
          }
        }}>
        {/* <Text style={styles.LoginText}>Login</Text> */}
        <Text style={styles.LoginText}>
              {!isLoading ? 'Login' : <ActivityIndicator color={'#fff'} />}
            </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AdminLogin;

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
  },
  AdminText: {
    fontSize: responsiveFontSize(4),
    color: 'black',
    fontWeight: '700',
    alignSelf: 'center',
    marginTop: responsiveHeight(8),
    marginBottom: responsiveHeight(5),
  },
  TextInput: {
    borderWidth: 1,
    margin: responsiveWidth(3),
    padding: responsiveWidth(3),
    borderRadius: responsiveWidth(2),
    width: '90%',
    alignSelf: 'center',
    marginTop: responsiveHeight(2),
  },

  LoginButton: {
    backgroundColor: 'orange',
    width: '90%',
    alignSelf: 'center',
    borderRadius: responsiveWidth(2),
    justifyContent: 'center',
    alignItems: 'center',
    height: responsiveHeight(6),
    marginTop: responsiveHeight(4),
  },

  LoginText: {
    fontSize: responsiveFontSize(2.5),
    fontWeight: '600',
  },
});
