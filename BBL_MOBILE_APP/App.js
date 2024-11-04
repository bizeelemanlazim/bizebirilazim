import React from 'react';
import {CommonStore} from './src/store/Store';
import AppNavigator from './src/navigator/AppNavigator';
import LoadingModal from './src/component/LoadingModal';
import {Global} from './src/util/Base';

export default function App() {
  Global.Store = new CommonStore();

  return (
    <>
      <AppNavigator />
      <LoadingModal />
    </>
  );
}
