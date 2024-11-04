import {View, Text, TextInput} from 'react-native';
import React from 'react';
import {Colors} from '../../util/Base';
import CustomInputHeader from '../CustomInputHeader';

export default function PhoneNumTextInput({
  name = 'Telefon Numarası',
  placeholder = 'Telefon Numarası',
  style = {},
  phone,
  setPhone,
  errMessage,
  required = true,
}) {
  return (
    <View style={style}>
      <CustomInputHeader
        name={name}
        required={required}
        errMessage={errMessage}
      />
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          alignItems: 'center',
          paddingLeft: 5,
          borderRadius: 5,
          height: 50,

          top: 10,
          backgroundColor: 'white',
          fontSize: 20,
          borderRadius: 10,

          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.29,
          shadowRadius: 4.65,

          elevation: 7,
        }}>
        <Text style={{fontSize: 25}}>🇹🇷</Text>
        <TextInput
          value={'+90'}
          style={{marginLeft: 5, color: 'black', fontSize: 20}}
          editable={false}
        />
        <View
          style={{
            marginLeft: 10,
            borderRightWidth: 2,
            height: 30,
            borderColor: Colors.Gray,
          }}
        />
        <TextInput
          style={{
            marginLeft: 10,
            color: 'black',
            width: '100%',
            fontSize: 20,
          }}
          placeholder={placeholder}
          value={phone}
          onChangeText={setPhone}
          placeholderTextColor={Colors.Gray}
        />
      </View>
    </View>
  );
}
