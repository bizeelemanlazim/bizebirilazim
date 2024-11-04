import {View, Text, Modal, StyleSheet, ScrollView} from 'react-native';
import React, {useState} from 'react';
import ModalHeader from '../../../component/ModalHeader';
import CustomInput from '../../../component/CustomInput';
import CustomDatePicker from '../../../component/CustomDatePicker';
import CustomSwitch from '../../../component/CustomSwitch';
import CustomButton from '../../../component/CustomButton';

export default function EducationAddPopup({visible, setModalVisible}) {
  const [stillWork, setStillWork] = useState(true);
  const [leaving, setLeaving] = useState(false);

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
                title="Eğitim Bilgisi Ekle"
                setModalVisible={setModalVisible}
              />

              <CustomInput
                style={{marginTop: 20}}
                name="Okul"
                placeholder="Okul ismi"
                required={false}
              />
              <CustomInput
                style={{marginTop: 30}}
                name="Bölüm"
                placeholder="Bölüm ismi"
                required={false}
              />
              <CustomInput
                style={{marginTop: 30}}
                name="Çalışma Şekli"
                placeholder="Çalışma Şekli"
                required={false}
              />
              <CustomDatePicker
                name="Başlangıç Tarihi"
                required={false}
                style={{marginTop: 30}}
                placeholder="Tarih sec"
              />
              <CustomDatePicker
                name="Mezuniyet Tarihi"
                required={false}
                style={{marginTop: 30}}
                placeholder="Tarih sec"
              />
              <CustomSwitch
                style={{marginTop: 30}}
                text="Devam Ediyor"
                value={stillWork}
                setValue={setStillWork}
              />
              <CustomSwitch
                style={{marginTop: 5}}
                text="Terk"
                value={leaving}
                setValue={setLeaving}
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
