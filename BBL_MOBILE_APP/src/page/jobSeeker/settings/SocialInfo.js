import {View, ImageBackground, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {Colors} from '../../../util/Base';
import ShadowBox from '../../../component/ShadowBox';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ContentHeader from '../../../component/employer/ContentHeader';
import CustomButton from '../../../component/CustomButton';
import CustomInput from '../../../component/CustomInput';

export default function SocialInfo() {
  return (
    <View style={{marginBottom: 40}}>
      <ShadowBox style={{paddingHorizontal: 20}}>
        <ContentHeader
          title="Sosyal Medya"
          text="Sosyal medya bilgilerini girebilirsin."
          icon={
            <Feather name="book-open" size={25} style={{color: Colors.Gray2}} />
          }
        />

        <View style={{flexDirection: 'row', marginTop: 30}}>
          <View style={[styles.socialView, {backgroundColor: '#337FFF'}]}>
            <FontAwesome name="facebook" style={{color: 'white'}} size={20} />
          </View>
          <View style={styles.inputView}>
            <CustomInput
              name="Facebook kullanıcı adı"
              placeholder="Facebook kullanıcı adı"
              required={false}
            />
          </View>
        </View>

        <View style={{flexDirection: 'row', marginTop: 30}}>
          <View style={[styles.socialView, {backgroundColor: '#FF0000'}]}>
            <FontAwesome
              name="youtube-play"
              style={{color: 'white'}}
              size={20}
            />
          </View>
          <View style={styles.inputView}>
            <CustomInput
              name="Youtube kullanıcı adı"
              placeholder="kullanıcı adı"
              required={false}
            />
          </View>
        </View>

        <View style={{flexDirection: 'row', marginTop: 30}}>
          <ImageBackground
            source={require('../../../resource/instaBg.png')}
            style={[styles.socialView]}>
            <FontAwesome name="instagram" style={{color: 'white'}} size={25} />
          </ImageBackground>
          <View style={styles.inputView}>
            <CustomInput
              name="İnstagram kullanıcı adı"
              placeholder="kullanıcı adı"
              required={false}
            />
          </View>
        </View>

        <View style={{flexDirection: 'row', marginTop: 30}}>
          <View style={[styles.socialView, {backgroundColor: '#33CCFF'}]}>
            <FontAwesome name="twitter" style={{color: 'white'}} size={20} />
          </View>
          <View style={styles.inputView}>
            <CustomInput
              name="Twitter kullanıcı adı"
              placeholder="kullanıcı adı"
              required={false}
            />
          </View>
        </View>

        <View style={{flexDirection: 'row', marginTop: 30}}>
          <View style={[styles.socialView, {backgroundColor: '#006699'}]}>
            <FontAwesome name="linkedin" style={{color: 'white'}} size={20} />
          </View>
          <View style={styles.inputView}>
            <CustomInput
              name="Linkedin kullanıcı adı"
              placeholder="kullanıcı adı"
              required={false}
            />
          </View>
        </View>
      </ShadowBox>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 20,
          justifyContent: 'flex-end',
        }}>
        <CustomButton fill={false} text="Geri" />
        <CustomButton fill={true} text="Ileri" style={{marginLeft: 5}} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  socialView: {
    width: 40,
    height: 40,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputView: {
    marginLeft: 10,
    flex: 1,
  },
});
