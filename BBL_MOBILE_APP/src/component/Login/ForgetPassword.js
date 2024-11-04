import {View, Text} from 'react-native';
import React from 'react';
import { Colors } from '../../util/Base'

export default function ForgetPassword({ style={} }) {
  return (
    <View style={[{alignItems: 'center', width: '100%'}, style]}>
      <Text style={{color: Colors.Blue, fontWeight: 'bold', fontSize: 13}}>
        Şifremi Unuttum
      </Text>
    </View>
  );
}
