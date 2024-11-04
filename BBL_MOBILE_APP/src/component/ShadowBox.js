import {View} from 'react-native';
import React from 'react';

export default function ShadowBox({children, style = {}, onPress = () => {}}) {
  return (
    <View
      style={[
        {
          marginTop: 20,
          backgroundColor: 'white',
          borderRadius: 20,
          paddingTop: 20,
          paddingBottom: 30,

          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.29,
          shadowRadius: 4.65,

          elevation: 7,
        },
        style,
      ]}
      onTouchEnd={onPress}>
      {children}
    </View>
  );
}
