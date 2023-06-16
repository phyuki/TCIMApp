/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';

import MenuCadastro from './menuCadastro.js';

function App() {

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#87ceeb', justifyContent: 'space-evenly'}}>
      <View style={{alignItems: 'center'}}>
        <Image 
          style={{width: 150, height: 150}}
          source={require('./logo.png')}/>
          <Text style={{color: '#000', fontSize: 20}}>SCIDApp</Text>
      </View>
      <MenuCadastro />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  
});

export default App;
