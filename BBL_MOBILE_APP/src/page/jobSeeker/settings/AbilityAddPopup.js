import {View, Modal, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {Colors} from '../../../util/Base';
import ModalHeader from '../../../component/ModalHeader';
import CustomInput from '../../../component/CustomInput';
import CustomInputHeader from '../../../component/CustomInputHeader';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {TouchableOpacity} from 'react-native-gesture-handler';
import CustomButton from '../../../component/CustomButton';

export default function AbilityAddPopup({visible, setModalVisible}) {
  const [score, setScore] = useState(0);

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
              title="Beceri Bilgisi Ekle"
              setModalVisible={setModalVisible}
            />
            <CustomInput
              name="Beceri"
              placeholder="Yabancı Dil, Office Uygulamaları vb."
              required={false}
              style={{marginTop: 20}}
            />
            <CustomInput
              name="Açıklama"
              placeholder="Açıklama"
              required={false}
              multiline={true}
              numberoflines={5}
              style={{marginTop: 30}}
            />

            <View style={{marginTop: 30}}>
              <CustomInputHeader name="Derecesi" required={false} />
              {GetScore()}
            </View>
            <CustomButton
              fill={true}
              text="Kaydet"
              fullscreen={true}
              btnStyle={{marginTop: 20}}
            />
          </View>
        </View>
      </View>
    </Modal>
  );

  function GetScore() {
    return (
      <View
        style={{
          justifyContent: 'flex-start',
          flexDirection: 'row',
          marginTop: 10,
        }}>
        {[1, 2, 3, 4, 5].map(x => (
          <TouchableOpacity style={{marginLeft: 5}} onPress={() => setScore(x)}>
            <FontAwesome
              name={x <= score ? 'star' : 'star-o'}
              style={{
                color: x <= score ? Colors.Yellow : Colors.Gray,
              }}
              size={55}
            />
          </TouchableOpacity>
        ))}
      </View>
    );
  }
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
