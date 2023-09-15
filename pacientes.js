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

export default function MenuPacientes({route, navigation}){

    const [patients, setPatients] = useState([])

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
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
          queryPatients();
        });
        return unsubscribe;
      }, [navigation]);

    return(
        <SafeAreaView style={{flex:1, backgroundColor: '#87ceeb'}}>
            <View style={{alignItems:'center', justifyContent: 'center', marginTop: 20}}>
              <Text style={{color: '#000', fontSize: 30, fontWeight: 'bold'}}>{"SCIDApp"}</Text>
            </View>
            <View style={{marginTop: 100, alignItems: 'center', marginBottom: 10}}>
                <Text style={{color: '#000', fontSize: 18, fontWeight: 'bold'}}>Lista de Pacientes</Text>
            </View>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <SelectDropdown
                data={patients}
                onSelect={(selectedItem, index) => {
                    console.log(selectedItem, index)
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem
                }}
                rowTextForSelection={(item, index) => {
                    return item
                }}
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
})