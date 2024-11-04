import {View, Text, Button} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Colors, Util, Const, Global, Req} from '../../../util/Base';
import ContentHeader from '../../../component/employer/ContentHeader';
import Octicons from 'react-native-vector-icons/Octicons';
import CustomDropDown from '../../../component/CustomDropDown';
import CustomDatePicker from '../../../component/CustomDatePicker';
import CustomInput from '../../../component/CustomInput';
import CustomButton from '../../../component/CustomButton';
import {observer} from 'mobx-react';

const workingTimes = [
  {label: '1 saat', value: '01:00'},
  {label: '2 saat', value: '02:00'},
  {label: '3 saat', value: '03:00'},
  {label: '4 saat', value: '04:00'},
];

function AdsAddStepTwo({setActiveIndex, data, setDataValue}) {
  const [jobStartDate, setJobStartDate] = useState('');
  const [jobEndDate, setJobEndDate] = useState('');

  const [districtData, setDistrictData] = useState([]);

  const setCity = async val => {
    setDataValue('districtId', null);
    setDataValue('cityId', val);
    let res = await Req.GetDistricts({cityId: val});
    setDistrictData([...res]);
  };

  const getData = async () => {
    await Util.loadUtils([Const.UTILS.GetJobs, Const.UTILS.GetCities]);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={{marginBottom: 40}}>
      <ContentHeader
        title="İlk Detaylar"
        text="Yayınlanacak olan ilanın için kullanıcıların görebileceği iş detaylarını gir."
        icon={<Octicons name="home" size={27} style={{color: Colors.Gray2}} />}
        style={{marginTop: 20}}
      />
      <CustomDropDown
        style={{marginTop: 20}}
        name="Meslek"
        value={data?.jobId}
        setValue={val => setDataValue('jobId', val)}
        items={JSON.parse(JSON.stringify(Global.Store.jobs))}
      />
      <CustomDropDown
        style={{marginTop: 20}}
        name="Mesai Süresi / saat"
        value={data?.workingTime}
        setValue={val => setDataValue('workingTime', val)}
        items={workingTimes}
      />
      <CustomDatePicker
        style={{marginTop: 25}}
        name="İşin Başlama Tarihi"
        placeholder="Tarih seç"
        text={data?.workStartDate}
        setText={val => setDataValue('workStartDate', val)}
      />
      <CustomDatePicker
        style={{marginTop: 25}}
        name="İşin Bitiş Tarihi"
        placeholder="Tarih seç"
        text={data?.workEndDate}
        setText={val => setDataValue('workEndDate', val)}
      />
      <CustomDropDown
        style={{marginTop: 25}}
        name="Mesai Başlama Saati"
        items={[
          {label: '07:00', value: '07:00'},
          {label: '08:00', value: '08:00'},
          {label: '09:00', value: '09:00'},
          {label: '10:00', value: '10:00'},
        ]}
        value={data?.workingStartTime}
        setValue={val => setDataValue('workingStartTime', val)}
      />
      <CustomInput
        style={{marginTop: 25}}
        name="Ücret"
        placeholder="Ücret bilgisi gir"
        text={data?.price}
        setText={txt => setDataValue('price', txt)}
      />
      <CustomDropDown
        style={{marginTop: 25}}
        name="İl"
        value={data?.cityId}
        setValue={setCity}
        items={JSON.parse(JSON.stringify(Global.Store.cities))}
      />
      <CustomDropDown
        style={{marginTop: 20}}
        name="İlçe"
        value={data?.districtId}
        setValue={val => setDataValue('districtId', val)}
        items={districtData}
      />
      <CustomInput
        name="Adres"
        placeholder="Adres"
        style={{marginTop: 25}}
        multiline={true}
        numberoflines={5}
        text={data?.address}
        setText={txt => setDataValue('address', txt)}
      />
      <View style={{flexDirection: 'row', marginTop: 30}}>
        <CustomButton
          fill={false}
          text="Geri"
          btnStyle={{paddingHorizontal: 20}}
          txtStyle={{fontSize: 20}}
          onPress={() => setActiveIndex(0)}
        />
        <CustomButton
          style={{marginLeft: 5}}
          fill={true}
          text="Sonraki Adım"
          btnStyle={{paddingHorizontal: 20}}
          txtStyle={{fontSize: 20}}
          onPress={() => setActiveIndex(2)}
        />
      </View>
    </View>
  );
}

export default observer(AdsAddStepTwo);
