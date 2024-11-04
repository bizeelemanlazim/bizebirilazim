import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {Colors} from '../../util/Base';
import {useNavigation} from '@react-navigation/native';

export default function JobSeekerButton({fullscreen = false, style = {}, onPressFullScreen, disabled=false}) {
  const navigation = useNavigation();

  if (fullscreen)
    return (
      <TouchableOpacity
        disabled={disabled}
        style={[
          {
            width: '100%',
            backgroundColor: disabled ? Colors.Gray : Colors.Blue,
            alignItems: 'center',
            padding: 10,
            borderRadius: 5,
            marginTop: 20,
          },
          style,
        ]}
        onPress={onPressFullScreen}>
        <Text style={{color: 'white', fontSize: 15}}>Kayıt Ol</Text>
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
      onPress={() => navigation.navigate("JobSeekerRegister")}>
      <Text style={{color: Colors.Blue, fontSize: 13}}>İş Arayan Kayıt</Text>
    </TouchableOpacity>
  );
}
