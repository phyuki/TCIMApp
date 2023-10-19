import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import config from './config/config.json'

export default function Login() {

    const [email, setEmail] = useState(null)
    const [password, setPass] = useState(null)

    const navigation = useNavigation();

    async function doLogin() {

        if(!email || !password) return alert('Os campos não podem estar em branco')

        let url = new URL(config.urlRootNode+'login'),
        params={emailUser: email,
            passwordUser: password}
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
        
        let reqs = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        let resp = await reqs.json()
        console.log(resp)
        if(resp == 'P'){
            let newUrl = new URL(config.urlRootNode+'patientByEmail'),
            params={emailUser: email}
            Object.keys(params).forEach(key => newUrl.searchParams.append(key, params[key]))
            reqs = await fetch(newUrl, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            let user = await reqs.json()
            return user ? navigation.navigate("MenuPatients", {user: user}) 
                        : navigation.navigate("InitUsuario", {email: email, userType: resp})
        }
        else if(resp == 'M'){
            let newUrl = new URL(config.urlRootNode+'professionalByEmail'),
            params={emailUser: email}
            Object.keys(params).forEach(key => newUrl.searchParams.append(key, params[key]))
            reqs = await fetch(newUrl, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            let user = await reqs.json()
            return user ? navigation.navigate("MenuProfessional", {user: user}) 
                        : navigation.navigate("InitUsuario", {email: email, userType: resp})
        }
        else alert('Nome de usuário ou senha inválidos. Tente novamente!')
    }

    return(
        <>
            <TextInput style={styles.input} 
                onChangeText={setEmail}
                value={email}
                autoCapitalize='none'
                keyboardType='email-address'
                placeholder='Endereço de e-mail' 
                placeholderTextColor='grey'/>
            <TextInput style={styles.input}
                onChangeText={setPass}
                value={password}
                secureTextEntry={true}
                autoCapitalize='none'
                placeholder='Senha' 
                placeholderTextColor='grey'/>
            <TouchableOpacity style={styles.button} onPress={doLogin}>
                <Text style={{color: '#fff', fontSize: 15}}>ENTRAR</Text>
            </TouchableOpacity>
        </>
    )

}

const styles = StyleSheet.create({
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