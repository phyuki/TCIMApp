import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  View,
  SafeAreaView,
  BackHandler,
  Alert
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

    async function queryDisorder() {

        let newUrl = new URL(config.urlRootNode+'disorders'),
            params={disorder: 'TEI'}
            Object.keys(params).forEach(key => newUrl.searchParams.append(key, params[key]))
        let reqs = await fetch(newUrl, {
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
            console.log(patient)
            const teiQuestions = await queryDisorder()
            return navigation.navigate('TEI', {user: user, patient: patient.id, questions: teiQuestions})
        }
        else Alert.alert("Aviso","Escolha um paciente!")
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
                <View style={{alignItems:'center', justifyContent: 'center', marginTop: 35}}>
                    <Text style={{color: '#000', fontSize: 30, fontWeight: 'bold'}}>{'Seção de Instruções'}</Text>
                </View>
        
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginBottom: 40}}>
                <View style={{marginHorizontal: 20, marginBottom: 20, borderRadius: 10, borderWidth: 1, backgroundColor: 'white'}}>
                    <Text style={{marginHorizontal: 20, marginVertical: 5, color: '#000', fontSize: 17, textAlign: 'center'}}>
                        Escolha o paciente para a entrevista</Text>
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
                <View style={{backgroundColor: 'white', marginHorizontal: 20, marginTop: 25, borderRadius: 20}}>
                    <View style={{marginHorizontal: 20, marginVertical: 20}}>
                    <Text style={{color: '#000', fontSize: 18, textAlign:'justify'}}>
                        {"Leia as perguntas para o entrevistado de acordo com as instruções descritas a cada seção." +
                        "\n\nCaso queira acessar o critério diagnóstico referente às perguntas exibidas, haverá um botão disponível no canto superior." +
                        "\n\nAo final da aplicação do SCID-TCIm, o relatório do paciente estará presente para consulta a qualquer momento na seção 'Relatórios' deste aplicativo."}
                    </Text>
                    </View>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <TouchableOpacity style={styles.buttonNext} onPress={initSCID}>
                    <Text style={{color: '#fff', fontSize: 18}}>Iniciar SCID-TCIm</Text>
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
        width: 180, 
        backgroundColor: '#097969',
        borderRadius: 10,
        marginTop: 30,
        marginBottom: 30
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