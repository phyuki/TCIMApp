import React, {useRef, useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import config from './config/config.json'

export default function Login({ setLoading }) {

    const controllerRef = useRef()
    const [email, setEmail] = useState(null)
    const [password, setPass] = useState(null)

    const navigation = useNavigation();

    async function doLogin() {

        if(!email || !password) return Alert.alert('Aviso', 'Os campos não podem estar em branco')
        
        setLoading(true)

        let url = new URL(config.urlRootNode+'login'),
            params={emailUser: email,
                    passwordUser: password}

        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

        controllerRef.current = new AbortController()
        const signal = controllerRef.current.signal
        const timeout = setTimeout(() => controllerRef.current.abort(), 10000)

        try {
            let reqs = await fetch(url, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            let resp = await reqs.json()
            
            if(resp === 'P'){
                let newUrl = new URL(config.urlRootNode+'patientByEmail'),
                    params={emailUser: email}
                Object.keys(params).forEach(key => newUrl.searchParams.append(key, params[key]))
                
                reqs = await fetch(newUrl, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }, signal
                })
                let user = await reqs.json()
                setEmail(null)
                setPass(null)
                return user ? navigation.navigate("MenuPatients", {user: user}) 
                            : navigation.navigate("InitUsuario", {email: email, userType: resp})
            }
            else if(resp === 'M'){
                let newUrl = new URL(config.urlRootNode+'professionalByEmail'),
                    params={emailUser: email}
                Object.keys(params).forEach(key => newUrl.searchParams.append(key, params[key]))
                
                reqs = await fetch(newUrl, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }, signal
                })
                let user = await reqs.json()    
                setEmail(null)
                setPass(null)
                return user ? navigation.navigate("MenuProfessional", {user: user}) 
                            : navigation.navigate("InitUsuario", {email: email, userType: resp})
            }
            else {
                Alert.alert('Aviso', 'Nome de usuário ou senha inválidos.\nTente novamente!')
            }
        } catch (error) {
            setLoading(false)
            Alert.alert('Erro', 'Erro de comunicação com o servidor - 500')
        } finally {
            clearTimeout(timeout)
            setLoading(false)
        }
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