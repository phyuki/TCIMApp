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
import { TextInput } from 'react-native-paper';
import { SelectList } from 'react-native-dropdown-select-list'

export default function MenuPacientes({route, navigation}){

    const [names, setNames] = useState([])
    const [patients, setPatients] = useState([])
    const [selected, setSelected] = useState("")
    const [visible, setVisible] = useState(false)
    const [selectedPatient, setPatient] = useState(null)

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

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
          queryPatients();
        });
        return unsubscribe;
      }, [navigation]);

    function getPatient(patientId){
        const patient = patients.find(item => item.id === patientId)
        if(patient){
            console.log(patient)
        }
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
                onSelect={getPatient(selected)} 
                placeholder="Selecione o paciente"
                searchPlaceholder="Digite o nome do paciente"
                boxStyles={{backgroundColor:'white', borderColor: 'black'}}
                inputStyles={{color: 'black'}}
                dropdownStyles={{backgroundColor: 'white'}}
                dropdownItemStyles={{marginVertical: 5}}
                dropdownTextStyles={{color: 'black', fontSize: 16}}
                maxHeight={150}
                notFoundText='Paciente não encontrado'
            />
            <TouchableOpacity style={styles.buttonNext}>
                <Text style={{color: '#fff', fontSize: 15}}>Cadastrar paciente</Text>
            </TouchableOpacity>
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
        marginTop: 20,
        marginBottom: 20,
        textShadowColor: '#000',
        color: '#000',
        borderBottomWidth: 1,
        borderColor: 'grey',
        backgroundColor: '#fff',
        fontSize: 18,
        width: 300
    },
})