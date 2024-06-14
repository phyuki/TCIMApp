import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert
} from 'react-native';
import config from './config/config.json'
import { RadioButton } from 'react-native-paper'

export default () => {

    const [email, setEmail] = useState(null)
    const [password, setPass] = useState(null)
    const [confirmPassword, setConfirmPass] = useState(null)
    const [checked, setChecked] = useState(null)

    async function registerUser() {

        if(!checked || !email || !password || !confirmPassword)
            return Alert.alert('Aviso', 'Os campos não podem estar em branco')

        if(password != confirmPassword)
            return Alert.alert('Aviso', 'As senhas informadas não são correspondentes')

        let reqs = await fetch(config.urlRootNode+'register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                emailUser: email,
                passwordUser: password,
                userType: checked
            })
        })
        let resp = await reqs.json()
        setEmail(null)
        setPass(null)
        setConfirmPass(null)
        setChecked(null)
        Alert.alert(resp.alert, resp.message)
    }

    return(
        <>
            <View style={{flexDirection: 'row', marginTop: 15, marginBottom: 10}}>
                <View style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{color: '#000', fontSize: 14}}>Paciente</Text>
                    <RadioButton
                        value="P"
                        status={checked === 'P' ? 'checked' : 'unchecked' }
                        onPress={() => setChecked('P')}
                        color='#0047AB'
                    />
                </View>
                <View style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginLeft: 35}}>
                    <Text style={{color: '#000', fontSize: 14}}>Profissional da Saúde</Text>
                    <RadioButton
                        value="M"
                        status={checked === 'M' ? 'checked' : 'unchecked' }
                        onPress={() => setChecked('M')}
                        color='#0047AB'
                    />
                </View>
            </View>
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
            <TextInput style={styles.input} 
                onChangeText={setConfirmPass}
                value={confirmPassword}
                secureTextEntry={true}
                autoCapitalize='none'
                placeholder='Confirme a senha' 
                placeholderTextColor='grey'/>
            <TouchableOpacity style={styles.button} onPress={registerUser}>
                <Text style={{color: '#fff', fontSize: 15}}>SALVAR</Text>
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
      marginBottom: 40,
      textShadowColor: '#000',
      color: '#000',
      borderBottomWidth: 1,
      borderColor: 'grey',
      backgroundColor: '#fff',
      fontSize: 18,
      width: 300
    }
});