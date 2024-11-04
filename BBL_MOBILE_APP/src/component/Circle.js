import {View, Text} from 'react-native';
import React from 'react';

export default function Circle({cap, bgColor, children, style={}}) {
  return (
    <View
      style={[{
        height: cap,
        width: cap,
        backgroundColor: bgColor,
        borderRadius: (cap / 2),
        justifyContent: 'center',
        alignItems: 'center',
      }, style]}>
        {children}
      </View>
  );
}
