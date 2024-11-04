import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {Colors} from '../../../util/Base';
import Circle from '../../../component/Circle';
import Icon from 'react-native-vector-icons/Octicons';
import CustomInput from '../../../component/CustomInput';
import ShadowBox from '../../../component/ShadowBox';
import ContentHeader from '../../../component/employer/ContentHeader';

export default function SecurityInfo() {
  const [data, setData] = useState({email: 'adem@gmail.com'});

  const [err, setErr] = useState({});

  const setDataValue = (key, value) => setData({...data, [key]: value});

  return (
    <View>
      <ShadowBox style={{paddingHorizontal: 20}}>
        <ContentHeader
          title="Güvenlik Bilgileri"
          text="Hesabınızın güvenlik bilgilerini giriniz."
          icon={
            <Icon name="shield-check" size={27} style={{color: Colors.Gray2}} />
          }
        />
        <CustomInput
          style={styles.inputMargin}
          name="Eposta"
          placeholder="Eposta"
          text={data?.email}
          setText={txt => setDataValue('email', txt)}
          errMessage={err?.email}
        />
        <Text style={{marginTop: 30, fontSize: 12, color: "black"}}>
          Mevcut şifrenizi değiştirmek istiyorsanız bu kısmı kullanın:
        </Text>
        <CustomInput
          name="Yeni Şifren"
          placeholder="Yeni Şifren"
          text={data?.newpass}
          setText={txt => setDataValue('newpass', txt)}
          required={false}
          secureTextEntry={true}
        />
        <CustomInput
          style={styles.inputMargin}
          name="Mevcut Şifren"
          placeholder="Mevcut Şifren"
          text={data?.oldpass}
          setText={txt => setDataValue('oldpass', txt)}
          required={false}
          secureTextEntry={true}
        />
      </ShadowBox>
      <View
        style={{
          paddingBottom: 30,
        }}>
        <TouchableOpacity
          style={{
            backgroundColor: Colors.Blue,
            alignItems: 'center',
            padding: 10,
            borderRadius: 5,
            marginTop: 20,
          }}
          onPress={() => alert('sms onayi')}>
          <Text style={{color: 'white', fontSize: 15}}>İleri</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputMargin: {
    marginTop: 30,
  },
});
