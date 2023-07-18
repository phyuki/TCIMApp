import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MenuCadastro from './menuCadastro.js';
import MenuPrincipal from './menuPrincipal.js';
import Login from './login.js';

function HomeScreen() {
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

function App() {

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="MenuPrincipal" component={MenuPrincipal} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  
});

export default App;
