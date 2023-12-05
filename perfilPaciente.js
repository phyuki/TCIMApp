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
import { SelectList } from 'react-native-dropdown-select-list'

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
            return alert('Os campos não podem estar em branco')

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
            alert("Seus dados foram atualizados com sucesso!")
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
                <View style={{alignItems:'center', justifyContent: 'center', marginTop: 20, marginBottom: 50}}>
                    <Text style={{color: '#000', fontSize: 30, fontWeight: 'bold'}}>{"TCIMApp"}</Text>
                </View>
                <View style={{alignItems:'center', justifyContent: 'center', marginTop: 80, marginBottom: 20}}>
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