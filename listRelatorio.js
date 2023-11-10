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
  ScrollView
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

        return (
            <Item
                key={item.id}
                item={item.date}
                onPress={() => setReportId(item.id)}
                backgroundColor={backgroundColor}
                textColor={color}
            />
        )
    }

    function showReport(){
        if(reportId){
            if(reportId[0] == 'D'){
                const section = data.find((secao) => secao.title === 'DASS')
                const date = section.data.find((item) => item.id === reportId).date
                for(let i=0; i<dassReports.length; i++)
                    if(dassReports[i][3] == date)    
                        return navigation.navigate('ShowRelatorio', {user: user, patient: patient, 
                            report: dassReports[i], type: 'DASS'})
            }
            else{
                const section = data.find((secao) => secao.title === 'SCID')
                const date = section.data.find((item) => item.id === reportId).date
                let report = []
                for(let i=0; i<scidReports.length; i++)
                    if(scidReports[i][3] == date) 
                        report.push(scidReports[i])
                return navigation.navigate('ShowRelatorio', {user: user, patient: patient, 
                            report: report, type: 'SCID'})
            }
        }
        else alert("Selecione um relatório para exibição")
    }

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#87ceeb'}}>
            <View style={{alignItems:'center', marginTop: 20}}>
              <Text style={{color: '#000', fontSize: 30, fontWeight: 'bold'}}>SCIDApp</Text>
              <Text style={{color: '#000', fontSize: 30, fontWeight: 'bold'}}>Relatórios</Text>
              <Text style={{color: '#000', marginTop: 40, fontSize: 22, fontWeight: 'bold'}}>{'Paciente: '+patient}</Text>
            </View>
            <View style={{alignItems: 'center'}}>
            <ScrollView contentContainerStyle={styles.container}>
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
            <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                <TouchableOpacity style={styles.buttonPrev} onPress={() => navigation.goBack()}>
                    <Text style={{color: '#fff', fontSize: 18}}>Voltar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonNext} onPress={showReport}>
                    <Text style={{color: '#fff', fontSize: 18}}>Exibir</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 40,
        borderRadius: 20,
        backgroundColor: 'white',
        height: 400,
        width: 300
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    sectionHeader: {
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
        marginTop: 40,
    },
    buttonPrev:{
        alignItems: 'center',
        justifyContent: 'center', 
        height: 40,
        width: 120, 
        backgroundColor: '#b20000',
        borderRadius: 10,
        marginTop: 40,
        marginRight: 30
      },
})