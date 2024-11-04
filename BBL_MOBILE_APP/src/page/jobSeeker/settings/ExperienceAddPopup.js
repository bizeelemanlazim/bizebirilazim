import {View, Text, Modal, StyleSheet, ScrollView} from 'react-native';
import React, {useState} from 'react';
import ModalHeader from '../../../component/ModalHeader';
import CustomInput from '../../../component/CustomInput';
import CustomDatePicker from '../../../component/CustomDatePicker';
import CustomSwitch from '../../../component/CustomSwitch';
import CustomButton from '../../../component/CustomButton';

export default function ExperienceAddPopup({visible, setModalVisible}) {
  const [stillWork, setStillWork] = useState(true);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        setModalVisible(!visible);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <ScrollView>
            <View
              style={{
                padding: 20,
                marginBottom: 40,
              }}>
              <ModalHeader
                title="Deneyim Ekle"
                setModalVisible={setModalVisible}
              />

              <CustomInput
                style={{marginTop: 20}}
                name="Çalıştığı Firma"
                placeholder="Firma ismi"
                required={false}
              />
              <CustomInput
                style={{marginTop: 30}}
                name="Meslek"
                placeholder="Meslek ismi"
                required={false}
              />
              <CustomInput
                style={{marginTop: 30}}
                name="Çalışma Şekli"
                placeholder="Çalışma Şekli"
                required={false}
              />
              <CustomDatePicker
                name="İşe Başlama Tarihi"
                required={false}
                style={{marginTop: 30}}
                placeholder="Tarih sec"
              />
              <CustomDatePicker
                name="İşten Çıkış Tarihi"
                required={false}
                style={{marginTop: 30}}
                placeholder="Tarih sec"
              />
              <CustomSwitch
                style={{marginTop: 30}}
                text="Halen Çalışıyorum"
                value={stillWork}
                setValue={setStillWork}
              />
              <CustomInput
                style={{marginTop: 20}}
                name="Açıklama"
                placeholder="Açıklama"
                multiline={true}
                numberoflines={5}
                required={false}
              />
              <CustomButton fill={true} fullscreen={true} text="Kaydet" btnStyle={{ marginTop: 40 }} />
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  modalView: {
    width: '100%',
    height: '100%',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
