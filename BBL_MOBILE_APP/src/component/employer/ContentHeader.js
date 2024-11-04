import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Circle from '../Circle';
import {Colors} from '../../util/Base';
import CustomButton from '../CustomButton';
import Entypo from 'react-native-vector-icons/Entypo';

export default function ContentHeader({
  icon,
  title,
  text,
  style = {},
  btnPlusOnPress=false,
}) {
  return (
    <View style={[{flexDirection: 'row', alignItems: 'center'}, style]}>
      <Circle cap={60} bgColor={Colors.Blue3Opacity}>
        <Circle cap={50} bgColor={Colors.Blue3}>
          {icon}
        </Circle>
      </Circle>
      <View style={{marginLeft: 10, flex: 1}}>
        <Text style={{fontSize: 13, color: Colors.BlueGolge, marginBottom: 5}}>
          {title}
        </Text>
        <Text style={{fontSize: 13, color: 'black'}}>{text}</Text>
      </View>
      {btnPlusOnPress && (
        <View>
          <CustomButton 
            fill={true}
            btnStyle={{ paddingHorizontal: 5 }}
            icon={<Entypo name="plus" style={{color: 'white'}} size={25} />}
            onPress={btnPlusOnPress}
          />
        </View>
      )}
    </View>
  );
}
