import {View, Text} from 'react-native';
import React from 'react';
import {Colors} from '../util/Base'

export default function CustomInputHeader({name, required = true, errMessage}) {
  return (
    <View style={{flexDirection: 'row', alignItems: "center"}}>
      <Text style={{fontWeight: 'bold', fontSize: 17, color: "black"}}>{name}</Text>
      {required && (
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 17,
            color: Colors.RequiredColor,
            marginLeft: 5,
          }}>
          *
        </Text>
      )}
      {errMessage && (
        <Text
          style={{color: Colors.RequiredColor, fontSize: 12, marginLeft: 5}}>
          {errMessage}
        </Text>
      )}
    </View>
  );
}
