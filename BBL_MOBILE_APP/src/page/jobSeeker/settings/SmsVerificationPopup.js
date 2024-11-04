import {View, Modal, StyleSheet, Text, Dimensions, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {Colors} from '../../../util/Base';
import Circle from '../../../component/Circle';
import Feather from 'react-native-vector-icons/Feather';

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import CustomButton from '../../../component/CustomButton';

const windowWidth = Dimensions.get('window').width;

export default function SmsVerificationPopup({visible, setModalVisible}) {
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: 4});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

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
            <View style={{alignItems: 'center'}}>
              <Circle cap={60} bgColor={Colors.Blue3Opacity}>
                <Circle cap={50} bgColor={Colors.Blue3}>
                  <Feather
                    name="smartphone"
                    size={25}
                    style={{color: Colors.Gray2}}
                  />
                </Circle>
              </Circle>
              <Text style={{marginTop: 20}}>SMS Doğrulama</Text>
              <Text
                style={{
                  textAlign: 'center',
                  color: Colors.Gray3,
                  marginTop: 5,
                }}>
                +90 535 035 5053 nolu telefonunuza gönderdiğimiz 4 haneli
                doğrulama kodunu giriniz
              </Text>
            </View>
            <CodeField
              ref={ref}
              {...props}
              // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
              value={value}
              onChangeText={setValue}
              cellCount={4}
              rootStyle={styles.codeFieldRoot}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              renderCell={({index, symbol, isFocused}) => (
                <Text
                  key={index}
                  style={[styles.cell, isFocused && styles.focusCell]}
                  onLayout={getCellOnLayoutHandler(index)}>
                  {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
              )}
            />
            <Text style={{ alignSelf: "center", marginTop: 20, color: Colors.Gray3 }}>Bir kod almadınız mı?</Text>
            <TouchableOpacity style={{ alignSelf: "center" }}>
                <Text style={{ color: Colors.Blue2 }}>Tekrar göndermek için tıklayın.</Text>
            </TouchableOpacity>
            <View style={{ flexDirection: "row", marginTop: 20, justifyContent: "space-between" }}>
                <CustomButton 
                    text="İptal Et"
                    fullscreen={true}
                    btnStyle={{ width: "48%" }}
                    onPress={() => setModalVisible(false)}
                />
                <CustomButton 
                    text="Onayla"
                    fullscreen={true}
                    fill={true}
                    btnStyle={{ width: "48%" }}
                />
            </View>
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
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
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
  codeFieldRoot: {marginTop: 20},
  cell: {
    width: (windowWidth - 100) / 5,
    height: (windowWidth - 100) / 5,
    lineHeight: 48,
    fontSize: 24,
    borderWidth: 2,
    borderColor: '#00000030',
    textAlign: 'center',
    borderRadius: 10
  },
  focusCell: {
    borderColor: Colors.Blue2,
  },
});
