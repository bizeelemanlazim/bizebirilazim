import {View, Text, Image, Platform} from 'react-native';
import React, {useState} from 'react';
import {Colors} from '../../util/Base';
import Header from '../../component/Header';
import Breadcrumbs from '../../component/Breadcrumbs';
import ShadowBox from '../../component/ShadowBox';
import CustomHr from '../../component/Login/CustomHr';
import Octicons from 'react-native-vector-icons/Octicons';
import Feather from 'react-native-vector-icons/Feather';
import CustomCheckBox from '../../component/CustomCheckBox';

export default function JobSummaryOld() {
  return (
    <View style={{backgroundColor: Colors.BackgroundColor, flex: 1}}>
      <Header />
      <Breadcrumbs
        list={['Anasayfa', 'İlanlarım', 'Geçmiş İş Özeti']}
        style={{marginHorizontal: 20}}
      />
      <Image
        source={require('../../resource/background.png')}
        style={{width: '100%', height: 55, position: 'absolute', top: Platform.OS === "ios" ? 150 : 100}}
      />
      <View style={{paddingHorizontal: 20}}>
        <Text style={{color: 'white', alignSelf: 'center', marginTop: 10}}>
          Geçmiş İş Özeti
        </Text>
        <ShadowBox
          style={{
            width: '100%',
            alignSelf: 'center',
            backgroundColor: 'white',
            height: 50,
            borderRadius: 10,
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 10,
          }}>
          <Image
            source={require('../../resource/examplepp.png')}
            style={{height: 60, width: 60, left: 15, top: -5}}
          />
          <View style={{left: 25, height: 20, marginBottom: 10}}>
            <View style={{flexDirection: 'row'}}>
              <Text style={{ color: "black" }}>Adem </Text>
              <Text style={{color: Colors.Blue2}}>Şimşek</Text>
            </View>
            <Text style={{color: Colors.BlueGolge}}>Dijital Tasarımcı</Text>
          </View>
        </ShadowBox>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Octicons name="person" size={18} style={{ color: "black" }}/>
          <Text style={{marginLeft: 5, color: "black"}}>Erkek</Text>
          <Feather name="calendar" size={18} style={{marginLeft: 15, color: "black"}} />
          <Text style={{marginLeft: 5, color: "black"}}>27</Text>
          <Octicons name="home" size={18} style={{marginLeft: 15, color: "black"}} />
          <Text style={{marginLeft: 5, color: "black"}}>Türk</Text>
          <Octicons name="location" size={18} style={{marginLeft: 15, color: "black"}} />
          <Text style={{marginLeft: 5, color: "black"}}>Ankara/Batıkent</Text>
        </View>
        <View style={{flexDirection: 'row', marginTop: 15}}>
          <Text style={{color: Colors.Purple}}>Meslek: </Text>
          <Text style={{color: Colors.Grayscale}}>Dijital Tasarımcı</Text>
        </View>
        <ShadowBox style={{marginBottom: 20}}>
          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: 10,
              marginBottom: 20,
              alignItems: 'center',
            }}>
            <Text style={{flex: 2, color: Colors.Purple}}>Lokasyon</Text>
            <Text style={{flex: 1, color: Colors.Purple}}>Hakediş</Text>
            <Text style={{flex: 1, color: Colors.Purple}}>
              Yasal Kesintiler
            </Text>
            <Text style={{flex: 1, color: Colors.Purple}}>Komisyon Bedeli</Text>
          </View>
          <CustomHr width="100%" />
          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: 10,
              marginTop: 20,
              alignItems: 'center',
            }}>
            <Text style={{flex: 2, color: Colors.Purple}}>Ankara/Batıkent</Text>
            <Text style={{flex: 1, color: Colors.Purple}}>3243</Text>
            <Text style={{flex: 1, color: Colors.Purple}}>5435</Text>
            <Text style={{flex: 1, color: Colors.Purple}}>7635</Text>
          </View>
        </ShadowBox>
        <CustomCheckBox text="Geçici İş Sözleşmesi" />
        <CustomCheckBox text="İşçi Muvafakatnamesi" style={{ marginTop: 10}} />
        <CustomCheckBox text="İşçi Tebliği" style={{ marginTop: 10}} />
      </View>
    </View>
  );
}
