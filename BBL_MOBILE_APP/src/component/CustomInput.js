import {View, TextInput, Platform} from 'react-native';
import React from 'react';
import {Colors} from '../util/Base'
import CustomInputHeader from './CustomInputHeader';

export default function CustomInput({
  name,
  placeholder,
  text,
  setText,
  secureTextEntry = false,
  errMessage,
  style = {},
  required = true,
  multiline = false,
  numberoflines = 1,
}) {
  return (
    <View style={style}>
      <CustomInputHeader
        name={name}
        required={required}
        errMessage={errMessage}
      />
      <TextInput
        value={text}
        onChangeText={txt => setText(txt)}
        placeholder={placeholder}
        placeholderTextColor={Colors.Gray}
        secureTextEntry={secureTextEntry}
        multiline={multiline}
        numberOfLines={Platform.OS === 'ios' ? null : numberoflines}
        minHeight={(Platform.OS === 'ios' && numberoflines) ? (20 * numberoflines) : null}
        style={{
          top: 10,
          backgroundColor: 'white',
          fontSize: 20,
          padding: 10,
          borderRadius: 10,
          color: "black",
          textAlignVertical: "top",

          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.29,
          shadowRadius: 4.65,

          elevation: 7,
        }}
      />
    </View>
  );
}
