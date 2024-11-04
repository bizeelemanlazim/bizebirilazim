import {View} from 'react-native';
import React, {useState} from 'react';
import {Colors} from '../../../util/Base';
import ShadowBox from '../../../component/ShadowBox';
import ContentHeader from '../../../component/employer/ContentHeader';
import History from '../../../component/jobseeker/History';
import CustomButton from '../../../component/CustomButton';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import EducationAddPopup from './EducationAddPopup';

export default function EducationInfo() {
  const [showModal, setShowModal] = useState(false);

  return (
    <View>
      <ShadowBox style={{paddingHorizontal: 20}}>
        <ContentHeader
          title="Eğitimler"
          text="Özgeçmişinde gözükecek eğitim bilgilerini ekleyebilirsin."
          icon={
            <SimpleLineIcons
              name="graduation"
              size={25}
              style={{color: Colors.Gray2}}
            />
          }
          btnPlusOnPress={() => setShowModal(true)}
        />
        <History
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
      <EducationAddPopup visible={showModal} setModalVisible={setShowModal} />
    </View>
  );
}
