import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {Colors} from '../../../util/Base';
import ShadowBox from '../../../component/ShadowBox';
import ContentHeader from '../../../component/employer/ContentHeader';
import Octicons from 'react-native-vector-icons/Octicons';
import Feather from 'react-native-vector-icons/Feather';
import CustomInput from '../../../component/CustomInput';
import CustomButton from '../../../component/CustomButton';
import SmsVerificationPopup from './SmsVerificationPopup';

export default function BankInfo() {
  const [showModal, setShowModal] = useState(false);

  return (
    <View style={{marginBottom: 40}}>
      <ShadowBox style={{paddingHorizontal: 20}}>
        <ContentHeader
          title="Banka Bilgileri"
          text="Banka bilgilerini girebilirsin."
          icon={
            <Octicons
              name="credit-card"
              size={25}
              style={{color: Colors.Gray2}}
            />
          }
        />
        <Text style={{marginTop: 10, fontSize: 13, color: Colors.Purple}}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa
          mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla,
          mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis
          tellus.
        </Text>
        <CustomInput
          name="Banka Adı"
          placeholder="Banka Adı"
          required={false}
          style={{marginTop: 20}}
        />
        <CustomInput
          name="Şube"
          placeholder="Şube"
          required={false}
          style={{marginTop: 30}}
        />
        <CustomInput
          name="Şube Kodu"
          placeholder="Şube Kodu"
          required={false}
          style={{marginTop: 30}}
        />
        <CustomInput
          name="Hesap no"
          placeholder="Hesap no"
          required={false}
          style={{marginTop: 30}}
        />
        <CustomInput
          name="IBAN"
          placeholder="Iban"
          required={false}
          style={{marginTop: 30}}
        />
      </ShadowBox>
      <ShadowBox style={{paddingHorizontal: 20}}>
        <ContentHeader
          title="Kimlik Bilgileri"
          text="Kimlik bilgilerini girebilirsin."
          icon={
            <Feather name="clipboard" size={25} style={{color: Colors.Gray2}} />
          }
        />
        <Text style={{marginTop: 10, fontSize: 13, color: Colors.Purple}}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa
          mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla,
          mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis
          tellus.
        </Text>
        <CustomInput
          name="TC Kimlik No"
          placeholder="TC Kimlik No"
          required={false}
          style={{marginTop: 20}}
        />
        <CustomInput
          name="TC Kimlik Seri No"
          placeholder="TC Kimlik Seri No"
          required={false}
          style={{marginTop: 30}}
        />
        <CustomInput
          name="Son Geçerlilik Tarihi"
          placeholder="Son Geçerlilik Tarihi"
          required={false}
          style={{marginTop: 30}}
        />
        <CustomInput
          name="Veren Makam"
          placeholder="Veren Makam"
          required={false}
          style={{marginTop: 30}}
        />
        <CustomInput
          name="Anne Adı"
          placeholder="Anne Adı"
          required={false}
          style={{marginTop: 30}}
        />
        <CustomInput
          name="Baba Adı"
          placeholder="Baba Adı"
          required={false}
          style={{marginTop: 30}}
        />
        <CustomInput
          name="Yerleşim Yeri Barkod Kodu"
          placeholder="Yerleşim Yeri Barkod Kodu"
          required={false}
          style={{marginTop: 30}}
        />
        <CustomInput
          name="Sabıka Kaydı Barkod No"
          placeholder="Sabıka Kaydı Barkod No"
          required={false}
          style={{marginTop: 30}}
        />
      </ShadowBox>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 20,
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
        }}>
        <Text style={{width: '50%'}}>
          Değişiklikleri kaydetmek için sms doğrulaması gerekmektedir!
        </Text>
        <View style={{flexDirection: 'row'}}>
          <CustomButton fill={false} text="Geri" />
          <CustomButton
            fill={true}
            text="Kaydet"
            style={{marginLeft: 5}}
            onPress={() => setShowModal(true)}
          />
        </View>
      </View>
      <SmsVerificationPopup
        visible={showModal}
        setModalVisible={setShowModal}
      />
    </View>
  );
}
