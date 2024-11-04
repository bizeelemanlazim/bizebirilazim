import {View, ScrollView, Text} from 'react-native';
import React, {useState} from 'react';
import {Colors} from '../../../util/Base';
import Header from '../../../component/Header';
import Breadcrumbs from '../../../component/Breadcrumbs';
import CustomTabs from '../../../component/CustomTabs';
import PersonalInfo from './PersonalInfo';
import ExperienceInfo from './ExperienceInfo';
import EducationInfo from './EducationInfo';
import AbilityInfo from './AbilityInfo';
import SocialInfo from './SocialInfo';
import BankInfo from './BankInfo';

export default function Settings() {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  return (
    <View style={{backgroundColor: Colors.BackgroundColor, flex: 1}}>
      <Header />
      <ScrollView>
        <View style={{paddingHorizontal: 20}}>
          <Breadcrumbs list={['Anasayfa', 'İş Arayan Profili', 'Ayarlar']} />
          <CustomTabs
            list={['Kişisel', 'Deneyim', 'Eğitim', 'Beceri', 'Sosyal', 'Banka']}
            selectedIndex={selectedTabIndex}
            setSelectedIndex={setSelectedTabIndex}
          />
          {selectedTabIndex == 0 && <PersonalInfo />}
          {selectedTabIndex == 1 && <ExperienceInfo />}
          {selectedTabIndex == 2 && <EducationInfo />}
          {selectedTabIndex == 3 && <AbilityInfo />}
          {selectedTabIndex == 4 && <SocialInfo />}
          {selectedTabIndex == 5 && <BankInfo />}
        </View>
      </ScrollView>
    </View>
  );
}
