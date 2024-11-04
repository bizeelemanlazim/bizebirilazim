import {View, Text} from 'react-native';
import React from 'react';
import {Colors} from '../../util/Base'
import Feather from 'react-native-vector-icons/Feather';

export default function ReportBox({ bgColor, title, value, percent }) {
  return (
    <View
      style={{
        backgroundColor: bgColor,
        padding: 15,
        borderRadius: 10,
        width: '48%',
      }}>
      <Text style={{fontWeight: '600', color: "black"}}>{title}</Text>
      <Text style={{fontWeight: 'bold', fontSize: 20, color: "black"}}>{value}</Text>
      <View style={{flexDirection: 'row', marginTop: 5, alignItems: 'center'}}>
        <Text style={{marginRight: 5, color: "black"}}>{percent}</Text>
        <Feather name={percent.includes("+") ? "trending-up" : "trending-down"} size={20} style={{ color: "black" }} />
      </View>
    </View>
  );
}
