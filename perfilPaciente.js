import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  BackHandler,
  Alert
} from 'react-native';
import { TextInput } from 'react-native-paper';
import config from './config/config.json'
import { SelectList } from 'react-native-dropdown-select-list'
import { TextInputMask } from 'react-native-masked-text'

export default function PerfilPaciente({route, navigation}){

    const { user } = route.params
    const [name, setName] = useState(user.name)
    const [phone, setPhone] = useState(user.phone)
    const [email, setEmail] = useState(user.email)
    const [address, setAddress] = useState(user.address)
    const [professionals, setProfessionals] = useState()
    const [selected, setSelected] = useState('')
    const [updated, setUpdated] = useState(false)

    function redirectToAnotherScreen() {
        let updatedUser = user;
        if (updated) {
            updatedUser = { id: user.id, name: name, email: email, phone: phone, address: address, professionalId: selected };
        }
        navigation.navigate("MenuPatients", { user: updatedUser });
    }
    
    const backAction = () => {
        redirectToAnotherScreen();
        return true; // Impede que o botão de voltar padrão seja executado
      };

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
      
        return () => backHandler.remove();
    }, [updated]);

    async function registerPatient() {

        if(!name || !phone || !address)
            return Alert.alert('Aviso', 'Os campos não podem estar em branco')

        let reqs = await fetch(config.urlRootNode+'patients', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: user.id,
                email: email,
                name: name,
                phone: phone,
                address: address,
                professionalId: selected
            })
        })
        let resp = await reqs.json()
        if(resp) {
            Alert.alert('Sucesso', "Seus dados foram atualizados com sucesso!")
            setUpdated(true)
        }
    }

    async function queryProfessionals() {
        let url = new URL(config.urlRootNode+'allProfessionals')

        let reqs = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        const resp = await reqs.json()
        const names = resp.map(item => ({key: item.id, value: item.name}))
        setProfessionals(names)
        setSelected(user.professionalId)
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
          queryProfessionals();
        });
        return unsubscribe;
      }, [navigation]);

    return(
        <SafeAreaView style={{flex:1, backgroundColor: '#87ceeb'}}>
            <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={{justifyContent: 'space-evenly'}}>
                <View style={{flexDirection: 'row', alignItems:'center', justifyContent: 'space-between', marginTop: 20}}>
                    <TouchableOpacity style={{backgroundColor: 'white', borderRadius: 10, marginLeft:20, padding: 10}} onPress={() => redirectToAnotherScreen()}>
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
                <View style={{alignItems:'center', justifyContent: 'center', marginTop: 100, marginBottom: 20}}>
                    <Text style={{color: '#000', fontSize: 18, fontWeight: 'bold'}}>{'Informações do Perfil'}</Text>
                </View>
                <View style={{marginTop: 25, alignItems: 'center'}}>
                        <TextInput style={styles.input}
                        onChangeText={setName}
                        value={name}
                        placeholder='Insira o seu nome completo'
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
                        onChangeText={setPhone}
                        />
                        <TextInput style={styles.input}
                        value={email}
                        editable={false}/>
                        <TextInput style={styles.input}
                        onChangeText={setAddress}
                        value={address}
                        placeholder='Insira o seu endereço completo'
                        placeholderTextColor='grey'/>
                        <TouchableOpacity style={styles.button} onPress={registerPatient}>
                            <Text style={{color: '#fff', fontSize: 15}}>ATUALIZAR</Text>
                        </TouchableOpacity>
                    </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    input: {
        marginBottom:20,
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
        marginTop: 25,
        marginBottom: 30
    }, 
})