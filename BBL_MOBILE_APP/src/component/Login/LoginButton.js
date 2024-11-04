import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {Colors} from '../../util/Base';
import {useNavigation} from '@react-navigation/native';

export default function LoginButton({fullscreen = false, style = {}, onPressFullScreen}) {
  const navigation = useNavigation();

  if (fullscreen)
    return (
      <TouchableOpacity
        style={[
          {
            width: '100%',
            backgroundColor: Colors.Blue,
            alignItems: 'center',
            padding: 10,
            borderRadius: 5,
          },
          style,
        ]}
        onPress={onPressFullScreen}>
        <Text style={{color: 'white', fontSize: 15}}>Giriş Yap</Text>
      </TouchableOpacity>
    );

  return (
    <TouchableOpacity
      style={[
        {
          borderColor: Colors.Blue,
          borderWidth: 1,
          alignItems: 'center',
          padding: 10,
          borderRadius: 5,
        },
        style,
      ]}
      onPress={() => navigation.navigate('Login')}>
      <Text style={{color: Colors.Blue, fontSize: 13}}>Giriş Yap</Text>
    </TouchableOpacity>
  );
}
