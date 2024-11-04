import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {Colors} from '../../util/Base';

export default function GoogleFacebookLogin() {
  return (
    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10}}>
      <TouchableOpacity
        style={{
          width: '48%',
          backgroundColor: Colors.Blue,
          alignItems: 'center',
          paddingVertical: 5,
          borderRadius: 5,
          flexDirection: 'row',
          paddingHorizontal: 10,
        }}>
        <Image
          source={require('../../resource/login/google.png')}
          style={{marginRight: 5, height: 15, width: 15}}
          resizeMode="contain"
        />
        <Text style={{color: 'white', fontSize: 13}}>Google ile giriş yap</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          width: '48%',
          backgroundColor: Colors.Blue,
          alignItems: 'center',
          paddingVertical: 5,
          borderRadius: 5,
          flexDirection: 'row',
          paddingHorizontal: 10,
        }}>
        <Image
          source={require('../../resource/login/facebook.png')}
          resizeMode="contain"
          style={{marginRight: 5, height: 15, width: 15}}
        />
        <Text style={{color: 'white', fontSize: 13}}>
          Facebook ile giriş yap
        </Text>
      </TouchableOpacity>
    </View>
  );
}
