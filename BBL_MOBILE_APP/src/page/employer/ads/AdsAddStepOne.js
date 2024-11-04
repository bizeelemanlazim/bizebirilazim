import {View, Text, Image} from 'react-native';
import React from 'react';
import {Colors} from '../../../util/Base';
import ContentHeader from '../../../component/employer/ContentHeader';
import Octicons from 'react-native-vector-icons/Octicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomButton from '../../../component/CustomButton';
import {useNavigation} from '@react-navigation/native';
import ShadowBox from '../../../component/ShadowBox';
import Circle from '../../../component/Circle';

const arry = [
  {
    img: '',
    title: "Bi'İlan",
    text: 'İlan Paketi',
    thirtyDay: true,
    adFee: true,
    smartEmployment: false,
    smartPayment: false,
  },
  {
    img: '',
    title: "Bi'Destek",
    text: 'İlan Paketi',
    thirtyDay: true,
    adFee: true,
    smartEmployment: false,
    smartPayment: true,
  },
  {
    img: '',
    title: "Bi'Eleman",
    text: 'İlan Paketi',
    thirtyDay: true,
    adFee: true,
    smartEmployment: true,
    smartPayment: false,
  },
  {
    img: '',
    title: "Bi'İstihdam",
    text: 'İlan Paketi',
    thirtyDay: true,
    adFee: true,
    smartEmployment: true,
    smartPayment: true,
  },
];

export default function AdsAddStepOne({setActiveIndex, data, setDataValue}) {
  const navigation = useNavigation();

  return (
    <View style={{marginBottom: 40}}>
      <ContentHeader
        title="Paket Seçimi"
        text="Yayınlanacak olan ilanın için kendine en uygun paketi seç."
        icon={<Octicons name="home" size={27} style={{color: Colors.Gray2}} />}
        style={{marginTop: 20}}
      />
      <View>
        {arry.map((item, index) => {
          return (
            <ShadowBox
              style={[
                {
                  flexDirection: 'row',
                  width: '100%',
                  backgroundColor: Colors.Blue4,
                  padding: 10,
                  alignItems: 'center',
                },
                data?.workType == (index + 1) && {borderColor: Colors.Blue, borderWidth: 1},
              ]}
              onPress={() => setDataValue('workType', (index + 1))}>
              <View
                style={{
                  width: '50%',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Circle bgColor="white" cap={70}>
                  <Image
                    source={require('../../../resource/employment.png')}
                    style={{height: 50, width: 50}}
                    resizeMode="contain"
                  />
                </Circle>
                <View style={{marginLeft: 10}}>
                  <Text
                    style={{
                      marginBottom: 5,
                      color: Colors.BlueGolge,
                      fontWeight: '600',
                    }}>
                    {item.title}
                  </Text>
                  <Text style={{color: Colors.BlueGolge, fontWeight: '600'}}>
                    {item.text}
                  </Text>
                </View>
              </View>
              <View style={{width: '50%'}}>
                <View
                  style={{
                    flexDirection: 'row',
                    marginBottom: 5,
                    alignItems: 'center',
                  }}>
                  <AntDesign
                    name={item.thirtyDay ? 'checkcircleo' : 'closecircleo'}
                    style={{color: Colors.BlueGolge}}
                  />
                  <Text style={{color: Colors.BlueGolge, marginLeft: 5}}>
                    30 Günlük Süre
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginBottom: 5,
                    alignItems: 'center',
                  }}>
                  <AntDesign
                    name={item.adFee ? 'checkcircleo' : 'closecircleo'}
                    style={{color: Colors.BlueGolge}}
                  />
                  <Text style={{color: Colors.BlueGolge, marginLeft: 5}}>
                    İlan Ücreti
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginBottom: 5,
                    alignItems: 'center',
                  }}>
                  <AntDesign
                    name={
                      item.smartEmployment ? 'checkcircleo' : 'closecircleo'
                    }
                    style={{color: Colors.BlueGolge}}
                  />
                  <Text style={{color: Colors.BlueGolge, marginLeft: 5}}>
                    Akıllı İstihdam Hiz.
                  </Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <AntDesign
                    name={item.smartPayment ? 'checkcircleo' : 'closecircleo'}
                    style={{color: Colors.BlueGolge}}
                  />
                  <Text style={{color: Colors.BlueGolge, marginLeft: 5}}>
                    Akıllı Ödeme Hiz.
                  </Text>
                </View>
              </View>
            </ShadowBox>
          );
        })}
      </View>
      <View style={{flexDirection: 'row', marginTop: 20}}>
        <CustomButton
          fill={false}
          text="Geri"
          btnStyle={{paddingHorizontal: 20}}
          txtStyle={{fontSize: 20}}
          onPress={navigation.goBack}
        />
        <CustomButton
          style={{marginLeft: 5}}
          fill={true}
          text="Sonraki Adım"
          btnStyle={{paddingHorizontal: 20}}
          txtStyle={{fontSize: 20}}
          onPress={() => setActiveIndex(1)}
        />
      </View>
    </View>
  );
}
