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
        let reqs = await fetch(config.urlRootNode+'login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                emailUser: email,
                passwordUser: password
            })
        })
        let resp = await reqs.json()
        return resp && navigation.navigate('MenuPrincipal')
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