import {View, ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Colors, Req} from '../../../util/Base';
import Header from '../../../component/Header';
import Breadcrumbs from '../../../component/Breadcrumbs';
import CustomTabs from '../../../component/CustomTabs';
import PersonalInformation from './PersonalInformation';
import CompanyInfo from './CompanyInfo';
import SecurityInfo from './SecurityInfo';

function Settings() {
  const [data, setData] = useState({});
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [dataClone, setDataClone] = useState({});

  const getData = async () => {
    let res = await Req.GetEmployer();
    setDataClone({...res.data});
    setData({...res.data});
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={{backgroundColor: Colors.BackgroundColor, flex: 1}}>
      <Header />
      <ScrollView style={{flex: 1}} nestedScrollEnabled={true}>
        <View style={{paddingHorizontal: 20}}>
          <Breadcrumbs list={['Anasayfa', 'İş Veren Profili', 'Ayarlar']} />

          <CustomTabs
            list={['Kişisel Bilgiler', 'Firma Bilgileri', 'Güvenlik Bilgileri']}
            selectedIndex={selectedTabIndex}
            setSelectedIndex={setSelectedTabIndex}
          />
          {selectedTabIndex == 0 && (
            <PersonalInformation
              data={data}
              dataClone={dataClone}
              setData={setData}
              setSelectedTabIndex={setSelectedTabIndex}
            />
          )}
          {selectedTabIndex == 1 && <CompanyInfo setSelectedTabIndex={setSelectedTabIndex} />}
          {selectedTabIndex == 2 && <SecurityInfo />}
        </View>
      </ScrollView>
    </View>
  );
}

export default Settings;
