import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {Colors} from '../util/Base';

export default function CustomButton({
  fill = false,
  text,
  icon,
  style = {},
  btnStyle = {},
  txtStyle = {},
  fullscreen = false,
  onPress,
}) {
  let inner = (
    <Text
      style={[{color: fill ? 'white' : Colors.Blue, fontSize: 13}, txtStyle]}>
      {text}
    </Text>
  );
  if (icon)
    inner = (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {icon}
        {text && (
          <Text
            style={[
              {
                color: fill ? 'white' : Colors.Blue,
                fontSize: 13,
                marginLeft: 5,
              },
              txtStyle,
            ]}>
            {text}
          </Text>
        )}
      </View>
    );

  let btn = (
    <TouchableOpacity
      style={[
        {
          alignItems: 'center',
          height: 30,
          paddingHorizontal: 10,
          borderRadius: 5,
          justifyContent: 'center',
        },
        btnStyle,
        fill
          ? {
              backgroundColor: Colors.Blue2,
            }
          : {
              borderColor: Colors.Blue2,
              borderWidth: 1,
            },
      ]}
      onPress={onPress}>
      {inner}
    </TouchableOpacity>
  );

  if (fullscreen) return btn;

  return <View style={[{flexWrap: 'wrap'}, style]}>{btn}</View>;
}
