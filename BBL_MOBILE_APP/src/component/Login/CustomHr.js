import {View, Text} from 'react-native';
import React from 'react';
import {Colors} from '../../util/Base'

export default function CustomHr({style = {}, width = '35%', text}) {
  if (text)
    return (
      <View
        style={[
          {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          },
          style,
        ]}>
        <View
          style={{
            borderTopWidth: 2,
            borderColor: Colors.Gray,
            width: '35%',
            height: 1,
          }}
        />
        <Text style={{color: Colors.GrayText}}>ya da</Text>
        <View
          style={{
            borderTopWidth: 2,
            borderColor: Colors.Gray,
            width: '35%',
            height: 1,
          }}
        />
      </View>
    );
  return (
    <View
      style={[{
        borderTopWidth: 2,
        borderColor: Colors.Gray,
        width: {width},
        height: 1,
      }, style]}
    />
  );
}
