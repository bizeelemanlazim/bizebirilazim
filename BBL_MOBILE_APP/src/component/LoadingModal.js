import {View, Text, Modal, StyleSheet} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import {Global} from '../util/Base';
import {observer} from 'mobx-react';

function LoadingModal() {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={Global.Store.loadingModal}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <LottieView
            style={{width: 300, height: 300}}
            resizeMode="contain"
            source={require('../resource/Loading.json')}
            autoPlay
            loop
          />
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
  },
  modalView: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default observer(LoadingModal);
