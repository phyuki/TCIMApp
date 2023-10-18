import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform
} from 'react-native';
import config from './config/config.json'
import { Button, TextInput } from 'react-native-paper';
import { SelectList } from 'react-native-dropdown-select-list'

export default function MenuPacientes({route, navigation}){

    const { user } = route.params

    const [names, setNames] = useState([])
    const [patients, setPatients] = useState([])
    const [selected, setSelected] = useState("")
    const [updateVisible, setUpdateVisible] = useState(false)
    const [registerVisible, setRegisterVisible] = useState(false)
    const [selectedPatient, setPatient] = useState(null)
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")

    async function queryPatients() {
        let url = new URL(config.urlRootNode+'patients'),
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
        setPatients(resp)
        const names = resp.map(item => ({key: item.id, value: item.name}))
        setNames(names)
    }

    async function updatePatient(){

        const patient = patients.find(item => item.id === selected)

        let url = new URL(config.urlRootNode+'patients')
        let reqs = await fetch(url, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: patient.id,
                name: name,
                phone: phone,
                address: address,
            })
        })
        let resp = await reqs.json()
        alert(resp)
        await queryPatients()
    }

    async function createPatient(){
        let url = new URL(config.urlRootNode+'patients')

        let reqs = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                phone: phone,
                address: address,
                professionalId: user.id
            })
        })
        let resp = await reqs.json()
        if(resp) alert('O paciente foi cadastrado com sucesso')
        setSelected(resp.id)
        await queryPatients()
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
          queryPatients();
        });
        return unsubscribe;
      }, [navigation]);

    function findPatient(patientId){
        const patient = patients.find(item => item.id === patientId)
        if(patient){
            if(registerVisible) setRegisterVisible(false)
            if(!updateVisible) setUpdateVisible(true)
            if(selectedPatient == null || (selectedPatient != null && patient.id != selectedPatient.id)){ 
                setPatient(patient)
                setName(patient.name)
                setPhone(patient.phone)
                setAddress(patient.address)
            }
        }
    }

    function formRegister(){
        if(updateVisible) setUpdateVisible(false)
        if(!registerVisible){ 
            setName('')
            setPhone('')
            setAddress('')
            setRegisterVisible(true)
        }
    }

    function registerPatient(){
        createPatient()
        if(registerVisible) setRegisterVisible(false)
        if(!updateVisible) setUpdateVisible(true)
    }

    return(
        <SafeAreaView style={{flex:1, backgroundColor: '#87ceeb'}}>
            <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={{justifyContent: 'space-evenly'}}>
                <View style={{alignItems:'center', justifyContent: 'center', marginTop: 20, marginBottom: 50}}>
                    <Text style={{color: '#000', fontSize: 30, fontWeight: 'bold'}}>{"SCIDApp"}</Text>
                </View>
                <View style={{alignItems: 'center', marginBottom: 20}}>
                    <Text style={{color: '#000', fontSize: 18, fontWeight: 'bold'}}>Lista de Pacientes</Text>
                </View>
                <View style={{marginHorizontal: 50, justifyContent: 'center'}}>
                    <SelectList
                        data={names}
                        setSelected={setSelected}
                        onSelect={()=>findPatient(selected)}
                        placeholder="Selecione o paciente"
                        searchPlaceholder="Digite o nome do paciente"
                        boxStyles={{backgroundColor:'white', borderColor: 'black'}}
                        inputStyles={{color: 'black', fontSize: 16}}
                        dropdownStyles={{backgroundColor: 'white'}}
                        dropdownItemStyles={{marginVertical: 5}}
                        dropdownTextStyles={{color: 'black', fontSize: 16}}
                        maxHeight={150}
                        notFoundText='Paciente não encontrado'
                    />
                    <View style={{alignItems: 'center', marginTop: 15}}>
                        <TouchableOpacity style={styles.buttonRegister} onPress={formRegister}>
                            <Text style={{color: '#fff', fontSize: 15}}>Cadastrar paciente</Text>
                        </TouchableOpacity>
                    </View>
                    {updateVisible && 
                    <View style={{marginTop: 30, alignItems: 'center'}}>
                        <TextInput style={styles.input}
                        onChangeText={setName}
                        value={name}
                        placeholder='Insira o nome completo do paciente'
                        placeholderTextColor='grey'/>
                        <TextInput style={styles.input}
                        onChangeText={setPhone}
                        value={phone}
                        placeholder='Insira o telefone do paciente'
                        placeholderTextColor='grey'/>
                        <TextInput style={styles.input}
                        onChangeText={setAddress}
                        value={address}
                        placeholder='Insira o endereço do paciente'
                        placeholderTextColor='grey'/>
                        <TouchableOpacity style={styles.button} onPress={updatePatient}>
                            <Text style={{color: '#fff', fontSize: 15}}>ATUALIZAR</Text>
                        </TouchableOpacity>
                    </View>
                    }
                    {registerVisible &&
                        <View style={{marginTop: 30, alignItems: 'center'}}>
                        <TextInput style={styles.input}
                        onChangeText={setName}
                        value={name}
                        placeholder='Insira o nome completo do paciente'
                        placeholderTextColor='grey'/>
                        <TextInput style={styles.input}
                        onChangeText={setPhone}
                        value={phone}
                        placeholder='Insira o telefone do paciente'
                        placeholderTextColor='grey'/>
                        <TextInput style={styles.input}
                        onChangeText={setAddress}
                        value={address}
                        placeholder='Insira o endereço do paciente'
                        placeholderTextColor='grey'/>
                        <TouchableOpacity style={styles.button} onPress={registerPatient}>
                            <Text style={{color: '#fff', fontSize: 15}}>CADASTRAR</Text>
                        </TouchableOpacity>
                    </View>
                    }
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
        marginTop: 10,
        marginBottom: 30
    },
    buttonRegister:{
        alignItems: 'center',
        justifyContent: 'center', 
        height: 40,
        width: 150, 
        backgroundColor: 'green',
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 30
    }
})