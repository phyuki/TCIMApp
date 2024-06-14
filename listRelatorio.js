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
  Alert
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

    const { user, patient, dassReports, scidReports, data } = route.params
    
    const [reportId, setReportId] = useState()

    const renderItem = ({item}) => {
        const backgroundColor = item.id === reportId ? '#0047AB' : 'white';
        const color = item.id === reportId ? 'white' : 'black';
        
        let split = item.date.split('-')
        let date = `${split[2]}/${split[1]}/${split[0]}` 

        return (
            <Item
                key={item.id}
                item={date}
                onPress={() => setReportId(item.id)}
                backgroundColor={backgroundColor}
                textColor={color}
            />
        )
    }

    function showReport(){
        let id = parseInt(reportId[1]) - 1
        if(reportId){
            if(reportId[0] == 'D'){
                return navigation.navigate('ShowRelatorio', {user: user, patient: patient, 
                    report: dassReports[id], type: 'DASS'})
            }
            else{
                let disorders = 0, index = 0
                let report = scidReports[id].reduce((acc, curr) => {
                    if (disorders === 0) 
                      acc[index] = []
                    acc[index].push(curr)
                    if(disorders === 3){
                         disorders = -1
                         index++
                    }
                    disorders++
                    return acc
                }, {})
                report = Object.values(report)
                return navigation.navigate('ShowRelatorio', {user: user, patient: patient, 
                            report: report, type: 'SCID'})
            }
        }
        else Alert.alert('Aviso', "Selecione um relatório para exibição")
    }

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#87ceeb'}}>
            <View style={{alignItems:'center', marginTop: 20}}>
              <Text style={{color: '#000', fontSize: 30, fontWeight: 'bold'}}>TCIMApp</Text>
              <Text style={{color: '#000', fontSize: 30, fontWeight: 'bold'}}>Relatórios</Text>
              <Text style={{color: '#000', marginTop: 40, fontSize: 22, fontWeight: 'bold'}}>{'Paciente: '+patient}</Text>
            </View>
            <View style={styles.container}>
                <View style={{borderRadius: 20,backgroundColor: 'white',borderWidth: 1,alignItems: 'center',height: 400, width:300}}> 
                <ScrollView contentContainerStyle={{width: 300}}>
                    {data.map((section) => (
                        <View key={section.title} style={styles.sectionContainer}>
                            <Text style={styles.sectionHeader}>{section.title}</Text>
                            <ScrollView vertical>
                                {section.data.map((item) => renderItem({item}))}
                            </ScrollView>
                        </View>
                    ))}
                </ScrollView>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center'}}>
                    <TouchableOpacity style={styles.buttonNext} onPress={showReport}>
                        <Text style={{color: '#fff', fontSize: 18}}>Exibir</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonPrev} onPress={() => navigation.goBack()}>
                        <Text style={{color: '#fff', fontSize: 18}}>Voltar</Text>
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
        marginBottom: 20
    },
    item: {
        padding: 10,
        alignItems: 'center',
        marginBottom: 20,
        marginHorizontal: 16,
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
        borderRadius: 10,
        marginRight: 30
    },
    buttonPrev:{
        alignItems: 'center',
        justifyContent: 'center', 
        height: 40,
        width: 120, 
        backgroundColor: '#b20000',
        borderRadius: 10
    },
})