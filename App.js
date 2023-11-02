import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity
} from 'react-native';
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MenuProfessional from './menuProfessional.js';
import DASS from './DASS.js';
import Login from './login.js';
import Cadastro from './cadastro.js';
import RelatorioTeste from './relatorioTeste.js';
import Pacientes from './pacientes.js';
import PerfilProfessional from './profileProfissional.js';
import InitUsuario from './initUsuario.js';
import MenuPaciente from './menuPaciente.js';
import PerfilPaciente from './perfilPaciente.js';
import TelaDASS from './screenDASS.js';
import TelaSCID from './screenSCID.js';
import TEI from './TEI.js';
import Cleptomania from './clepto.js';
import Piromania from './piromania.js';
import JogoPatologico from './jogopatologico.js';
import Tricotilomania from './tricotilomania.js';
import Oniomania from './oniomania.js';

function TelaInicial() {

  const [textInput, setTextInput] = useState(<Login />)
  const [margin, setMargin] = useState(true)

  const setLogin = () =>{
      setTextInput(<Login />)
      setMargin(true)
  }

  const setCadastrar = () =>{
      setTextInput(<Cadastro />)
      setMargin(false)
  }

  const showMargin = (show) =>{
      if(show) return(<View style={{marginTop: 40, marginBottom: 80}}/>)
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#87ceeb'}}>
      <KeyboardAvoidingView
      keyboardVerticalOffset={-500}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex:1, justifyContent: 'space-evenly'}}>
        <View style={{alignItems: 'center'}}>
          <Image 
            style={{width: 150, height: 150}}
            source={require('./assets/logo.png')}/>
            <Text style={{color: '#000', fontSize: 20, fontWeight: 'bold'}}>SCIDApp</Text>
        </View>
        <View>
          <View style={{flexDirection: 'row', justifyContent: 'space-evenly', marginHorizontal: 20}}>
            <TouchableOpacity style={{alignItems: 'center'}} onPress={setLogin}>
                <Text style={{color: '#000', fontSize: 25}}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{alignItems: 'center'}} onPress={setCadastrar}>
                <Text style={{color: '#000', fontSize: 25}}>Cadastro</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.viewLogin}>{textInput}</View>
          {showMargin(margin)}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function App() {

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={TelaInicial} />
        <Stack.Screen name="InitUsuario" component={InitUsuario} />
        <Stack.Screen name="MenuProfessional" component={MenuProfessional} />
        <Stack.Screen name="MenuPatients" component={MenuPaciente} />
        <Stack.Screen name="PatientProfile" component={PerfilPaciente} />
        <Stack.Screen name="ProfessionalProfile" component={PerfilProfessional} />
        <Stack.Screen name="Patients" component={Pacientes} />
        <Stack.Screen name="DASS" component={DASS} />
        <Stack.Screen name="ScreenDASS" component={TelaDASS} />
        <Stack.Screen name="ScreenSCID" component={TelaSCID} />
        <Stack.Screen name="TEI" component={TEI} />
        <Stack.Screen name="Clepto" component={Cleptomania} />
        <Stack.Screen name="Piromania" component={Piromania} />
        <Stack.Screen name="Jogo" component={JogoPatologico} />
        <Stack.Screen name="Trico" component={Tricotilomania} />
        <Stack.Screen name="Oniomania" component={Oniomania} />
        <Stack.Screen name="RelatorioTeste" component={RelatorioTeste} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  viewLogin:{
    alignItems: 'center', 
    borderRadius: 10, 
    marginTop: 20,
    marginHorizontal: 20, 
    backgroundColor: 'white'
  },
  buttonLogin:{
      alignItems: 'center',
      justifyContent: 'center', 
      height: 40,
      width: 150, 
      backgroundColor: '#084d6e',
      borderRadius: 10,
      marginVertical: 20
  },
  input: {
    marginTop: 20,
    marginBottom: 20,
    textShadowColor: '#000',
    color: '#000',
    borderBottomWidth: 1,
    borderColor: 'grey',
    backgroundColor: '#fff',
    fontSize: 18,
    width: 300
  }
});

export default App;
