import {View, Text} from 'react-native';
import React from 'react';

export default function Breadcrumbs({list = [], style = {}}) {
  if (!list || !(list.length > 0)) return null;

  return (
    <View style={[{flexDirection: 'row', marginVertical: 10}, style]}>
      {list?.map((item, index) => {
        return (
          <>
            <Text
              style={
                index < list.length - 1
                  ? {color: '#24292E', opacity: 0.4}
                  : {color: 'black'}
              }>
              {item}
            </Text>
            {index < list.length - 1 && (
              <Text
                style={{marginHorizontal: 5, color: '#24292E', opacity: 0.4}}>
                {'>'}
              </Text>
            )}
          </>
        );
      })}
    </View>
  );
}
