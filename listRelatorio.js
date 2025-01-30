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
  StatusBar,
  FlatList,
  ScrollView,
  Alert,
  Modal,
  ActivityIndicator
} from 'react-native';
import config from './config/config.json'
import { SelectList } from 'react-native-dropdown-select-list'
import { RadioButton } from 'react-native-paper';

const Item = ({item, onPress, backgroundColor, textColor}) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, {backgroundColor}]}>
      <Text style={[styles.titleItem, {color: textColor}]}>{item}</Text>
    </TouchableOpacity>
);

export default function ListaRelatorios({route, navigation}){

    const { user, patient, reports, typeReport, data } = route.params
    
    const [reportId, setReportId] = useState()
    const [disorderName, setDisorderName] = useState()
    const [loading, setLoading] = useState(false)

    const renderItem = ({item}) => {
        const backgroundColor = item.id === reportId ? '#0047AB' : 'white';
        const color = item.id === reportId ? 'white' : 'black';
        
        let content = ''
        if(typeReport == 'DASS'){
            const split = item.date.split('-')
            content = `${split[2]}/${split[1]}/${split[0]}` 
        }
        else
            content = item.title

        return (
            <Item
                key={item.id}
                item={content}
                onPress={() => {
                    setReportId(item.id)
                    if(typeReport == 'SCID') setDisorderName(content)
                }}
                backgroundColor={backgroundColor}
                textColor={color}
            />
        )
    }
    
    async function querySCIDReports() {
        const allDisorders = ['TEI', 'Clepto', 'Piromania', 'Jogo', 'Tricotilomania', 'Oniomania',
            'Hipersexualidade', 'Uso Indevido de Internet', 'Escoriacao', 'Videogame', 'Automutilacao', 
            'Amor Patologico', 'Ciume Patologico', 'Dependencia de Comida']
        let id = parseInt(reportId.split('S')[1]) - 1
        
        let url = new URL(config.urlRootNode+'reportsByDisorder'),
        params={patient: patient.id, disorder: allDisorders[id]}
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

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

    async function showReport(){
        if(reportId) {
            let id = parseInt(reportId[1]) - 1
            if(reportId[0] == 'D'){
                return navigation.navigate('ShowRelatorio', {user: user, patient: patient, 
                    report: reports[id], type: typeReport})
            }
            else{
                setLoading(true)
                let report = await querySCIDReports()
                report = report.map((item) => {
                    const split = item[2].split('-')
                    item[2] = `${split[2]}/${split[1]}/${split[0]}`
                    return item 
                })

                if(report && report != '') 
                    navigation.navigate('ShowRelatorio', {user: user, patient: patient, 
                        report: report, type: disorderName})
                else 
                    Alert.alert('Aviso', "Não há relatórios disponíveis para este paciente")

                setLoading(false)
            }
        }
        else { 
            Alert.alert('Aviso', "Selecione um relatório para exibição")
        }    
    }

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
            <View style={{alignItems:'center', marginTop: 20}}>
              <Text style={{color: '#000', fontSize: 30, fontWeight: 'bold'}}>TCIMApp</Text>
              <Text style={{color: '#000', fontSize: 30, fontWeight: 'bold'}}>Relatórios</Text>
              <Text style={{color: '#000', marginTop: 40, fontSize: 25, fontWeight: 'bold'}}>{'Paciente: '+patient.name}</Text>
            </View>
            <View style={styles.container}>
                <View style={{borderRadius: 20,backgroundColor: 'white',borderWidth: 1,alignItems: 'center',height: 500, width: 350}}> 
                    {data.map((section) => (
                        <View key={section.title} style={styles.sectionContainer}>
                            <Text style={styles.sectionHeader}>{section.title}</Text>
                            <ScrollView vertical>
                                {section.data.map((item) => renderItem({item}))}
                            </ScrollView>
                        </View>
                    ))}
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center'}}>
                    <TouchableOpacity style={styles.buttonPrev} onPress={() => navigation.goBack()}>
                        <Text style={{color: '#fff', fontSize: 18}}>Voltar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonNext} onPress={showReport}>
                        <Text style={{color: '#fff', fontSize: 18}}>Exibir</Text>
                    </TouchableOpacity>
                </View>
            </View>
            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-evenly', 
        alignItems: 'center'
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    sectionHeader: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        backgroundColor: 'black',
        padding: 10,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginBottom: 15,
        width: 350
    },
    item: {
        padding: 10,
        alignItems: 'center',
        marginBottom: 20,
        marginHorizontal: 30,
        borderRadius: 10,
        borderWidth: 1
    },
    titleItem: {
        fontSize: 20,
    },
    header: {
        fontSize: 32,
        color: 'white'
    },
    buttonNext:{
        alignItems: 'center',
        justifyContent: 'center', 
        height: 40,
        width: 120, 
        backgroundColor: '#097969',
        borderRadius: 10
    },
    buttonPrev:{
        alignItems: 'center',
        justifyContent: 'center', 
        height: 40,
        width: 120, 
        backgroundColor: '#b20000',
        borderRadius: 10,
        marginRight: 40
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