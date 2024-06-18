import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform,
  BackHandler,
  Alert,
  Keyboard
} from 'react-native';
import config from './config/config.json'
import { Button, TextInput } from 'react-native-paper';
import { SelectList } from 'react-native-dropdown-select-list'
import { TextInputMask } from 'react-native-masked-text'

export default function CadastroPacientes({route, navigation}){

    const { user } = route.params

    const [names, setNames] = useState([])
    const [patients, setPatients] = useState([])
    const [updateVisible, setUpdateVisible] = useState(false)
    const [registerVisible, setRegisterVisible] = useState(false)
    const [selectedPatient, setPatient] = useState(null)
    const [keyboardVisible, setKeyboardVisible] = useState(false)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")

    useEffect(() => {
        const backAction = () => {
            navigation.goBack()
            return true
        }    
        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
        return () => backHandler.remove()
    }, [])

    async function createPatient(){
        let url = new URL(config.urlRootNode+'patients')

        let reqs = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                email: email,
                phone: phone,
                address: address,
                professionalId: user.id
            })
        })
        let resp = await reqs.json()
        if(resp) {
            Alert.alert('Sucesso', 'O paciente foi cadastrado com sucesso')
            return true
        }
        else{ 
            Alert.alert('Aviso', 'Email já cadastrado no sistema')
            return false
        }    
    }

    useEffect(() => {
        const backAction = () => {
            navigation.goBack()
            return true
        }    
        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
        return () => backHandler.remove()
    }, [])

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

    return(
        <SafeAreaView style={{flex:1, backgroundColor: '#87ceeb'}}>
            <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={{flex: 1, justifyContent: 'center'}}>
                <View style={{flexDirection: 'row', alignItems:'center', justifyContent: 'space-between', marginTop: 20}}>
                    <TouchableOpacity style={{backgroundColor: 'white', borderRadius: 10, marginLeft:20, padding: 10}} onPress={() => navigation.goBack()}>
                    <Image
                        source={require('./assets/back.png')}
                        style={{height: 25,
                        width: 25,
                        resizeMode: 'stretch'}}
                    />
                    </TouchableOpacity>
                    <Text style={{color: '#000', fontSize: 30, fontWeight: 'bold'}}>{"TCIMApp"}</Text>
                    <View style={{backgroundColor: '#87ceeb', borderRadius: 10, marginRight:20, width: 50, height: 50}}></View>
                </View>
                {!keyboardVisible ? <View style={{alignItems: 'center', marginBottom: 20}}>
                    <Text style={{color: '#000', fontSize: 28, marginTop: 40, fontWeight: 'bold'}}>Cadastro de Paciente</Text>
                </View> : <View style={{marginTop: 40}}/>}
                <View style={{flex: 1, marginTop: -10, alignItems: 'center', marginHorizontal: 50, justifyContent: 'center'}}>
                    <TextInput style={styles.input}
                        onChangeText={setName}
                        value={name}
                        placeholder='Insira o nome completo do paciente'
                        placeholderTextColor='grey'/>
                    <TextInput style={styles.input}
                        onChangeText={setEmail}
                        value={email}
                        placeholder='Insira o email do paciente'
                        placeholderTextColor='grey'/>
                    <TextInputMask
                        style={[styles.input, {padding: 15, borderTopLeftRadius: 5, borderTopRightRadius: 5}]}
                        type={'cel-phone'}
                        options={{
                            maskType: 'BRL',
                            withDDD: true,
                            dddMask: '(99) '
                          }}
                        placeholder="Insira o seu telefone"
                        placeholderTextColor='gray'
                        value={phone}
                        onChangeText={setPhone} />
                    <TextInput style={styles.input}
                        onChangeText={setAddress}
                        value={address}
                        placeholder='Insira o endereço do paciente'
                        placeholderTextColor='grey'/>
                    <TouchableOpacity style={styles.button} onPress={createPatient}>
                        <Text style={{color: '#fff', fontSize: 15}}>CADASTRAR</Text>
                    </TouchableOpacity>
                    </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    input: {
        marginBottom: 20,
        textShadowColor: '#000',
        color: '#000',
        borderBottomWidth: 1,
        borderColor: 'grey',
        backgroundColor: '#fff',
        fontSize: 16,
        width: 300
    },
    button:{
        alignItems: 'center',
        justifyContent: 'center', 
        height: 40,
        width: 150, 
        backgroundColor: '#084d6e',
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 30
    },
    buttonRegister:{
        alignItems: 'center',
        justifyContent: 'center', 
        height: 40,
        width: 150, 
        backgroundColor: 'green',
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 30
    }
})