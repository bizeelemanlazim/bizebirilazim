import {View, Text} from 'react-native';
import React from 'react';
import Circle from '../Circle';
import {Colors} from '../../util/Base';

export default function Steps({activeindex = 0, count}) {
  if (!(count > 1)) return null;
  let arry = [...Array(count + 1).keys()].slice(1);
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      {arry.map((item, index) => {
        let circ;
        if (index == activeindex) {
          circ = (
            <>
              <Circle cap={50} bgColor={Colors.Blue2Opacity}>
                <Circle cap={40} bgColor={Colors.Blue2}>
                  <Text
                    style={{color: 'white', fontSize: 24, fontWeight: 'bold'}}>
                    {item}
                  </Text>
                </Circle>
              </Circle>
            </>
          );
        } else {
          circ = (
            <>
              <Circle cap={35} bgColor={Colors.Gray}>
                <Text style={{fontSize: 18, color: "black"}}>{item}</Text>
              </Circle>
            </>
          );
        }

        if (item != count)
          return (
            <>
              {circ}
              <View
                style={{
                  borderTopWidth: 2,
                  borderColor: Colors.Gray,
                  width: 30,
                  marginHorizontal: 5,
                  height: 1,
                }}
              />
            </>
          );
        return <>{circ}</>;
      })}
    </View>
  );
}
