import {View, Text, Image} from 'react-native';
import React from 'react';
import {Colors} from '../util/Base';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

export default function CustomDrawer(props) {
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          backgroundColor: Colors.Blue,
          height: 200,
          alignItems: 'center',
          paddingTop: 50,
          paddingHorizontal: 10,
          flexDirection: 'row',
        }}>
        <Image
          source={require('../resource/examplepp.png')}
          style={{
            width: 60,
            height: 60,
            borderRadius: 50,
            borderWidth: 2,
            borderColor: 'white',
          }}
        />
        <Text
          style={{
            fontWeight: '600',
            color: 'white',
            fontSize: 20,
            marginLeft: 5,
          }}>
          Adem{' '}
        </Text>
        <Text
          style={{fontWeight: '600', color: Colors.BlueGolge, fontSize: 20}}>
          Şimşek
        </Text>
      </View>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    </View>
  );
}
