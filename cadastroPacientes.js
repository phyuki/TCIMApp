import React, {useRef, useState, useEffect} from 'react';
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
  Keyboard,
  ActivityIndicator,
  Modal
} from 'react-native';
import config from './config/config.json'
import { TextInput } from 'react-native-paper';
import { TextInputMask } from 'react-native-masked-text'

export default function CadastroPacientes({route, navigation}){

    const { user } = route.params

    const controllerRef = useRef()
    const [keyboardVisible, setKeyboardVisible] = useState(false)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const backAction = () => {
            navigation.goBack()
            return true
        }    
        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
        return () => backHandler.remove()
    }, [])

    async function registerPatient(){
        if(!name || !email || !phone || !address) {
            Alert.alert('Aviso', 'Preencha todos os campos');
            return;
        }

        setLoading(true);
        await createPatient();
        setLoading(false);       
    }

    async function createPatient(){
        let url = new URL(config.urlRootNode+'patients')

        controllerRef.current = new AbortController()
        const signal = controllerRef.current.signal
        const timeout = setTimeout(() => controllerRef.current.abort(), 10000)

        try {
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
                }), signal
            })
            const status = reqs.status
            let resp = await reqs.json()

            if(status === 200) {
                Alert.alert('Sucesso', 'O paciente foi cadastrado com sucesso')
                return true
            }
            else{ 
                Alert.alert('Aviso', resp.message)
                return false
            }    
        } catch (error) {
            console.log(error)
            Alert.alert('Erro', 'Erro de comunicação com o servidor - 500')
        } finally {
            clearTimeout(timeout)
        }
    }

    useEffect(() => {
        const backAction = () => {
            navigation.goBack()
            return true
        }    
        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
        return () => backHandler.remove();
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
            <Modal animationType="fade" transparent={true} visible={loading}>
                <View style={styles.modalHeader}>
                    <View style={styles.modal}>
                        <ActivityIndicator size={"large"} color={"dodgerblue"} />
                        <Text style={{marginBottom: 10, color: 'black', fontSize: 18, marginTop: 15, textAlign: 'justify'}}>Cadastrando dados...</Text>
                    </View>
                </View>
            </Modal>
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
                    <TouchableOpacity style={styles.button} onPress={registerPatient}>
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
    },
    modalHeader:{
        flex: 1, 
        backgroundColor: 'rgba(0, 0, 0, 0.75)', 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    modal:{
        margin: 20, 
        backgroundColor: 'white', 
        borderRadius: 20, 
        padding: 25, 
        alignItems: 'center', 
        shadowColor: '#000', 
        shadowOffset: {width: 0, height: 2}, 
        shadowOpacity: 0.25, 
        shadowRadius: 4, 
        elevation: 5
  }
})