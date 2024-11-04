import {View, Text, Image, Platform} from 'react-native';
import React from 'react';

export default function Header() {
  return (
    <View
      style={{
        height: Platform.OS === 'ios' ? 100 : 50,
        backgroundColor: '#00B2FF',
        width: '100%',
        borderBottomRightRadius: 60,
        marginBottom: 10
      }}>
      <View style={{height: 50, top: Platform.OS === 'ios' ? 50 : 5, marginHorizontal: 20}}>
        <Image
          source={require('../../resource/HeaderIcon.png')}
          style={{height: 40, width: 40}}
        />
      </View>
    </View>
  );
}
