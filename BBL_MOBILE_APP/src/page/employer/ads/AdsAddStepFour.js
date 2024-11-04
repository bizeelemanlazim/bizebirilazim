import {View, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Colors, Global, Util} from '../../../util/Base';
import ContentHeader from '../../../component/employer/ContentHeader';
import Octicons from 'react-native-vector-icons/Octicons';
import CustomButton from '../../../component/CustomButton';

export default function AdsAddStepFour({setActiveIndex, data, lastPageData}) {
  return (
    <View style={{marginBottom: 40}}>
      <ContentHeader
        title="Sipariş Özeti"
        text="Yayın için sipariş özetin."
        icon={<Octicons name="note" size={27} style={{color: Colors.Gray2}} />}
        style={{marginTop: 20}}
      />
      <View style={{marginTop: 20}}>
        <Text style={{fontWeight: 'bold', color: 'black'}}>Meslek:</Text>
        <Text style={{color: 'black'}}>{lastPageData.jobName}</Text>
        <Text style={{fontWeight: 'bold', color: 'black'}}>
          Çalışma Süresi:
        </Text>
        <Text style={{color: 'black'}}>
          {lastPageData.operationTime}
        </Text>
        <Text style={{fontWeight: 'bold', color: 'black'}}>Lokasyon:</Text>
        <Text style={{color: 'black'}}>
          {lastPageData.location}
        </Text>
        <Text style={{fontWeight: 'bold', color: 'black'}}>Hakediş:</Text>
        <Text style={{color: 'black'}}>{lastPageData.progressPayment}</Text>
        <Text style={{fontWeight: 'bold', color: 'black'}}>
          Yasal Kesintiler:
        </Text>
        <Text style={{color: 'black'}}>{lastPageData.legalDeduction}</Text>
        <Text style={{fontWeight: 'bold', color: 'black'}}>
          Komisyon Bedeli:
        </Text>
        <Text style={{color: 'black'}}>{lastPageData.commissionFee}</Text>
      </View>
      <View style={{flexDirection: 'row', marginTop: 30}}>
        <CustomButton
          fill={false}
          text="Geri"
          btnStyle={{paddingHorizontal: 20}}
          txtStyle={{fontSize: 20}}
          onPress={() => setActiveIndex(2)}
        />
        <CustomButton
          style={{marginLeft: 5}}
          fill={true}
          text="Sonraki Adım"
          btnStyle={{paddingHorizontal: 20}}
          txtStyle={{fontSize: 20}}
        />
      </View>
    </View>
  );
}
