import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  Keyboard,
  StyleSheet,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  BackHandler
} from 'react-native';
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MenuProfessional from './menuProfessional.js';
import DASS from './DASS.js';
import Login from './login.js';
import Cadastro from './cadastro.js';
import RelatorioPrevioDASS from './relatorioDASS.js';
import Pacientes from './pacientes.js';
import PerfilProfessional from './profileProfissional.js';
import InitUsuario from './initUsuario.js';
import MenuPaciente from './menuPaciente.js';
import PerfilPaciente from './perfilPaciente.js';
import TelaDASS from './screenDASS.js';
import TelaSCID from './screenSCID.js';
import TEI from './disorders/TEI.js';
import Cleptomania from './disorders/clepto.js';
import Piromania from './disorders/piromania.js';
import JogoPatologico from './disorders/jogopatologico.js';
import Tricotilomania from './disorders/tricotilomania.js';
import Oniomania from './disorders/oniomania.js';
import Hipersexualidade from './disorders/hipersexualidade.js';
import UsoDeInternet from './disorders/usoInternet.js';
import Escoriacao from './disorders/escoriacao.js';
import Videogame from './disorders/videogame.js';
import Automutilacao from './disorders/automutilacao.js';
import AmorPatologico from './disorders/amorPatologico.js';
import CiumePatologico from './disorders/ciumePatologico.js';
import DependenciaComida from './disorders/dependenciaComida.js';
import FinalizarSCID from './finishSCID.js';
import TelaRelatorio from './screenRelatorio.js';
import ListaRelatorios from './listRelatorio.js';
import ExibirRelatorio from './showRelatorio.js';
import ResultadoParcialSCID from './showResults.js';

function TelaInicial() {

  const [textInput, setTextInput] = useState(<Login />)
  const [margin, setMargin] = useState(true)
  const [loginColor, setLoginColor] = useState('white')
  const [registerColor, setRegisterColor] = useState('')
  const [isKeyboardVisible, setKeyboardVisible] = useState(false)  

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  useEffect(() => {
    const backAction = () => {
        BackHandler.exitApp()
      return true; 
    }

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove()
  }, [])

  const setLogin = () =>{
      setTextInput(<Login />)
      setRegisterColor('#87ceeb')
      setLoginColor('white')
      setMargin(true)
  }

  const setCadastrar = () =>{
      setTextInput(<Cadastro />)
      setRegisterColor('white')
      setLoginColor('#87ceeb')
      setMargin(false)
  }

  const showMargin = (show) =>{
      if(show) return(<View style={{marginTop: 40, marginBottom: 80}}/>)
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#87ceeb'}}>
      <KeyboardAvoidingView
      keyboardVerticalOffset={-600}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1, justifyContent: 'space-evenly'}}>
        {!isKeyboardVisible && 
        <View style={{alignItems: 'center'}}>
          <Image 
            style={{width: 150, height: 150}}
            source={require('./assets/logo.png')}/>
            <Text style={{color: '#000', fontSize: 20, fontWeight: 'bold'}}>TCIMApp</Text>
        </View>}
        <View>
          <View style={{flexDirection: 'row', justifyContent: 'space-evenly', marginHorizontal: 20}}>
            <TouchableOpacity style={{alignItems: 'center', padding: 12, borderRadius: 10, backgroundColor: loginColor}} onPress={setLogin}>
                <Text style={{color: '#000', fontSize: 25}}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{alignItems: 'center', padding: 12, borderRadius: 10, backgroundColor: registerColor}} onPress={setCadastrar}>
                <Text style={{color: '#000', fontSize: 25}}>Cadastro</Text>
            </TouchableOpacity>
            </View>
          <View style={styles.viewLogin}>{textInput}</View>
          {!isKeyboardVisible && showMargin(margin)}
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
        <Stack.Screen name="Hipersexualidade" component={Hipersexualidade} />
        <Stack.Screen name="Internet" component={UsoDeInternet} />
        <Stack.Screen name="Escoriacao" component={Escoriacao} />
        <Stack.Screen name="Videogame" component={Videogame} />
        <Stack.Screen name="Automutilacao" component={Automutilacao} />
        <Stack.Screen name="AmorPatologico" component={AmorPatologico} />
        <Stack.Screen name="CiumePatologico" component={CiumePatologico} />
        <Stack.Screen name="DependenciaComida" component={DependenciaComida} />
        <Stack.Screen name="FinishSCID" component={FinalizarSCID} />
        <Stack.Screen name="RelatorioTeste" component={RelatorioPrevioDASS} />
        <Stack.Screen name="ScreenRelatorio" component={TelaRelatorio} />
        <Stack.Screen name="ListRelatorio" component={ListaRelatorios} />
        <Stack.Screen name="ShowRelatorio" component={ExibirRelatorio} />
        <Stack.Screen name="ShowPartial" component={ResultadoParcialSCID} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  viewLogin:{
    alignItems: 'center', 
    borderRadius: 10, 
    marginTop: -5,
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
