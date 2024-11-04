import { View, Text } from 'react-native'
import React from 'react'
import CustomCheckBox from '../CustomCheckBox'
import { Colors } from '../../util/Base'

export default function RegisterCheckList({ kvkkCheck, setKvkkCheck, secretCheck, setSecretCheck, aggrementCheck, setAggrementCheck }) {
  return (
    <>
      <CustomCheckBox
            style={{marginTop: 10}}
            value={kvkkCheck}
            onChange={setKvkkCheck}
            textComponent={
              <View style={{flexDirection: 'row'}}>
                <Text
                  onPress={() => alert('click')}
                  style={{color: Colors.Blue, paddingLeft: 7}}>
                  KVKK Sözleşmesi
                </Text>
                <Text style={{ color: "black" }}>’ni okudum, onaylıyorum.</Text>
              </View>
            }
          />

          <CustomCheckBox
            style={{marginTop: 10}}
            value={secretCheck}
            onChange={setSecretCheck}
            textComponent={
              <View style={{flexDirection: 'row', paddingLeft: 7}}>
                <Text
                  style={{color: Colors.Blue}}
                  onPress={() => alert('click')}>
                  Gizlilik Sözleşmesi
                </Text>
                <Text style={{ color: "black" }}>’ni okudum, onaylıyorum.</Text>
              </View>
            }
          />
          <CustomCheckBox
            style={{marginTop: 10}}
            value={aggrementCheck}
            onChange={setAggrementCheck}
            textComponent={
              <View style={{paddingLeft: 7}}>
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{color: Colors.Blue}}
                    onPress={() => alert('click')}>
                    Üyelik Koşulları{' '}
                  </Text>
                  <Text style={{ color: "black" }}>ve </Text>
                  <Text
                    style={{color: Colors.Blue}}
                    onPress={() => alert('click')}>
                    Kullanım Sözleşmesi
                  </Text>
                  <Text style={{ color: "black" }}>’ni</Text>
                </View>
                <Text style={{ color: "black" }}>okudum, onaylıyorum.</Text>
              </View>
            }
          />
    </>
  )
}