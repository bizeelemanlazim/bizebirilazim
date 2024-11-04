import {View, Text, Image} from 'react-native';
import React from 'react';
import {Colors} from '../../util/Base';

export default function LoginHeaderText({header, text, style={}}) {
  return (
    <View style={style}>
      <View style={{alignItems: 'center', marginTop: 10, marginBottom: 25}}>
        <Image
          source={require('../../resource/bbl.png')}
          style={{width: '80%', height: 60}}
          resizeMode="contain"
        />
      </View>
      <Text
        style={{
          fontWeight: 'bold',
          fontSize: 22,
          color: Colors.Grayscale,
        }}>
        {header}
      </Text>
      <Text style={{top: 6, fontSize: 17, color: "black"}}>{text}</Text>
    </View>
  );
}
