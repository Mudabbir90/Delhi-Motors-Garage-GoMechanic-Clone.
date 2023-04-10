import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

const {height: SCREEN_HEIGHT} = Dimensions.get('window');

const BottomSheet = () => {
  const translateY = useSharedValue(0);

  const context = useSharedValue({y: 0});

  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = {y: translateY.value};
    })
    .onUpdate(event => {
      translateY.value = event.translationY + context.value.y;
    });
  const rBottomSheetStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: translateY.value}],
    };
  });
  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.MainContainer, rBottomSheetStyle]}>
        <View style={styles.Line}></View>
      </Animated.View>
    </GestureDetector>
  );
};

export default BottomSheet;

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    // height: responsiveHeight(50),
    height: SCREEN_HEIGHT,
    width: '100%',
    backgroundColor: 'orange',
    position: 'absolute',
    top: SCREEN_HEIGHT / 1.5,
    borderRadius: 20,
  },
  Line: {
    width: responsiveWidth(25),
    height: responsiveHeight(0.5),
    backgroundColor: 'grey',
    alignSelf: 'center',
    marginVertical: responsiveHeight(2),
    borderRadius: 10,
  },
});
