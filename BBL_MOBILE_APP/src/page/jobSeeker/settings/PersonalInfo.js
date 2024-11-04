import {
  View,
  Text,
  Image,
  Switch,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React, {useState} from 'react';
import {Colors} from '../../../util/Base';
import ShadowBox from '../../../component/ShadowBox';
import Icon from 'react-native-vector-icons/Ionicons';

import Cities from '../../../util/Cities';
import CustomDropDown from '../../../component/CustomDropDown';
import CustomInput from '../../../component/CustomInput';
import PhoneNumTextInput from '../../../component/Login/PhoneNumTextInput';
import CustomDatePicker from '../../../component/CustomDatePicker';
import DisabledSettingsPopup from './DisabledSettingsPopup';

const maritalStatusData = [
  {label: 'Bekar', value: 0},
  {label: 'Evli', value: 1},
];

const genderData = [
  {label: 'A sinifi', value: 0},
  {label: 'B sinifi', value: 1},
];

const drivingLicenceData = [
  {label: 'Erkek', value: 0},
  {label: 'Kadin', value: 1},
];

const nationalityData = [{label: 'Turk', value: 0}];

export default function PersonalInfo() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [data, setData] = useState({
    name: 'Adem',
    surname: 'Şimşek',
    email: 'adem@gmail.com',
    phone: '1111111111',
    phone2: ''
  });
  const [err, setErr] = useState({});

  const setDataValue = (key, value) => setData({...data, [key]: value});

  const [city, setCity] = useState(16);
  const [district, setDistrict] = useState(16);
  const [maritalStatus, setMaritalStatus] = useState(0);
  const [gender, setGender] = useState(0);
  const [birthday, setBirthday] = useState(null);
  const [birthdayLoc, setBirthdayLoc] = useState(0);
  const [drivingLicence, setDrivingLicence] = useState(1);
  const [nationality, setNationality] = useState(0);

  const [showDisabledModal, setShowDisabledModal] = useState(false);

  return (
    <View>
      <ShadowBox style={{paddingHorizontal: 20}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={require('../../../resource/examplepp.png')}
            style={{height: 80, width: 80}}
            resizeMode="contain"
          />
          <View style={{flex: 1, paddingLeft: 10}}>
            <View style={{flexDirection: 'row'}}>
              <Text style={{fontSize: 20, color: 'black'}}>Adem </Text>
              <Text style={{color: Colors.Blue2, fontSize: 18}}>Şimşek</Text>
            </View>
            <Text style={{color: Colors.BlueGolge, fontSize: 10}}>
              Dijital Tasarimci
            </Text>
          </View>
          <View style={{alignItems: 'flex-end'}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Switch
                style={{transform: [{scaleX: 0.7}, {scaleY: 0.7}], right: -5}}
                trackColor={{
                  false: Colors.SwitchDisableBackground,
                  true: Colors.Blue2,
                }}
                onValueChange={val => setIsEnabled(val)}
                value={isEnabled}
              />
              <TouchableOpacity onPress={() => setShowDisabledModal(true)}>
                <Icon
                  name="settings-outline"
                  size={15}
                  style={{color: Colors.Blue2}}
                />
              </TouchableOpacity>
            </View>
            <Text style={{fontSize: 10, color: 'black', marginRight: 10}}>
              Engelliyim
            </Text>
          </View>
        </View>
        <Text
          style={{
            marginTop: 20,
            fontWeight: 'bold',
            fontSize: 17,
            color: 'black',
          }}>
          Kişisel Bilgiler
        </Text>
        <CustomInput
          style={styles.inputMargin}
          name="Ad"
          placeholder="İsim"
          text={data?.name}
          setText={txt => setDataValue('name', txt)}
          errMessage={err?.name}
        />
        <CustomInput
          style={styles.inputMargin}
          name="Soyad"
          placeholder="Soyad"
          text={data?.surname}
          setText={txt => setDataValue('surname', txt)}
          errMessage={err?.surname}
        />
        <CustomInput
          style={styles.inputMargin}
          name="Eposta"
          placeholder="Eposta"
          text={data?.email}
          setText={txt => setDataValue('email', txt)}
          errMessage={err?.email}
        />
        <PhoneNumTextInput
          phone={data?.phone}
          style={styles.inputMargin}
          setPhone={txt => setDataValue('phone', txt)}
          errMessage={err?.phone}
        />
        <PhoneNumTextInput
          name="İkinci Telefon Numarasi"
          placeholder="İkinci Telefon Numarasi"
          phone={data?.phone2}
          style={styles.inputMargin}
          setPhone={txt => setDataValue('phone2', txt)}
          required={false}
        />
        <CustomDropDown
          name="Medeni Durum"
          value={maritalStatus}
          setValue={setMaritalStatus}
          style={styles.inputMargin}
          required={false}
          items={maritalStatusData}
        />
        <CustomDropDown
          name="Cinsiyet"
          value={gender}
          setValue={setGender}
          style={styles.inputMargin}
          required={false}
          items={genderData}
        />
        <CustomDatePicker
          name="Doğum Tarihi"
          placeholder="Tarih seç"
          required={false}
          text={birthday}
          setText={setBirthday}
          style={styles.inputMargin}
        />
        <CustomDropDown
          name="Doğum Yeri"
          value={birthdayLoc}
          setValue={setBirthdayLoc}
          style={{marginTop: 40}}
          required={false}
          items={Cities}
        />
        <CustomDropDown
          name="Ehliyet"
          value={drivingLicence}
          setValue={setDrivingLicence}
          style={styles.inputMargin}
          required={false}
          items={drivingLicenceData}
        />
        <CustomDropDown
          name="Uyruk"
          value={nationality}
          setValue={setNationality}
          style={styles.inputMargin}
          required={false}
          items={nationalityData}
        />

        <CustomDropDown
          name="İl"
          value={city}
          setValue={setCity}
          style={styles.inputMargin}
          required={false}
          items={Cities}
        />
        <CustomDropDown
          name="İlçe"
          value={district}
          setValue={setDistrict}
          style={styles.inputMargin}
          required={false}
          items={Cities}
        />
        <CustomInput
          name="Adres"
          placeholder="Adres"
          style={styles.inputMargin}
          text={data?.address}
          setText={txt => setDataValue('address', txt)}
          errMessage={err?.mersisno}
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
          onPress={() => alert('ileri')}>
          <Text style={{color: 'white', fontSize: 15}}>İleri</Text>
        </TouchableOpacity>
      </View>
      <DisabledSettingsPopup
        visible={showDisabledModal}
        setModalVisible={setShowDisabledModal}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputMargin: {
    marginTop: 30,
  },
});
