import {
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Colors} from '../../../util/Base';
import ShadowBox from '../../../component/ShadowBox';
import ContentHeader from '../../../component/employer/ContentHeader';
import Octicons from 'react-native-vector-icons/Octicons';
import CustomButton from '../../../component/CustomButton';
import ExperienceAddPopup from './ExperienceAddPopup';
import History from '../../../component/jobseeker/History';

export default function ExperienceInfo() {
  const [showExperienceAddModal, setShowExperienceModal] = useState(false);

  return (
    <View>
      <ShadowBox style={{paddingHorizontal: 20}}>
        <ContentHeader
          title="Deneyimler"
          text="Özgeçmişinde gözükecek iş tecrübelerini ekleyebilirsin."
          icon={
            <Octicons
              name="briefcase"
              size={25}
              style={{color: Colors.Gray2}}
            />
          }
          btnPlusOnPress={() => setShowExperienceModal(true)}
        />
        <History
          lText="Junior Designer"
          rTitle="Ayparasun Dijital Ajans"
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
      <ExperienceAddPopup
        visible={showExperienceAddModal}
        setModalVisible={setShowExperienceModal}
      />
    </View>
  );
}
