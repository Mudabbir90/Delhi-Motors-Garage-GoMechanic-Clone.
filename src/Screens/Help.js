import {StyleSheet, Text, View, Image, Pressable, Linking} from 'react-native';
import React from 'react';
import Oval from '../image/Oval.png';
import whatsapp from '../image/whatsapp.png';
import phone_call from '../image/phone_call.png';
import mail_open from '../image/mail_open.png';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Header from '../../Component/Header';

const Help = () => {

  return (
    <View style={styles.mainContainer}>
      <Header title={'Help & Support'}/>
      <View style={styles.Container}>
        <View style={styles.HalfBox}>
          <Text style={styles.BoxText}>
            Have a question or comments about Delhi Motors Garage?
          </Text>
          <Text style={styles.BoxText}>
            Get in Touch with the team in your area.
          </Text>
        </View>

        <View style={{marginTop: responsiveHeight(2)}}>
          <Pressable
            onPress={() =>
              Linking.openURL(
                'https://www.google.com/maps/place/DELHI+MOTORS+GARAGE/@24.454803,86.0014018,18.25z/data=!4m15!1m8!3m7!1s0x39f3ea1bc4ec15a9:0x74d4a1f1bd62788b!2sKhorimahua,+Jharkhand+825412!3b1!8m2!3d24.4553792!4d86.0057789!16s%2Fg%2F11fz9hy_gn!3m5!1s0x39f3eb13e296889f:0xb293d9483f8cf586!8m2!3d24.4559417!4d86.00078!16s%2Fg%2F11n981sbsq',
              )
            }>
            <View style={styles.SubBox}>
              <View style={{flexDirection: 'row'}}>
                <Image
                  source={Oval}
                  style={{
                    height: responsiveWidth(8),
                    resizeMode: 'contain',
                    width: responsiveHeight(5),
                    tintColor:'#009ade'
                  }}
                />
                <Text style={styles.headText}>Location:</Text>
              </View>
              <View>
                <Text style={{marginLeft: responsiveWidth(11), color: 'black'}}>
                  B-75, Khorimahua, Giridih, Jharkhand, 825412,india
                </Text>
              </View>
            </View>
          </Pressable>

          <Pressable
            onPress={() =>
              Linking.openURL(
                'mailto:support@example.com?subject=SendMail&body=Description',
              )
            }>
            <View style={styles.SubBox}>
              <View style={{flexDirection: 'row'}}>
                <Image
                  source={mail_open}
                  style={{
                    height: responsiveWidth(8),
                    resizeMode: 'contain',
                    width: responsiveHeight(5),
                    tintColor:'#009ade'
                  }}
                />
                <Text style={styles.headText}>Email:</Text>
              </View>
              <Text style={{marginLeft: responsiveWidth(11), color: 'black'}}>
                support@gmail.com
              </Text>
            </View>
          </Pressable>

          <Pressable onPress={() => Linking.openURL(`tel:${+91 - 8709233583}`)}>
            <View style={styles.SubBox}>
              <View style={{flexDirection: 'row'}}>
                <Image
                  source={phone_call}
                  style={{
                    height: responsiveWidth(8),
                    resizeMode: 'contain',
                    width: responsiveHeight(5),
                    tintColor:'#009ade'
                  }}
                />
                <Text style={styles.headText}>Phone:</Text>
              </View>
              <Text style={{marginLeft: responsiveWidth(11), color: 'black'}}>
                +91-8709233583 (Emergency Service)
              </Text>
            </View>
          </Pressable>

          
            <View style={styles.ReferButton}>
              <Pressable style={styles.whatsappRow} onPress={() =>
              Linking.openURL(
                'https://wa.me/+918709233583'
              )
            }>
                <View styles>
                  <Image
                    source={whatsapp}
                    style={{
                      height: responsiveWidth(10),
                      width: responsiveWidth(10),
                    }}
                  />
                </View>
                <Text style={styles.WhastappReferText}>Contact Me Now</Text>
              </Pressable>
            </View>
          
        </View>
      </View>
    </View>
  );
};

export default Help;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#d3eaf5',
  },
  Container: {
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 20,
    height: '80%',
    elevation: 5,
    width:'85%',
    alignSelf:'center',
  },
  HalfBox: {
    backgroundColor: '#009ade',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: responsiveHeight(22),
    borderBottomRightRadius: 50,
    borderBottomLeftRadius: 50,
    padding: responsiveWidth(5),
  },
  BoxText: {
    fontWeight: '600',
    fontSize: 16,
    color: 'white',
    margin: 10,
    textAlign: 'center',
  },

  SubBox: {
    // marginTop:hp(5),
    marginVertical: responsiveHeight(1),
    marginHorizontal: responsiveWidth(4),
    backgroundColor: 'white',
    // margin:30,
    borderRadius: 10,
    elevation: 5,
    padding: responsiveWidth(3.5),
  },

  headText: {
    // backgroundColor:'grey',
    fontSize: 16,
    fontWeight: '700',
    color: 'black',
    marginLeft: responsiveWidth(2),
    height: responsiveHeight(3),
  },
  ReferButton: {
    backgroundColor: '#03AA1E',
    width: responsiveWidth(50),
    padding: 5,
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: responsiveHeight(2),
  },

  whatsappRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  WhastappReferText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    textAlign: 'center',
  },
  Header:{
    width:'100%',
    backgroundColor:'white',
    height:responsiveHeight(7),
    // alignItems:'center',
    justifyContent:'center',
    paddingLeft:responsiveWidth(3),
    elevation:responsiveWidth(2),
  },
  HeaderText:{
    fontSize:responsiveFontSize(2.3),
    fontWeight:'600',
    color:'black'
  },
});
