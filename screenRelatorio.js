import React, {useRef, useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View,
  SafeAreaView,
  BackHandler,
  Alert,
  Modal,
  ActivityIndicator
} from 'react-native';
import config from './config/config.json'
import { SelectList } from 'react-native-dropdown-select-list'
import { RadioButton } from 'react-native-paper';

export default function TelaRelatorio({route, navigation}){

    const { user } = route.params
    
    const controllerRef = useRef()
    const [names, setNames] = useState([])
    const [allPatients, setAllPatients] = useState([])
    const [selected, setSelected] = useState("")
    const [patient, setPatient] = useState('')
    const [checked, setChecked] = useState()
    const [loading, setLoading] = useState(false)

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

    async function queryDASSReports() {
        let url = new URL(config.urlRootNode+'dassscores'),
        params={patient: patient.id}
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

        controllerRef.current = new AbortController()
        const signal = controllerRef.current.signal
        const timeout = setTimeout(() => controllerRef.current.abort(), 10000)

        try {
            let reqs = await fetch(url, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }, signal
            })
            const resp = await reqs.json()
            return resp
        } catch (error) {
            console.log(error)
            Alert.alert('Erro', 'Erro de comunicação com o servidor - 500')
        } finally {
            clearTimeout(timeout)
        }
    }

    function selectingPatient(){
        const thisPatient = allPatients.find((obj) => obj.id === selected)
        setPatient(thisPatient)
    }

    function extractData(array, report) {
        const dates = array.map(subarray => subarray[subarray.length - 1])
        const sectionListDates = dates.map((date, index) => ({id: report+(index+1), date: date}))
        return Array.from(sectionListDates)
    }

    async function searchReports(){
        let hasSelected = false, success = false
        if(patient){
            let reports = '', typeReport = '', data = []
            if(checked == '1'){
                setLoading(true)
                hasSelected = true
                typeReport = 'DASS'
                reports = await queryDASSReports()
                console.log(reports)
                if(reports && reports != ''){
                    const dates = extractData(reports, 'D')
                    data.push({title: 'DASS', data: dates})
                    success = true
                }
                else if (reports == ''){
                    Alert.alert('Aviso', "Não há relatórios disponíveis para esse paciente")
                }
                setLoading(false)
            }
            else if(checked == '2'){
                typeReport = 'SCID'
                hasSelected = true
                success = true
                const disorders = [{id: 'S1', title: 'Transtorno Explosivo Intermitente'},
                    {id: 'S2', title: 'Cleptomania'},
                    {id: 'S3', title: 'Piromania'},
                    {id: 'S4', title: 'Jogo Patológico'},
                    {id: 'S5', title: 'Tricotilomania'},
                    {id: 'S6', title: 'Oniomania'},
                    {id: 'S7', title: 'Transtorno de Hipersexualidade'},
                    {id: 'S8', title: 'Transtorno por Uso Indevido de Internet'},
                    {id: 'S9', title: 'Transtorno de Escoriação'},
                    {id: 'S10', title: 'Transtorno do Videogame'},
                    {id: 'S11', title: 'Transtorno de Automutilação'},
                    {id: 'S12', title: 'Amor Patológico'},
                    {id: 'S13', title: 'Ciúme Patológico'},
                    {id: 'S14', title: 'Dependência de Comida'}]
                data.push({title: 'SCID', data: disorders})
            }

            if(!hasSelected)
                Alert.alert('Aviso', "Selecione um tipo de questionário!")
            if(success)
                return navigation.navigate('ListRelatorio', {user: user, patient: patient, 
                        reports: reports, typeReport: typeReport, data: data})
        }
        else 
            Alert.alert('Aviso', "Selecione um paciente")
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
          queryPatients();
        });
        return unsubscribe;
      }, [navigation]);

      return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#87ceeb'}}>
            <Modal animationType="fade" transparent={true} visible={loading}>
                <View style={styles.modalHeader}>
                    <View style={styles.modal}>
                        <ActivityIndicator size={"large"} color={"dodgerblue"} />
                        <Text style={{marginBottom: 10, color: 'black', fontSize: 18, marginTop: 15, textAlign: 'justify'}}>Buscando relatórios...</Text>
                    </View>
                </View>
            </Modal>
            <View style={{flexDirection: 'row', alignItems:'center', justifyContent: 'space-between', marginTop: 20}}>
                    <TouchableOpacity style={{backgroundColor: 'white', borderRadius: 10, marginLeft:20, padding: 10}} onPress={() => navigation.goBack()}>
                    <Image
                        source={require('./assets/back.png')}
                        style={{height: 25,
                        width: 25,
                        resizeMode: 'stretch'}}
                    />
                    </TouchableOpacity>
                    <Text style={{color: '#000', fontSize: 30, fontWeight: 'bold'}}>{"TCIMApp"}</Text>
                    <View style={{backgroundColor: '#87ceeb', borderRadius: 10, marginRight:20, width: 50, height: 50}}></View>
                </View>
                <View style={{alignItems:'center', justifyContent: 'center', marginTop: 20}}>
                    <Text style={{color: '#000', fontSize: 30, fontWeight: 'bold'}}>{'Relatórios'}</Text>
                </View>
        
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginBottom: 75}}>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent:'center', marginBottom: 20, backgroundColor: 'white', borderRadius: 20, borderWidth: 1}}>
                    <View style={styles.radioButton}>
                        <RadioButton
                            value="1"
                            status={ checked === '1' ? 'checked' : 'unchecked' }
                            onPress={() => {
                                if(checked != '1') setChecked('1')
                                else setChecked('0')}}
                            color='#0047AB'
                        />
                        <Text style={styles.textRadioButton}>DASS-21</Text>
                    </View>
                    <View style={styles.radioButton}>
                        <RadioButton
                                value="1"
                                status={ checked === '2' ? 'checked' : 'unchecked' }
                                onPress={() => {
                                    if(checked != '2') setChecked('2')
                                    else setChecked('0')}}
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
    modalHeader:{
        flex: 1, 
        backgroundColor: 'rgba(0, 0, 0, 0.75)', 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    modal:{
        margin: 20, 
        backgroundColor: 'white', 
        borderRadius: 20, 
        padding: 25, 
        alignItems: 'center', 
        shadowColor: '#000', 
        shadowOffset: {width: 0, height: 2}, 
        shadowOpacity: 0.25, 
        shadowRadius: 4, 
        elevation: 5
    }
})