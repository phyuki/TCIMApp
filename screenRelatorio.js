import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  SectionList,
  TouchableOpacity,
  View,
  SafeAreaView,
  BackHandler,
  StatusBar
} from 'react-native';
import config from './config/config.json'
import { SelectList } from 'react-native-dropdown-select-list'
import { RadioButton } from 'react-native-paper';

export default function TelaRelatorio({route, navigation}){

    const { user } = route.params
    
    const [names, setNames] = useState([])
    const [allPatients, setAllPatients] = useState([])
    const [selected, setSelected] = useState("")
    const [patient, setPatient] = useState('')
    const [dass, setDass] = useState()
    const [scid, setScid] = useState()

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

    async function querySCIDReports() {
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

    async function queryDASSReports() {
        let url = new URL(config.urlRootNode+'dassscores'),
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

    function extractData(array, report) {
        const dates = array.map(subarray => subarray[subarray.length - 1])
        const dateSet = new Set(dates)
        const sectionListDates = Array.from(dateSet).map((date, index) => ({id: report+(index+1), date: date}))
        return Array.from(sectionListDates)
    }

    async function searchReports(){
        let success = false
        if(patient){
            let scidReports = '', dassReports = ''
            if(dass == '1'){
                dassReports = await queryDASSReports()
                console.log('DASS: '+dassReports)
                success = true
            }
            if(scid == '1'){
                scidReports = await querySCIDReports()
                console.log('SCID: '+scidReports)
                success = true
            }
            if(!success)
                alert("Selecione algum ou ambos os tipos de questionários")
            else{
                if(scidReports != '' || dassReports != ''){
                    let data = []
                    if(scidReports){
                        const dates = extractData(scidReports, 'S')
                        data.push({title: 'SCID', data: dates})
                    }
                    if(dassReports){
                        const dates = extractData(dassReports, 'D')
                        data.push({title: 'DASS', data: dates})
                    }
                    console.log(patient)
                    return navigation.navigate('ListRelatorio', {user: user, patient: patient.name, 
                            scidReports: scidReports, dassReports: dassReports, data: data})
                }
                else
                    alert("Não há relatórios disponíveis para esse paciente")
            }
        }
        else 
            alert("Selecione um paciente")
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
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent:'center', marginBottom: 20, backgroundColor: 'white', borderRadius: 20, borderWidth: 1}}>
                    <View style={styles.radioButton}>
                        <RadioButton
                            value="1"
                            status={ dass === '1' ? 'checked' : 'unchecked' }
                            onPress={() => {
                                if(dass != '1') setDass('1')
                                else setDass('0')}}
                            color='#0047AB'
                        />
                        <Text style={styles.textRadioButton}>DASS-21</Text>
                    </View>
                    <View style={styles.radioButton}>
                        <RadioButton
                                value="1"
                                status={ scid === '1' ? 'checked' : 'unchecked' }
                                onPress={() => {
                                    if(scid != '1') setScid('1')
                                    else setScid('0')}}
                                color='#0047AB'
                        />
                        <Text style={styles.textRadioButton}>SCID-TCIm</Text>
                    </View>
                </View>
                
                <View style={{marginHorizontal: 20, marginBottom: 20, borderRadius: 20, borderWidth: 1, backgroundColor: 'white'}}>
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
                
                <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                    <TouchableOpacity style={styles.buttonPrev} onPress={() => navigation.goBack()}>
                        <Text style={{color: '#fff', fontSize: 18}}>Voltar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonNext} onPress={searchReports}>
                        <Text style={{color: '#fff', fontSize: 18}}>Procurar</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    radioButton:{
        flexDirection: 'column', 
        alignItems: 'center', 
        marginTop: 10, 
        marginHorizontal: 20
    },
    textRadioButton:{
        color: '#000', 
        fontSize: 17, 
        fontWeight: 'bold', 
        marginBottom: 10
    },
    buttonNext:{
        alignItems: 'center',
        justifyContent: 'center', 
        height: 40,
        width: 120, 
        backgroundColor: '#097969',
        borderRadius: 10,
        marginTop: 30,
    },
    buttonPrev:{
        alignItems: 'center',
        justifyContent: 'center', 
        height: 40,
        width: 120, 
        backgroundColor: '#b20000',
        borderRadius: 10,
        marginTop: 30,
        marginRight: 30
      },
})