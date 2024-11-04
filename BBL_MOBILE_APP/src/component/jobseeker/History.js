import {View, Text} from 'react-native';
import React from 'react';
import {Colors} from '../../util/Base';
import CustomButton from '../CustomButton';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome'

export default function History({lText, rTitle, rSubtitle, rContent, score, lTxtStyle={}}) {
  return (
    <View style={{flexDirection: 'row', marginTop: 20}}>
      <View style={{flex: 1}}>
        <Text style={[{color: Colors.Blue2}, lTxtStyle]}>{lText}</Text>
      </View>
      <View style={{flex: 3, marginLeft: 5}}>
        {score && GetScore(score)}
        {rTitle && <Text style={{color: 'black'}}>{rTitle}</Text>}
        {rSubtitle && <Text style={{color: Colors.Purple}}>{rSubtitle}</Text>}
        {rContent && <Text style={{color: Colors.Purple}}>{rContent}</Text>}
      </View>
      <View>
        <CustomButton
          fill={true}
          icon={<Octicons name="pencil" size={20} style={{color: 'white'}} />}
        />
        <CustomButton
          fill={true}
          icon={<AntDesign name="delete" size={19} style={{color: 'white'}} />}
          style={{marginTop: 5}}
        />
      </View>
    </View>
  );
}

function GetScore(score) {
  return (
    <View style={{flex: 1, justifyContent: 'flex-start', flexDirection: 'row'}}>
      {score != 0 &&
        [0, 1, 2, 3, 4].map((x) => (
          <FontAwesome
            name={x < score ? 'star' : 'star-o'}
            style={{
              color: x < score ? Colors.Blue2 : Colors.Gray,
              marginLeft: 1,
            }}
            size={17}
          />
        ))}
    </View>
  );
}
