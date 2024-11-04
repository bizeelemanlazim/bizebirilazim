import {View, Text, Switch} from 'react-native';
import React from 'react';
import {Colors} from '../util/Base';

export default function CustomSwitch({text, value, setValue, style={}} ) {
  return (
    <View
      style={[{
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
      }, style]}>
      <Switch
        style={{
          transform: [{scaleX: 0.7}, {scaleY: 0.7}],
          marginLeft: -12,
        }}
        trackColor={{
          false: Colors.SwitchDisableBackground,
          true: Colors.Blue2,
        }}
        onValueChange={setValue}
        value={value}
      />
      {text && <Text style={{fontSize: 15, color: 'black'}}>{text}</Text>}
    </View>
  );
}
