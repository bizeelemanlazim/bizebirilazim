import {View, Modal, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {Colors} from '../../../util/Base';
import ModalHeader from '../../../component/ModalHeader';
import CustomInput from '../../../component/CustomInput';
import CustomInputHeader from '../../../component/CustomInputHeader';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {TouchableOpacity} from 'react-native-gesture-handler';
import CustomButton from '../../../component/CustomButton';
import CustomDatePicker from '../../../component/CustomDatePicker';

export default function CertificateAddPopup({visible, setModalVisible}) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        setModalVisible(!visible);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View
            style={{
              padding: 20,
              marginBottom: 10,
            }}>
            <ModalHeader
              title="Sertifika Bilgisi Ekle"
              setModalVisible={setModalVisible}
            />
            <CustomInput
              name="Sertifika"
              placeholder="Sertifika"
              required={false}
              style={{marginTop: 20}}
            />
            <CustomInput
              name="Veren Kurum"
              placeholder="Veren Kurum"
              required={false}
              style={{marginTop: 30}}
            />
            <CustomDatePicker 
              name="Veriliş Tarihi"
              placeholder="Tarih seç"
              required={false}
              style={{marginTop: 30}}
            />
            <CustomInput
              name="Açıklama"
              placeholder="Açıklama"
              required={false}
              multiline={true}
              numberoflines={5}
              style={{marginTop: 30}}
            />

            <CustomButton
              fill={true}
              text="Kaydet"
              fullscreen={true}
              btnStyle={{marginTop: 30}}
            />
          </View>
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
    backgroundColor: "rgba(0, 0, 0, 0.3)"
  },
  modalView: {
    width: '90%',
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
