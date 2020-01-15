import React from 'react';
import { StyleSheet, View } from 'react-native';

import Navigation from './src/navigation/AppNavigation';


import AppContainer from './src/navigation/index';

global.ip='104.211.12.200'
export default function App() {
  return (

      <View style={styles.container}>
        <AppContainer/>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#55858A',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
