import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native';
import config from './config/config.json'

export default () => {

    const [firstName, setFirst] = useState(null)
    const [lastName, setLast] = useState(null)
    const [email, setEmail] = useState(null)
    const [password, setPass] = useState(null)
    const [message, setMessage] = useState(null)

    async function registerUser() {
        let reqs = await fetch(config.urlRootNode+'register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstNameUser: firstName,
                lastNameUser: lastName,
                emailUser: email,
                passwordUser: password
            })
        })
        let resp = await reqs.json()
        setMessage(resp)
    }

    showMessage = (message) => {
        return(message && <Text style={{color: 'red', fontSize: 12, marginBottom: 20}}>{message}</Text>)
    }

    return(
        <>
            <TextInput style={styles.input} 
                onChangeText={setFirst}
                value={firstName}
                placeholder='Primeiro nome' 
                placeholderTextColor='grey'/>
            <TextInput style={styles.input}
                onChangeText={setLast}
                value={lastName} 
                placeholder='Último nome' 
                placeholderTextColor='grey'/>
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
            <TouchableOpacity style={styles.buttonLogin} onPress={registerUser}>
                <Text style={{color: '#fff', fontSize: 15}}>SALVAR</Text>
            </TouchableOpacity>
            {showMessage(message)}
        </>
    )

}

const styles = StyleSheet.create({
    buttonLogin:{
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