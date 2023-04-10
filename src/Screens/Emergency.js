import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import Header from '../../Component/Header';
import ExportImage from '../../Component/ExportImage';
import gall from '../image/gall.png';
import capturePlus from '../image/capturePlus.png';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
const Emergency = () => {
  const route = useRoute();
  //   console.log(route.params.item);
  return (
    <View style={styles.MainContainer}>
      {/* <Header lefticon={ExportImage.backKey} title={route.params.name}/> */}
      <View style={styles.Container}>
        <View style={styles.CarsDataBox}>
          <View style={styles.CarsData}>
            <Image source={route.params.icon} style={styles.ImgIcon} />
            <Text style={styles.CarsDataText}>{route.params.name}</Text>
          </View>
          <View style={styles.TextData}>
            <Text style={styles.HeadingText}>{route.params.item.heading}</Text>
            <Text style={styles.DesText}>{route.params.item.description}</Text>

            <Text style={styles.DesTextDOT}>{route.params.item.des1}</Text>
            <Text style={styles.DesTextDOT}>{route.params.item.des2}</Text>
            <Text style={styles.DesTextDOT}>{route.params.item.des3}</Text>
          </View>
        </View>

        <View style={styles.UploadViewContainer}>
          <Text style={{color: 'black'}}>Upload Pictures (Optional)</Text>
          <View style={styles.UploadView}>
            <TouchableOpacity>
              <Image source={capturePlus} style={styles.UploadImg} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={gall} style={styles.UploadImg} />
            </TouchableOpacity>
          </View>
          <View style={styles.AdvancePayView}>
            <Text style={styles.AdvancePayText}>₹100 Advance Payment</Text>
            <Text>This will be deducted from your final bill.</Text>
          </View>
        </View>

        <View style={styles.PayMethodView}>
          <TouchableOpacity style={styles.SelectPayView}>
            <Text style={styles.SelectPayViewTExt}>Select Payment Method</Text>
            <Text style={styles.SelectPayViewTExt}>{`>`}</Text>
          </TouchableOpacity>
          <View style={styles.LineVIew}>
            <View>
              <Text style={styles.LineVIewTExt}>Base Price - ₹800</Text>
              <Text>Additional Service may cost extra</Text>
            </View>
            <TouchableOpacity>
              <View style={styles.PAYButtonView}>
                <Text style={styles.PAYButtonText}>PAY ₹100</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Emergency;

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  Container: {
    width: '90%',
    alignSelf: 'center',
    marginTop: responsiveHeight(2),
  },
  CarsDataBox: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#009ade',
    backgroundColor: '#e8f4fa',
    padding: responsiveWidth(2),
  },
  ImgIcon: {
    width: responsiveWidth(12),
    height: responsiveWidth(12),
    backgroundColor: 'white',
    borderRadius: responsiveWidth(10),
  },
  CarsData: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  CarsDataText: {
    fontSize: responsiveFontSize(2),
    fontWeight: '500',
    color: 'black',
    paddingLeft: responsiveWidth(4),
  },
  HeadingText: {
    color: 'black',
    fontSize: responsiveFontSize(1.8),
    marginBottom: responsiveHeight(0.7),
  },
  TextData: {
    padding: responsiveWidth(2),
    marginTop: responsiveHeight(1),
  },
  DesText: {
    marginBottom: responsiveHeight(0.7),
    fontSize: responsiveFontSize(1.6),
  },
  DesTextDOT: {
    fontSize: responsiveFontSize(1.6),
  },
  UploadView: {
    flexDirection: 'row',
    marginTop: responsiveHeight(1),
  },
  UploadImg: {
    width: responsiveWidth(6),
    height: responsiveWidth(6),
    tintColor: '#009ade',
    marginHorizontal: responsiveWidth(1),
  },
  UploadViewContainer: {
    marginTop: responsiveHeight(2),
  },
  AdvancePayView: {
    width: '100%',
    height: responsiveHeight(8.5),
    backgroundColor: '#e8f4fa',
    borderColor: '#009ade',
    borderWidth: 1,
    borderRadius: 10,
    marginTop: responsiveHeight(1),
    justifyContent: 'center',
    alignItems: 'center',
  },
  AdvancePayText: {
    color: 'black',
    fontWeight: '500',
    fontSize: responsiveFontSize(1.8),
  },
  PayMethodView: {
    marginTop: responsiveHeight(2),
    width: '100%',
    borderColor: '#009ade',
    borderWidth: 1,
    borderRadius: 5,
    // height: responsiveHeight(10),
    // borderStyle: 'dashed',
  },
  LineVIew: {
    borderStyle: 'dashed',
    borderTopWidth: 1,
    borderColor: 'grey',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: responsiveWidth(2),
  },
  PAYButtonView: {
    width: responsiveWidth(24),
    backgroundColor: '#009ade',
    height: responsiveHeight(6),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: responsiveWidth(2),
    borderRadius: 7,
  },
  PAYButtonText: {
    fontSize: responsiveFontSize(2),
    color: 'white',
    fontWeight: '600',
  },
  LineVIewTExt: {
    color: 'black',
    fontWeight: '600',
    fontSize: responsiveFontSize(1.9),
  },
  SelectPayView:{
    padding:responsiveWidth(2),
    flexDirection:'row',justifyContent:'space-between'
  },
  SelectPayViewTExt:{
    fontSize:responsiveFontSize(1.8),
    color:'black',
    fontWeight:'500',
  },
});
