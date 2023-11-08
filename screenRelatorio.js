import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView,
  BackHandler
} from 'react-native';
import config from './config/config.json'
import { SelectList } from 'react-native-dropdown-select-list'

export default function TelaRelatorio({route, navigation}){

    const { user } = route.params
    
    const [names, setNames] = useState([])
    const [allPatients, setAllPatients] = useState([])
    const [selected, setSelected] = useState("")
    const [patient, setPatient] = useState('')

    useEffect(() => {
        const backAction = () => {
            navigation.goBack()
            return true
        }    
        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
        return () => backHandler.remove()
    }, [])

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
        setAllPatients(resp)
        const names = resp.map(item => ({key: item.id, value: item.name}))
        setNames(names)
    }

    async function queryReports() {
        let url = new URL(config.urlRootNode+'reports'),
        params={patient: patient.id}
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

        let reqs = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        const resp = await reqs.json()
        console.log(resp)
        return resp
    }

    function selectingPatient(){
        const thisPatient = allPatients.find((obj) => obj.id === selected)
        setPatient(thisPatient)
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
          queryPatients();
        });
        return unsubscribe;
      }, [navigation]);

      return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#87ceeb'}}>
            <View style={{alignItems:'center', marginTop: 20}}>
              <Text style={{color: '#000', fontSize: 30, fontWeight: 'bold'}}>SCIDApp</Text>
              <Text style={{color: '#000', fontSize: 30, fontWeight: 'bold'}}>Relatórios</Text>
            </View>
        
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginBottom: 40}}>
                <View style={{marginHorizontal: 20, marginBottom: 10, borderRadius: 20, borderWidth: 1, backgroundColor: 'white'}}>
                    <Text style={{marginHorizontal: 20, marginVertical: 5, color: '#000', fontSize: 17, textAlign: 'center'}}>
                        Escolha o paciente desejado para o acesso aos relatórios</Text>
                </View>
                <SelectList
                        data={names}
                        setSelected={setSelected}
                        onSelect={selectingPatient}
                        placeholder="Lista de Pacientes"
                        searchPlaceholder="Digite o nome do paciente"
                        boxStyles={{backgroundColor:'white', borderColor: 'black'}}
                        inputStyles={{color: 'black', fontSize: 16}}
                        dropdownStyles={{backgroundColor: 'white'}}
                        dropdownItemStyles={{marginVertical: 5}}
                        dropdownTextStyles={{color: 'black', fontSize: 16}}
                        maxHeight={150}
                        notFoundText='Paciente não encontrado'
                />
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}> 
                <TouchableOpacity style={styles.buttonPrev} onPress={() => navigation.goBack()}>
                    <Text style={{color: '#fff', fontSize: 18}}>Voltar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonNext} onPress={queryReports}>
                    <Text style={{color: '#fff', fontSize: 18}}>Procurar</Text>
                </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    buttonNext:{
        alignItems: 'center',
        justifyContent: 'center', 
        height: 40,
        width: 120, 
        backgroundColor: '#097969',
        borderRadius: 10,
        marginTop: 30,
        marginBottom: 30,
        
    },
    buttonPrev:{
        alignItems: 'center',
        justifyContent: 'center', 
        height: 40,
        width: 120, 
        backgroundColor: '#b20000',
        borderRadius: 10,
        marginTop: 30,
        marginHorizontal: 10
      },
})