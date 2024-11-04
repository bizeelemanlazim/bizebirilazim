import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Colors, Util, Const, Global, Req} from '../../../util/Base';
import CustomInput from '../../../component/CustomInput';
import PhoneNumTextInput from '../../../component/Login/PhoneNumTextInput';

import CustomDropDown from '../../../component/CustomDropDown';
import ShadowBox from '../../../component/ShadowBox';
import {observer} from 'mobx-react';

function PersonalInformation({data, dataClone, setData, setSelectedTabIndex}) {
  const [err, setErr] = useState({});

  const setDataValue = (key, value) => setData({...data, [key]: value});

  const [districtData, setDistrictData] = useState([]);

  const setCity = async val => {
    setDataValue("districtId", null);
    setDataValue("cityId", val);
    let res = await Req.GetDistricts({cityId: val});
    setDistrictData([...res]);
  };

  const getData = async () => {
    await Util.loadUtils([Const.UTILS.GetCities]);
  };

  useEffect(() => {
    getData();
  }, []);

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
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{fontSize: 20, color: 'black'}}>
                {dataClone?.firstName}{' '}
              </Text>
              <Text style={{color: Colors.Blue2, fontSize: 20}}>
                {dataClone?.lastName}
              </Text>
            </View>
            <Text style={{color: Colors.BlueGolge, fontSize: 10}}>
              {dataClone?.commercialTitle}
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
          text={data?.firstName}
          setText={txt => setDataValue('firstName', txt)}
          errMessage={err?.firstName}
        />
        <CustomInput
          style={styles.inputMargin}
          name="Soyad"
          placeholder="Soyad"
          text={data?.lastName}
          setText={txt => setDataValue('lastName', txt)}
          errMessage={err?.lastName}
        />
        <CustomInput
          style={styles.inputMargin}
          name="Eposta"
          placeholder="Eposta"
          text={data?.email}
          setText={txt => setDataValue('email', txt)}
          errMessage={err?.email}
        />
        <CustomInput
          name="Ticari Ünvan"
          placeholder="Ünvan"
          style={styles.inputMargin}
          text={data?.commercialTitle}
          setText={txt => setDataValue('commercialTitle', txt)}
          errMessage={err?.commercialTitle}
        />
        <PhoneNumTextInput
          phone={data?.phoneNumber}
          style={styles.inputMargin}
          setPhone={txt => setDataValue('phoneNumber', txt)}
          errMessage={err?.phoneNumber}
        />
        <CustomInput
          name="Vergi No"
          placeholder="Vergi No"
          style={styles.inputMargin}
          text={data?.taxNumber}
          setText={txt => setDataValue('taxNumber', txt)}
          errMessage={err?.taxNumber}
        />
        <CustomInput
          name="Vergi Dairesi"
          placeholder="Vergi Dairesi"
          style={styles.inputMargin}
          text={data?.taxOffice}
          setText={txt => setDataValue('taxOffice', txt)}
          errMessage={err?.taxOffice}
        />
        <CustomInput
          name="Ticaret Sicil No"
          placeholder="Ticaret Sicil No"
          style={styles.inputMargin}
          text={data?.recordNumber}
          setText={txt => setDataValue('recordNumber', txt)}
          errMessage={err?.recordNumber}
        />
        <CustomInput
          name="Mersis No"
          placeholder="Mersis No"
          style={styles.inputMargin}
          text={data?.mersisNumber}
          setText={txt => setDataValue('mersisNumber', txt)}
          errMessage={err?.mersisNumber}
        />
        <CustomDropDown
          name="İl"
          value={data?.cityId}
          setValue={setCity}
          style={styles.inputMargin}
          required={false}
          items={JSON.parse(JSON.stringify(Global.Store.cities))}
        />
        <CustomDropDown
          name="İlçe"
          value={data?.districtId}
          setValue={val => setDataValue('districtId', val)}
          style={styles.inputMargin}
          required={false}
          items={districtData}
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
          onPress={() => setSelectedTabIndex(1)}>
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

export default observer(PersonalInformation);
