import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Colors, Req, Global, Util, Const} from '../../../util/Base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomDropDown from '../../../component/CustomDropDown';
import CustomInput from '../../../component/CustomInput';
import ShadowBox from '../../../component/ShadowBox';
import ContentHeader from '../../../component/employer/ContentHeader';

const currentYear = new Date().getFullYear();
const range = (start, stop, step) =>
  Array.from({length: (stop - start) / step + 1}, (_, i) => {
    let x = start + i * step;
    return {label: x, value: x};
  });
const yearLst = range(currentYear, currentYear - 100, -1);
const numOfEmployeesLst = [
  {label: '0-20', value: '0-20'},
  {label: '20-50', value: '20-50'},
  {label: '50-100', value: '50-100'},
];
const activityAreaLst = [
  {label: 'Teknoloji', value: 'Teknoloji'},
  {label: 'Saglik', value: 'Saglik'},
];
const capitalLst = [
  {label: '0-9000₺', value: 0},
  {label: '9000-50000₺', value: 1},
];
const companyTypeLst = [
  {label: 'Teknoloji', value: 'Teknoloji'},
  {label: 'Saglik', value: 'Saglik'},
];

export default function CompanyInfo({data, setData, setSelectedTabIndex}) {
  const [year, setYear] = useState(currentYear);
  const [numEmployees, setNumEmployees] = useState(numOfEmployeesLst[0].value);
  const [activityArea, setActivityArea] = useState('Teknoloji');
  const [capital, setCapital] = useState(0);
  const [companyType, setCompanyType] = useState('Teknoloji');
  const [summaryInfo, setSummaryInfo] = useState('');

  const [err, setErr] = useState({});

  return (
    <View>
      <ShadowBox style={{paddingHorizontal: 20}}>
        <ContentHeader
          title="Firma Bilgileri"
          text="Firma bilgilerinizi giriniz."
          icon={
            <Icon
              name="office-building-outline"
              size={30}
              style={{color: Colors.Gray2}}
            />
          }
        />
        <CustomDropDown
          name="Kuruluş Yılı"
          value={year}
          setValue={setYear}
          style={styles.inputMargin}
          required={false}
          items={yearLst}
        />
        <CustomDropDown
          name="Çalışan Sayısı"
          value={numEmployees}
          setValue={setNumEmployees}
          style={styles.inputMargin}
          items={numOfEmployeesLst}
          errMessage={err?.numEmployees}
        />
        <CustomDropDown
          name="Faaliyet Alanı"
          value={activityArea}
          setValue={setActivityArea}
          style={styles.inputMargin}
          items={activityAreaLst}
          errMessage={err?.activityArea}
        />
        <CustomDropDown
          name="Sermaye"
          value={capital}
          setValue={setCapital}
          style={styles.inputMargin}
          items={capitalLst}
          errMessage={err?.capital}
        />
        <CustomDropDown
          name="Şirket Türü"
          value={companyType}
          setValue={setCompanyType}
          style={styles.inputMargin}
          items={companyTypeLst}
          errMessage={err?.companyType}
        />
        <CustomInput
          name="Özet Bilgi"
          placeholder="Özet Bilgi"
          style={styles.inputMargin}
          text={summaryInfo}
          setText={setSummaryInfo}
          errMessage={err?.summaryInfo}
          multiline={true}
          numberoflines={5}
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
          onPress={() => setSelectedTabIndex(2)}>
          <Text style={{color: 'white', fontSize: 15}}>İleri</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputMargin: {
    marginTop: 20,
  },
});
