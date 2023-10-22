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

export default function TelaSCID({route, navigation}){

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

    async function queryTEI() {
        let url = new URL(config.urlRootNode+'tei')

        let reqs = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        const resp = await reqs.json()
        return resp
    }

    async function initSCID(){
        if(patient){
            const teiQuestions = await queryTEI()
            return navigation.navigate('TEI', {patient: patient.id, questions: teiQuestions})
        }
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
              <Text style={{color: '#000', fontSize: 30, fontWeight: 'bold'}}>{"SCID-TCIm"}</Text>
              <Text style={{color: '#000', fontSize: 30, fontWeight: 'bold'}}>{"Seção de Instruções"}</Text>
            </View>
        
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginBottom: 40}}>
                <SelectList
                        data={names}
                        setSelected={setSelected}
                        onSelect={selectingPatient}
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
                <View style={{backgroundColor: 'white', marginHorizontal: 20, marginTop: 25, borderRadius: 20}}>
                    <View style={{marginHorizontal: 20, marginVertical: 20}}>
                    <Text style={{color: '#000', fontSize: 20, textAlign:'justify'}}>
                        Leia as perguntas para o entrevistado de acordo com
                        as instruções especificadas a cada seção
                    </Text>
                    <Text style={{color: '#00009c', fontSize: 16, textAlign:'justify', marginTop: 30}}>
                        As perguntas podem ter observações que não devem ser lidas para o entrevistado
                        e por tal, serão marcadas por uma fonte reduzida e a cor azul como esse aviso.
                    </Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.buttonNext} onPress={initSCID}>
                    <Text style={{color: '#fff', fontSize: 18}}>Iniciar SCID-TCIm</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    buttonNext:{
        alignItems: 'center',
        justifyContent: 'center', 
        height: 40,
        width: 180, 
        backgroundColor: '#097969',
        borderRadius: 10,
        marginTop: 30,
        marginBottom: 30
    },
})