import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
  Modal,
  ActivityIndicator
} from 'react-native';
import { TextInput } from 'react-native-paper';
import config from './config/config.json'
import { SelectList } from 'react-native-dropdown-select-list'
import { TextInputMask } from 'react-native-masked-text'

export default function InitUsuario({route, navigation}){

    const {email, userType}= route.params
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [professionals, setProfessionals] = useState()
    const [selected, setSelected] = useState('')
    const [loading, setLoading] = useState(false)

    async function registerProfessional() {

        if(!name || !phone)
            return Alert.alert('Aviso', 'Os campos não podem estar em branco')

        setLoading(true)
        
        let reqs = await fetch(config.urlRootNode+'professionals', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                name: name,
                phone: phone
            })
        })
        let resp = await reqs.json()
        if(resp){ 
            Alert.alert('Sucesso', 'Seus dados foram cadastrados com sucesso!')
            navigation.navigate("MenuProfessional", {user: resp})
            setLoading(false)
        }
    }

    async function registerPatient() {

        if(!name || !phone || !address || !selected)
            return Alert.alert('Aviso', 'Os campos não podem estar em branco')
        
        setLoading(true)
        
        let reqs = await fetch(config.urlRootNode+'patients', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                name: name,
                phone: phone,
                address: address,
                professionalId: selected
            })
        })
        let resp = await reqs.json()
        console.log(resp)
        if(reqs.status === 200) {
            Alert.alert('Sucesso', 'Seus dados foram cadastrados com sucesso!')
            navigation.navigate("MenuPatients", {user: resp})
            setLoading(false)
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
        console.log(resp)
        const names = resp.map(item => ({key: item.id, value: item.name}))
        setProfessionals(names)
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
          queryProfessionals();
        });
        return unsubscribe;
      }, [navigation]);

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
            style={{justifyContent: 'space-evenly'}}>
                <View style={{alignItems:'center', justifyContent: 'center', marginTop: 20, marginBottom: 50}}>
                    <Text style={{color: '#000', fontSize: 30, fontWeight: 'bold'}}>{"TCIMApp"}</Text>
                </View>
                {userType == 'M' ? 
                <>
                <View style={{alignItems:'center', justifyContent: 'center', marginTop: 80, marginBottom: 20}}>
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
                        <TouchableOpacity style={styles.button} onPress={registerProfessional}>
                            <Text style={{color: '#fff', fontSize: 15}}>CADASTRAR</Text>
                        </TouchableOpacity>
                    </View>
                    </>
                    : 
                    <>
                    <View style={{alignItems:'center', justifyContent: 'center', marginTop: 50, marginBottom: 20}}>
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
                        <SelectList
                            data={professionals}
                            save="key"
                            setSelected={setSelected}
                            placeholder="Selecione o profissional responsável"
                            searchPlaceholder="Digite o nome do profissional responsável"
                            boxStyles={{backgroundColor:'white', borderColor: 'black'}}
                            inputStyles={{color: 'black', fontSize: 15}}
                            dropdownStyles={{backgroundColor: 'white'}}
                            dropdownItemStyles={{marginVertical: 5}}
                            dropdownTextStyles={{color: 'black', fontSize: 16}}
                            maxHeight={150}
                            notFoundText='Profissional não encontrado'
                        />
                        <TouchableOpacity style={styles.button} onPress={registerPatient}>
                            <Text style={{color: '#fff', fontSize: 15}}>CADASTRAR</Text>
                        </TouchableOpacity>
                    </View>
                    </> }
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