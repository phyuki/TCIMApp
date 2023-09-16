import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity
} from 'react-native';
import config from './config/config.json'
import SelectDropdown from 'react-native-select-dropdown'
import { Button, TextInput } from 'react-native-paper';
import { SelectList } from 'react-native-dropdown-select-list'

export default function MenuPacientes({route, navigation}){

    const [names, setNames] = useState([])
    const [patients, setPatients] = useState([])
    const [selected, setSelected] = useState("")
    const [visible, setVisible] = useState(false)
    const [selectedPatient, setPatient] = useState(null)
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")

    async function queryPatients() {
        let url = new URL(config.urlRootNode+'patients')

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

    async function savePatient(){
        let url = new URL(config.urlRootNode+'patients')

        let reqs = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: selectedPatient.id,
                name: name,
                phone: phone,
                address: address
            })
        })
        let resp = await reqs.json()
        alert(resp)
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
            if(!visible) setVisible(true)
            if(selectedPatient == null || (selectedPatient != null && patientId != selectedPatient.id)){ 
                setPatient(patient)
                setName(patient.name)
                setPhone(patient.phone)
                setAddress(patient.address)
            }
        }
    }

    function updatePatient(){
        const patient = {
            id: selectedPatient.id,
            name: name,
            phone: phone,
            address: address
        }
        savePatient(patient)
    }

    return(
        <SafeAreaView style={{flex:1, backgroundColor: '#87ceeb'}}>
            <View style={{alignItems:'center', justifyContent: 'center', marginTop: 20}}>
              <Text style={{color: '#000', fontSize: 30, fontWeight: 'bold'}}>{"SCIDApp"}</Text>
            </View>
            <View style={{marginTop: 100, alignItems: 'center', marginBottom: 10}}>
                <Text style={{color: '#000', fontSize: 18, fontWeight: 'bold'}}>Lista de Pacientes</Text>
            </View>
            <View style={{marginHorizontal: 50, justifyContent: 'center'}}>
            <SelectList
                data={names}
                setSelected={setSelected}
                onSelect={findPatient(selected)} 
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
            <TouchableOpacity style={styles.buttonNext}>
                <Text style={{color: '#fff', fontSize: 15}}>Cadastrar paciente</Text>
            </TouchableOpacity>
            {visible && <View style={{alignItems: 'center'}}>
                <TextInput style={styles.input}
                onChangeText={setName}
                value={name}
                placeholder='Insira o nome do paciente'
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
                    <Text style={{color: '#fff', fontSize: 15}}>SALVAR</Text>
                </TouchableOpacity>
            </View>}
            </View>
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    buttonNext:{
        alignItems: 'center',
        justifyContent: 'center', 
        backgroundColor: '#097969',
        marginTop: 10,
        marginBottom: 30,
        width: 100
    },
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
})