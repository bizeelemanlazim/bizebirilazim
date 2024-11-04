import {View, Text} from 'react-native';
import React from 'react';
import CustomButton from './CustomButton';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function ModalHeader({setModalVisible, title}) {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <View style={{flex: 1}} />
      <View style={{flex: 7, alignItems: 'center'}}>
        <Text style={{fontSize: 17}}>{title}</Text>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'flex-end',
        }}>
        <CustomButton
          fill={true}
          icon={<AntDesign name="close" style={{color: 'white'}} size={20} />}
          btnStyle={{paddingHorizontal: 5}}
          onPress={() => setModalVisible(false)}
        />
      </View>
    </View>
  );
}
