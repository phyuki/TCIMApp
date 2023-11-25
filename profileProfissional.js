import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  BackHandler
} from 'react-native';
import { TextInput } from 'react-native-paper';
import config from './config/config.json'

export default function PerfilProfessional({route, navigation}){

    const { user } = route.params

    const [name, setName] = useState(user.name)
    const [phone, setPhone] = useState(user.phone)
    const [email, setEmail] = useState(user.email)
    const [updated, setUpdated] = useState(false)

    function redirectToAnotherScreen() {
        let updatedUser = user;
        if (updated) {
            updatedUser = { id: user.id, name: name, email: email, phone: phone };
        }
        navigation.navigate("MenuProfessional", { user: updatedUser });
    }
    
    const backAction = () => {
        redirectToAnotherScreen();
        return true; // Impede que o botão de voltar padrão seja executado
      };

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
      
        return () => backHandler.remove();
    }, [updated]);
    
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
        return resp
    }

    async function updateProfessional(){
        if(!name || !phone || !email)
            return alert('Os campos não podem estar em branco')

        let url = new URL(config.urlRootNode+'professionals')

        let reqs = await fetch(url, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: user.id,
                name: name,
                phone: phone,
                email: email,
            })
        })
        let resp = await reqs.json()
        if(resp){
            alert(resp)
        }
    }

    async function update(){
        try{
            const result = await findProfessional();
            if(result != user.id) alert('Email já cadastrado')
            else{
                updateProfessional()
                setUpdated(true)
            }
        }
        catch (error) {
            console.error(error);
        }
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