import React from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { Colors } from '../util/Base'

export default function CustomCheckBox({textComponent, text, style={}, value = false, onChange}) {
  return (
    <BouncyCheckbox
      style={style}
      isChecked={value}
      fillColor={Colors.Blue}
      unfillColor="white"
      onPress={onChange}
      innerIconStyle={{
        borderRadius: 8,
        borderWidth: 3,
        borderColor: Colors.Gray,
      }}
      iconStyle={{borderRadius: 8}}
      textComponent={textComponent}
      text={text}
      textStyle={{textDecorationLine: 'none', color: 'black'}}
    />
  );
}
