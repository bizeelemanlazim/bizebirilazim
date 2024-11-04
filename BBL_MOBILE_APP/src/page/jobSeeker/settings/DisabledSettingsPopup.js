import {
  View,
  Modal,
  StyleSheet,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import CustomDropDown from '../../../component/CustomDropDown';
import CustomInput from '../../../component/CustomInput';
import CustomSwitch from '../../../component/CustomSwitch';
import ModalHeader from '../../../component/ModalHeader';

export default function DisabledSettingsPopup({visible, setModalVisible}) {
  const [healtyReport, setHealtyReport] = useState(false);
  const [cronic, setCronic] = useState(false);
  const [consciousness, setConsciousness] = useState(false);
  const [contagious, setContagious] = useState(false);

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
              <ModalHeader title="Engellilik Durumu Detayları" setModalVisible={setModalVisible} />

              <CustomDropDown
                name="Kategori"
                required={false}
                style={{marginTop: 20}}
              />

              <CustomDropDown
                name="Yüzdesi"
                required={false}
                style={{marginTop: 20}}
              />

              <CustomSwitch
                text="Sağlık Raporu"
                value={healtyReport}
                setValue={setHealtyReport}
              />

              <CustomSwitch
                text="Belli başlı işleri yapmasına engel kronik bir rahatsızlık var mı?"
                value={cronic}
                setValue={setCronic}
              />

              <CustomInput
                name="Açıklama"
                placeholder="Açıklama"
                style={{marginTop: 25}}
                multiline={true}
                numberoflines={5}
                required={false}
              />

              <CustomSwitch
                text="Arada bilinç kaybına sebep olacak bir durumu oluyor mu?"
                value={consciousness}
                setValue={setConsciousness}
              />

              <CustomInput
                name="Açıklama"
                placeholder="Açıklama"
                style={{marginTop: 25}}
                multiline={true}
                numberoflines={5}
                required={false}
              />

              <CustomSwitch
                text="Bulaşıcı bir hastalık var mı?"
                value={contagious}
                setValue={setContagious}
              />

              <CustomInput
                name="Açıklama"
                placeholder="Açıklama"
                style={{marginTop: 25}}
                multiline={true}
                numberoflines={5}
                required={false}
              />
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
