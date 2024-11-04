import {View, Platform, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from '../util/Base';
import {useNavigation} from '@react-navigation/native';

export default function Header() {
  const navigation = useNavigation();

  return (
    <View
      style={{
        height: Platform.OS === 'ios' ? 100 : 50,
        backgroundColor: '#F6F8FF',
        width: '100%',
        marginBottom: 10,
        borderBottomWidth: 1,
        borderColor: Colors.Gray,
      }}>
      <View
        style={{
          height: 50,
          top: Platform.OS === 'ios' ? 50 : 0,
          marginHorizontal: 20,
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Image
          source={require('../resource/bbl.png')}
          style={{width: '45%'}}
          resizeMode="contain"
        />
        <TouchableOpacity onPress={navigation.openDrawer}>
          <Icon name="menu" size={30} style={{color: 'black'}} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
