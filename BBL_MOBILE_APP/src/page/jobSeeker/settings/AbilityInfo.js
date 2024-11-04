import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {Colors} from '../../../util/Base';
import ShadowBox from '../../../component/ShadowBox';
import ContentHeader from '../../../component/employer/ContentHeader';
import History from '../../../component/jobseeker/History';
import CustomButton from '../../../component/CustomButton';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import CustomHr from '../../../component/Login/CustomHr';
import AbilityAddPopup from './AbilityAddPopup';
import CertificateAddPopup from './CertificateAddPopup';

export default function AbilityInfo() {
  const [showAbilityModal, setShowAbilityModal] = useState(false);
  const [showCertificateModal, setShowCertificateModal] = useState(false);

  return (
    <View style={{marginBottom: 40}}>
      <ShadowBox style={{paddingHorizontal: 20}}>
        <ContentHeader
          title="Beceri ve Nitelikler"
          text="Özgeçmişinde gözükecek beceri ve nitelik bilgilerini ekleyebilirsin."
          icon={
            <Feather name="book-open" size={25} style={{color: Colors.Gray2}} />
          }
        />
        <View
          style={{
            flexDirection: 'row',
            marginTop: 10,
            justifyContent: 'space-between',
          }}>
          <CustomButton
            fill={true}
            text="Yeni Sertifika Ekle"
            icon={<Entypo name="plus" style={{color: 'white'}} size={18} />}
            onPress={() => setShowCertificateModal(true)}
          />
          <CustomButton
            fill={true}
            text="Yeni Beceri Ekle"
            icon={<Entypo name="plus" style={{color: 'white'}} size={18} />}
            onPress={() => setShowAbilityModal(true)}
          />
        </View>
        <Text style={{marginTop: 15, fontSize: 20, color: Colors.BlueGolge}}>
          Beceriler
        </Text>
        <History
          lTxtStyle={{fontSize: 12}}
          lText="Adobe Programları"
          score={4}
          rSubtitle="Ocak 2017 - Aralık 2020"
          rContent="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et
          massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien
          fringilla, mattis ligula consectetur, ultrices mauris. Maecenas
          vitae mattis tellus."
        />
        <CustomHr width="100%" style={{marginVertical: 10}} />
        <Text style={{marginTop: 15, fontSize: 20, color: Colors.BlueGolge}}>
          Sertifikalar
        </Text>
        <History
          lTxtStyle={{fontSize: 12}}
          lText="Görsel İletişim Tasarımı"
          rTitle="Atılım Üniversitesi"
          rSubtitle="Ocak 2017 - Aralık 2020"
          rContent="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et
          massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien
          fringilla, mattis ligula consectetur, ultrices mauris. Maecenas
          vitae mattis tellus."
        />
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
      <AbilityAddPopup
        visible={showAbilityModal}
        setModalVisible={setShowAbilityModal}
      />
      <CertificateAddPopup
        visible={showCertificateModal}
        setModalVisible={setShowCertificateModal}
      />
    </View>
  );
}
