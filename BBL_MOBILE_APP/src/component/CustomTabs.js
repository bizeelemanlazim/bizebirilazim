import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {Colors} from '../util/Base';

export default function CustomTabs({
  list = [],
  selectedIndex = 0,
  setSelectedIndex,
}) {
  if (!list || !(list.length > 0)) return null;

  return (
    <View style={{flexDirection: 'row', marginTop: 10}}>
      {list.map((item, index) => {
        return (
          <TouchableOpacity
            style={{alignItems: 'center', marginRight: 10}}
            onPress={() => setSelectedIndex(index)}>
            <Text
              style={{
                color:
                  index == selectedIndex ? Colors.Blue2 : Colors.GrayText,
              }}>
              {item}
            </Text>
            {index == selectedIndex && (
              <View
                style={{
                  borderBottomWidth: 1,
                  width: '70%',
                  marginTop: 5,
                  borderColor: Colors.Blue2,
                }}
              />
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
