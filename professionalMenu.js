import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView
} from 'react-native';
import { TextInput } from 'react-native-paper';
import config from './config/config.json'

export default function MenuProfessional({route, navigation}){

    const { user } = route.params

    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')

    async function queryProfessional() {
        let url = new URL(config.urlRootNode+'professional')
        params={userId: user.id}
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

        let reqs = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        const resp = await reqs.json()
        setName(resp.firstName+' '+resp.lastName)
        setPhone(resp.phone)
        setEmail(resp.email)
    }

    useEffect(() => {
          queryProfessional();
      }, []);

    async function findProfessional(){
        let url = new URL(config.urlRootNode+'professionals'),
        params={userId: user.id, emailUser: email}
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

        let reqs = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        let resp = await reqs.json()
        console.log(user.id)
        return resp
    }

    async function updateProfessional(){

        let url = new URL(config.urlRootNode+'professionals')
        const firstName = name.split(' ')[0]
        const lastName = name.split(' ').slice(1).join(' ')

        let reqs = await fetch(url, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: user.id,
                firstName: firstName,
                lastName: lastName,
                phone: phone,
                email: email,
            })
        })
        let resp = await reqs.json()
        alert(resp)
    }

    function update(){
        findProfessional().then(result => {
            if(result != user.id) alert('Email já cadastrado')
            else updateProfessional()
        })
    }

    return(
        <SafeAreaView style={{flex:1, backgroundColor: '#87ceeb'}}>
            <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={{justifyContent: 'space-evenly'}}>
                <View style={{alignItems:'center', justifyContent: 'center', marginTop: 20, marginBottom: 50}}>
                    <Text style={{color: '#000', fontSize: 30, fontWeight: 'bold'}}>{"SCIDApp"}</Text>
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
                        <TextInput style={styles.input}
                        onChangeText={setPhone}
                        value={phone}
                        placeholder='Insira o seu telefone'
                        placeholderTextColor='grey'/>
                        <TextInput style={styles.input}
                        onChangeText={setEmail}
                        value={email}
                        autoCapitalize='none'
                        keyboardType='email-address'
                        placeholder='Insira o seu email'
                        placeholderTextColor='grey'/>
                        <TouchableOpacity style={styles.button} onPress={update}>
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